import hre from "hardhat";
import { expect } from "chai";
import {
	YieldPool,
	YieldPool__factory,
	YieldToken,
	YieldToken__factory,
} from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("YieldPool", async () => {
	let yieldPool: YieldPool;
	let yieldPoolFactory: YieldPool__factory;
	let yieldToken: YieldToken;
	let yieldTokenFactory: YieldToken__factory;
	let owner: SignerWithAddress;
	let anonymous1: SignerWithAddress;
	let tokenName = "Fixed Yield Token";
	let tokenSymbol = "FYT";
	let YIELD_RATE = 10;
	let YEAR = 365 * 24 * 60 * 60;
	let amount = hre.ethers.parseUnits("1000", 18);
	let duration = 7 * 24 * 60 * 60;
	let FYTToken: any;

	beforeEach(async () => {
		yieldTokenFactory = await hre.ethers.getContractFactory("YieldToken");
		[owner, anonymous1] = await hre.ethers.getSigners();
		yieldToken = await yieldTokenFactory.deploy(
			owner.address,
			tokenName,
			tokenSymbol
		);

		yieldPoolFactory = await hre.ethers.getContractFactory("YieldPool");

		yieldPool = await yieldPoolFactory.deploy(
			yieldToken.getAddress(),
			tokenName,
			tokenSymbol
		);
		FYTToken = yieldToken;

		// Mint tokens to the owner
		await yieldToken.mint(owner.address, amount);
		await FYTToken.approve(yieldPool.getAddress(), amount);
	});

	it("returns the correct Eduu address", async () => {
		const FYTTokenAddress = await yieldPool.getEduToken();
		expect(FYTTokenAddress).to.equal(await yieldToken.getAddress());
	});

	it("reverts when user has no position", async () => {
		await expect(yieldPool.getPosition(1)).to.revertedWith(
			"Position not found"
		);
		await expect(yieldPool.getPosition(2)).to.revertedWith(
			"Position not found"
		);
		await expect(yieldPool.getPosition(3)).to.revertedWith(
			"Position not found"
		);
	});

	it("calculates yieldTokens", async () => {
		const expectedYield =
			(BigInt(amount) * BigInt(duration) * BigInt(YIELD_RATE)) /
			(BigInt(YEAR) * BigInt(100));
		const resultsYield = await yieldPool.calculateYieldTokens(amount, duration);
		expect(resultsYield.toString()).to.equal(expectedYield.toString());
	});

	it("reverts when 0 duration and amount is deposited", async () => {
		await expect(yieldPool.deposit(0, duration)).to.be.revertedWith(
			"Amount must be greater than 0"
		);
		await expect(yieldPool.deposit(amount, 0)).to.be.revertedWith(
			"Invalid duration"
		);
	});

	it("allows deposits and emits Deposited event", async () => {
		await FYTToken.approve(yieldPool.getAddress(), amount);

		await expect(yieldPool.deposit(amount, duration))
			.to.emit(yieldPool, "Deposited")
			.withArgs(owner.address, amount, duration);

		const position = await yieldPool.getPosition(1);
		expect(position.amount).to.equal(amount);
		expect(position.lockDuration).to.equal(duration);
	});

	it("allows withdrawals and emits Withdrawn event", async () => {
		// deposit
		await FYTToken.approve(yieldPool.getAddress(), amount);

		await expect(yieldPool.deposit(amount, duration))
			.to.emit(yieldPool, "Deposited")
			.withArgs(owner.address, amount, duration);

		const position = await yieldPool.getPosition(1);
		expect(position.amount).to.equal(amount);
		expect(position.lockDuration).to.equal(duration);

		// Calculate expected yield
		const expectedYield =
			(BigInt(amount) * BigInt(duration) * BigInt(YIELD_RATE)) /
			(BigInt(YEAR) * BigInt(100));
		const totalAmount = BigInt(amount) + expectedYield;

		// Mint additional tokens to the YieldPool for yield payments
		await FYTToken.mint(yieldPool.getAddress(), expectedYield);

		// forward time to after the lock duration
		await hre.network.provider.send("evm_increaseTime", [duration]);
		await hre.network.provider.send("evm_mine");

		await expect(yieldPool.withdraw(1))
			.to.emit(yieldPool, "Withdrawn")
			.withArgs(
				owner.address,
				totalAmount.toString(),
				expectedYield.toString()
			);

		// Check the balance of the contract after withdrawal
		expect(await FYTToken.balanceOf(yieldPool.getAddress())).to.equal(0);
	});

	it("reverts when withdrawing before lock duration", async () => {
		await yieldPool.deposit(amount, duration);

		// Attempt to withdraw before lock duration has passed
		await expect(yieldPool.withdraw(1)).to.be.revertedWith("Still locked");
	});

	it("checks the balance of the contract after deposit", async () => {
		await yieldPool.deposit(amount, duration);
		const FYTTokenAddress = await yieldPool.getEduToken();
		const FYTToken = await hre.ethers.getContractAt(
			"YieldToken",
			FYTTokenAddress
		);
		expect(await FYTToken.balanceOf(yieldPool.getAddress())).to.equal(amount);
	});

	it("checks the balance of the contract after withdrawal", async () => {
		const FYTTokenAddress = await yieldPool.getEduToken();
		const FYTToken = await hre.ethers.getContractAt(
			"YieldToken",
			FYTTokenAddress
		);
		await yieldPool.deposit(amount, duration);

		// Calculate expected yield
		const expectedYield =
			(BigInt(amount) * BigInt(duration) * BigInt(YIELD_RATE)) /
			(BigInt(YEAR) * BigInt(100));
		const totalAmount = BigInt(amount) + expectedYield;

		// Fast forward time to after the lock duration
		await hre.network.provider.send("evm_increaseTime", [duration]);
		await hre.network.provider.send("evm_mine");

		// Mint additional tokens to the YieldPool for yield payments
		await FYTToken.mint(yieldPool.getAddress(), expectedYield);

		await expect(yieldPool.withdraw(1))
			.to.emit(yieldPool, "Withdrawn")
			.withArgs(
				owner.address,
				totalAmount.toString(),
				expectedYield.toString()
			);

		// Check the balance of the contract after withdrawal
		expect(await FYTToken.balanceOf(yieldPool.getAddress())).to.equal(0);
	});

	it("should track total stakers correctly", async () => {
		expect(await yieldPool.getTotalStakers()).to.equal(0);

		await FYTToken.approve(yieldPool.getAddress(), amount);
		await yieldPool.deposit(amount, duration);
		expect(await yieldPool.getTotalStakers()).to.equal(1);

		await FYTToken.connect(anonymous1).approve(yieldPool.getAddress(), amount);
		await yieldToken.connect(anonymous1).mint(anonymous1, amount);
		await yieldPool.connect(anonymous1).deposit(amount, duration);
		expect(await yieldPool.getTotalStakers()).to.equal(2);
	});

	it("should track total value locked correctly", async () => {
		expect(await yieldPool.getTotalValueLocked()).to.equal(0);
		await FYTToken.approve(yieldPool.getAddress(), amount);

		await expect(yieldPool.deposit(amount, duration))
			.to.emit(yieldPool, "Deposited")
			.withArgs(owner.address, amount, duration);

		expect(await yieldPool.getTotalValueLocked()).to.equal(amount);

		await yieldToken.mint(anonymous1, amount);
		await FYTToken.connect(anonymous1).approve(yieldPool, amount);
		await expect(yieldPool.connect(anonymous1).deposit(amount, duration))
			.to.emit(yieldPool, "Deposited")
			.withArgs(anonymous1, amount, duration);
		expect(await yieldPool.getTotalValueLocked()).to.equal(amount * 2n);
	});

	it("should return all active positions", async () => {
		await FYTToken.approve(yieldPool.getAddress(), amount);

		await expect(yieldPool.deposit(amount, duration))
			.to.emit(yieldPool, "Deposited")
			.withArgs(owner.address, amount, duration);

		await yieldToken.mint(anonymous1, amount);
		await FYTToken.connect(anonymous1).approve(yieldPool, amount);
		await yieldPool.connect(anonymous1).deposit(amount, duration);

		const positions = await yieldPool.getActivePositions();
		expect(positions.length).to.equal(2);
		expect(positions[0].amount).to.equal(amount);
		expect(positions[1].amount).to.equal(amount);
	});

	it("should handle unstaking with penalty correctly", async () => {
		await yieldPool.deposit(amount, duration);
		const penalty = amount / 10n; // 10% penalty
		const expectedReturn = amount - penalty;

		const balanceBefore = await FYTToken.balanceOf(owner.address);
		await yieldPool.unstake(1);
		const balanceAfter = await FYTToken.balanceOf(owner.address);

		expect(balanceAfter - balanceBefore).to.equal(expectedReturn);
		expect(await yieldPool.getTotalStakers()).to.equal(0);
	});

	it("should handle multiple positions per user", async () => {
		await yieldToken.InsufficientMint(anonymous1, amount);
		await FYTToken.connect(anonymous1).approve(yieldPool, amount);
		await yieldPool.connect(anonymous1).deposit(amount, duration);

		await yieldToken.InsufficientMint(anonymous1, amount);
		await FYTToken.connect(anonymous1).approve(yieldPool.getAddress(), amount);
		await yieldPool.connect(anonymous1).deposit(amount, duration * 2);

		const positions = await yieldPool.getActivePositions();
		expect(positions.length).to.equal(2);
		expect(positions[0].lockDuration).to.equal(duration);
		expect(positions[1].lockDuration).to.equal(duration * 2);
		expect(await yieldPool.getTotalStakers()).to.equal(1);
	});

	it("should revert unstaking non-existent position", async () => {
		await expect(yieldPool.unstake(999)).to.be.revertedWith(
			"Not position owner"
		);
	});
});
