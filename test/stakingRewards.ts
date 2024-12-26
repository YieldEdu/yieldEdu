import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import {
	StakingRewards,
	StakingRewards__factory,
	YieldPool,
	YieldPool__factory,
	YieldToken,
	YieldToken__factory,
} from "../typechain-types";
import hre from "hardhat";
import { expect } from "chai";

describe("StakingRewards", async () => {
	let stakingRewards: StakingRewards;
	let YieldToken: YieldToken;
	let YieldPool: YieldPool;
	let yieldPoolFactory: YieldPool__factory;
	let yieldTokenFactory: YieldToken__factory;
	let stakingRewardsFactory: StakingRewards__factory;
	let owner: SignerWithAddress;
	let anonymous1: SignerWithAddress;
	let tokenName = "Fixed Yield Token";
	let tokenSymbol = "FYT";
	let amount = hre.ethers.parseUnits("1000", 18);

	beforeEach(async () => {
		stakingRewardsFactory = await hre.ethers.getContractFactory(
			"StakingRewards"
		);
		yieldPoolFactory = await hre.ethers.getContractFactory("YieldPool");
		yieldTokenFactory = await hre.ethers.getContractFactory("YieldToken");
		[owner, anonymous1] = await hre.ethers.getSigners();

		YieldToken = await yieldTokenFactory.deploy(owner, tokenName, tokenSymbol);
		YieldPool = await yieldPoolFactory.deploy(
			YieldToken.getAddress(),
			tokenName,
			tokenSymbol
		);
		stakingRewards = await stakingRewardsFactory.deploy(
			YieldToken.getAddress(),
			YieldPool.getAddress()
		);
	});
	it("returns initial yield tokens and initial stakeValue", async () => {
		const stakeValue = await stakingRewards.getStake(owner);
		const yieldToken = await stakingRewards.getYieldPool();
		expect(yieldToken).to.equal(await stakingRewards.getYieldPool());
		expect(stakeValue.amount).to.be.equal(0);
		expect(stakeValue.startTime).to.be.equal(stakeValue.startTime);
	});

	it("reverts when stake amount is not larger than zero", async () => {
		await expect(stakingRewards.stake(0)).to.be.revertedWith(
			"Amount must be greater than 0"
		);
	});

	it("successfully stakes and update stake state", async () => {
		//minted tokens to the liquidator
		await YieldToken.mint(anonymous1.address, amount);

		await YieldToken.connect(anonymous1).approve(
			stakingRewards.getAddress(),
			amount
		);
		//stake
		await expect(stakingRewards.connect(anonymous1).stake(amount))
			.to.emit(stakingRewards, "Staked")
			.withArgs(anonymous1.address, amount);

		const stakes = stakingRewards.getStake(anonymous1.address);
		expect((await stakes).amount).to.be.equal(amount);
		expect((await stakes).startTime).to.be.equal((await stakes).startTime);
	});

	it("successfully unstake", async () => {
		//minted tokens to the liquidator
		await YieldToken.mint(anonymous1.address, amount);

		await YieldToken.connect(anonymous1).approve(
			stakingRewards.getAddress(),
			amount
		);
		//stake
		await expect(stakingRewards.connect(anonymous1).stake(amount))
			.to.emit(stakingRewards, "Staked")
			.withArgs(anonymous1.address, amount);

		const stakes = stakingRewards.getStake(anonymous1.address);
		expect((await stakes).amount).to.be.equal(amount);
		expect((await stakes).startTime).to.be.equal((await stakes).startTime);
		await expect(stakingRewards.connect(anonymous1).unstake())
			.to.emit(stakingRewards, "Unstaked")
			.withArgs(anonymous1, amount);
	});
});
