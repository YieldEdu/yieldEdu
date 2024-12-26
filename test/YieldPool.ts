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
	let eduToken: any;

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
		eduToken = yieldToken;

		// Mint tokens to the owner
		await yieldToken.mint(owner.address, amount);
		await eduToken.approve(yieldPool.getAddress(), amount);
	});

	it("returns the correct eduToken address", async () => {
		const eduTokenAddress = await yieldPool.getEduToken();
		expect(eduTokenAddress).to.equal(await yieldToken.getAddress());
	});

	it("gets the position of a funder", async () => {
		expect(
			(await yieldPool.getPosition(anonymous1.address)).amount
		).to.be.equal(0);
		expect(
			(await yieldPool.getPosition(anonymous1.address)).startTime
		).to.be.equal(0);
		expect(
			(await yieldPool.getPosition(anonymous1.address)).lockDuration
		).to.be.equal(0);
	});

	it("calculates yieldTokens", async () => {
		const expectedYield =
			(BigInt(amount) * BigInt(duration) * BigInt(YIELD_RATE)) /
			(BigInt(YEAR) * BigInt(100));
		const resultsYield = await yieldPool.calculateYieldTokens(amount, duration);
		expect(resultsYield.toString()).to.equal(expectedYield.toString());
	});

	it("allows zero deposited amount and duration to revert", async () => {
		await expect(yieldPool.deposit(0, duration)).to.be.revertedWith(
			"Amount must be greater than 0"
		);
		await expect(yieldPool.deposit(amount, 0)).to.be.revertedWith(
			"Duration must be greater than 0"
		);
	});

	it("allows deposits and emits Deposited event", async () => {
		await eduToken.approve(yieldPool.getAddress(), amount);

		await expect(yieldPool.deposit(amount, duration))
			.to.emit(yieldPool, "Deposited")
			.withArgs(owner.address, amount, duration);

		const position = await yieldPool.getPosition(owner.address);
		expect(position.amount).to.equal(amount);
		expect(position.lockDuration).to.equal(duration);
	});

	it("reverts when YieldPool doesn't have enough tokens to pay out principal and yield", async () => {
		// approve tokens for deposit
		const eduTokenAddress = await yieldPool.getEduToken();
		const eduToken = await hre.ethers.getContractAt(
			"YieldToken",
			eduTokenAddress
		);
		await eduToken.approve(yieldPool.getAddress(), amount);

		await yieldPool.deposit(amount, duration);

		// Calculate expected yield
		const expectedYield =
			(BigInt(amount) * BigInt(duration) * BigInt(YIELD_RATE)) /
			(BigInt(YEAR) * BigInt(100));
		const totalAmount = BigInt(amount) + expectedYield;

		// forward time to after the lock duration
		await hre.network.provider.send("evm_increaseTime", [duration]);
		await hre.network.provider.send("evm_mine");

		await expect(yieldPool.withdraw()).to.revertedWith(
			"Insufficient funds in pool"
		);
	});

	it("allows withdrawals and emits Withdrawn event", async () => {
		// approve tokens for deposit
		const eduTokenAddress = await yieldPool.getEduToken();
		const eduToken = await hre.ethers.getContractAt(
			"YieldToken",
			eduTokenAddress
		);
		await eduToken.approve(yieldPool.getAddress(), amount);

		await yieldPool.deposit(amount, duration);

		// Calculate expected yield
		const expectedYield =
			(BigInt(amount) * BigInt(duration) * BigInt(YIELD_RATE)) /
			(BigInt(YEAR) * BigInt(100));
		const totalAmount = BigInt(amount) + expectedYield;

		// Mint additional tokens to the YieldPool for yield payments
		await eduToken.mint(yieldPool.getAddress(), expectedYield);

		// forward time to after the lock duration
		await hre.network.provider.send("evm_increaseTime", [duration]);
		await hre.network.provider.send("evm_mine");

		await expect(yieldPool.withdraw())
			.to.emit(yieldPool, "Withdrawn")
			.withArgs(
				owner.address,
				totalAmount.toString(),
				expectedYield.toString()
			);

		const position = await yieldPool.getPosition(owner.address);
		expect(position.amount).to.equal(0);

		// Check the balance of the contract after withdrawal
		expect(await eduToken.balanceOf(yieldPool.getAddress())).to.equal(0);
	});

	it("reverts when withdrawing before lock duration", async () => {
		await yieldPool.deposit(amount, duration);

		// Attempt to withdraw before lock duration has passed
		await expect(yieldPool.withdraw()).to.be.revertedWith("Still locked");
	});

	it("checks the balance of the contract after deposit", async () => {
		await yieldPool.deposit(amount, duration);
		const eduTokenAddress = await yieldPool.getEduToken();
		const eduToken = await hre.ethers.getContractAt(
			"YieldToken",
			eduTokenAddress
		);
		expect(await eduToken.balanceOf(yieldPool.getAddress())).to.equal(amount);
	});

	it("checks the balance of the contract after withdrawal", async () => {
		const eduTokenAddress = await yieldPool.getEduToken();
		const eduToken = await hre.ethers.getContractAt(
			"YieldToken",
			eduTokenAddress
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
		await eduToken.mint(yieldPool.getAddress(), expectedYield);

		await expect(yieldPool.withdraw())
			.to.emit(yieldPool, "Withdrawn")
			.withArgs(
				owner.address,
				totalAmount.toString(),
				expectedYield.toString()
			);

		// Check the balance of the contract after withdrawal
		expect(await eduToken.balanceOf(yieldPool.getAddress())).to.equal(0);
	});
});
