import { expect } from "chai";
import hre from "hardhat";

import {
	YieldPool__factory,
	YieldToken__factory,
	ProxyAdmin__factory,
	YieldPoolV2__factory,
	YieldTokenV2__factory,
	YieldTokenV2,
	YieldPoolV2,
	YieldPool,
	YieldToken,
	ProxyAdmin,
} from "../../typechain-types";

import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("YieldPoolV2 Proxy", async function () {
	let YieldPool: YieldPool;
	let YieldPoolV2: YieldPoolV2;
	let yieldToken: YieldToken;
	let yieldTokenV2: YieldTokenV2;
	let yieldTokenFactory: YieldToken__factory;
	let yieldTokenV2Factory: YieldTokenV2__factory;
	let YieldPoolFactory: YieldPool__factory;
	let YieldPoolV2Factory: YieldPoolV2__factory;
	let ProxyAdminFactory: ProxyAdmin__factory;
	let ProxyAdmin: ProxyAdmin;
	let owner: SignerWithAddress;

	const tokenName = "Fixed Yield Token";
	const tokenSymbol = "FYT";
	const yieldRate = 10;
	const minDuration = 86400;
	const maxDuration = 31536000;

	const amount = hre.ethers.parseUnits("1000", 18);
	const duration = 7 * 24 * 60 * 60;

	beforeEach(async () => {
		yieldTokenFactory = await hre.ethers.getContractFactory("YieldToken");
		yieldTokenV2Factory = await hre.ethers.getContractFactory("YieldTokenV2");
		yieldTokenV2 = await yieldTokenV2Factory.deploy();

		[owner] = await hre.ethers.getSigners();
		yieldToken = await yieldTokenFactory.deploy(
			owner.address,
			tokenName,
			tokenSymbol
		);

		YieldPoolFactory = await hre.ethers.getContractFactory("YieldPool");
		YieldPoolV2Factory = await hre.ethers.getContractFactory("YieldPoolV2");
		ProxyAdminFactory = await hre.ethers.getContractFactory("ProxyAdmin");

		YieldPool = await YieldPoolFactory.deploy(
			yieldToken,
			tokenName,
			tokenSymbol
		);

		// Deploy implementation
		YieldPoolV2 = await YieldPoolV2Factory.deploy();

		// Deploy ProxyAdmin
		ProxyAdmin = await ProxyAdminFactory.deploy(owner);

		// Deploy Proxy
		const TransparentUpgradeableProxy = await hre.ethers.getContractFactory(
			"TransparentUpgradeableProxy"
		);
		const proxy = await TransparentUpgradeableProxy.deploy(
			await YieldPoolV2.getAddress(),
			await ProxyAdmin.getAddress(),
			YieldPoolV2.interface.encodeFunctionData("initialize", [
				await yieldToken.getAddress(),
				yieldRate,
				minDuration,
				maxDuration,
			])
		);

		// Get contract instance at proxy address
		YieldPoolV2 = YieldPoolV2Factory.attach(
			await proxy.getAddress()
		) as YieldPoolV2;
	});
	it("successfully deposit on old contract", async () => {
		await yieldToken.mint(owner.address, amount);

		await yieldToken.approve(YieldPool, amount);

		await expect(YieldPool.deposit(amount, duration))
			.to.emit(YieldPool, "Deposited")
			.withArgs(owner.address, amount, duration);

		const position = await YieldPool.getPosition(1);
		expect(position.amount).to.equal(amount);
		expect(position.lockDuration).to.equal(duration);
	});
	it.only("should mint tokens to yieldPoolV2 contract", async () => {
		console.log(await yieldTokenV2.balanceOf(YieldPoolV2));
		await yieldTokenV2.connect(owner).mint(YieldPoolV2, amount);
		// expect(await yieldToken.balanceOf(YieldPoolV2)).to.be.equal(amount);
		// console.log(await YieldTokenV2)
	});
	// it.only("Should have upgraded the proxy to DemoV2", async function () {
	// 	// Mint tokens to owner first
	// 	await yieldToken.mint(owner.address, amount);

	// 	// Check balance after mint
	// 	const ownerBalance = await yieldToken.balanceOf(owner.address);
	// 	expect(ownerBalance).to.equal(amount);
	// 	// Approve YieldPoolV2 to spend tokens
	// 	await yieldToken.approve(await YieldPoolV2.getAddress(), amount);

	// 	const yieldTokenAddress = await yieldToken.getAddress();
	// 	// Perform deposit
	// 	await expect(YieldPoolV2.deposit(yieldTokenAddress, amount, duration))
	// 		.to.emit(YieldPoolV2, "Deposited")
	// 		.withArgs(owner.address, yieldTokenAddress, amount, duration);

	// 	const position = await YieldPoolV2.getPosition(0);
	// 	expect(position.amount).to.equal(amount);
	// 	expect(position.lockDuration).to.equal(duration);
	// });

	// it("Should have set the name during upgrade", async function () {
	// 	const [, otherAccount] = await ethers.getSigners();

	// 	const { YieldPoolV2 } = await ignition.deploy(UpgradeModule);

	// 	// expect(await YieldPoolV2.connect(otherAccount).name()).to.equal(
	// 	// 	"Example Name"
	// 	// );
	// });
});
