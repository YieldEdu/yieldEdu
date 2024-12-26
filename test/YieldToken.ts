import hre from "hardhat";
import { expect } from "chai";
import { YieldToken, YieldToken__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("YieldToken", () => {
	let YieldTokenContract: YieldToken;
	let YieldTokenFactory: YieldToken__factory;
	let owner: SignerWithAddress;
	let anonymous1: SignerWithAddress;
	let anonymous2: SignerWithAddress;
	let zeroAddress = "0x0000000000000000000000000000000000000000";
	let tokenName = "Fixed Yield Token";
	let tokenSymbol = "FYT";

	beforeEach(async () => {
		YieldTokenFactory = await hre.ethers.getContractFactory("YieldToken");
		[owner, anonymous1, anonymous2] = await hre.ethers.getSigners();
		YieldTokenContract = await YieldTokenFactory.deploy(
			owner,
			tokenName,
			tokenSymbol
		);
	});

	it("should have the same name, owner, and symbol", async () => {
		expect(await YieldTokenContract.name()).to.equal(tokenName);
		expect(await YieldTokenContract.owner()).to.equal(owner);
		expect(await YieldTokenContract.symbol()).to.equal(tokenSymbol);
	});

	it("only allows owner to mint tokens", async () => {
		expect(await YieldTokenContract.connect(owner).mint(anonymous1, 1000));
		expect(await YieldTokenContract.balanceOf(anonymous1)).to.equal(1000);
		expect(
			YieldTokenContract.connect(anonymous1).mint(anonymous2, 1000)
		).to.be.revertedWith("Ownable: caller is not the owner");
	});

	it("allows only the owner to burn tokens", async () => {
		expect(await YieldTokenContract.connect(owner).mint(anonymous1, 1000));
		expect(await YieldTokenContract.balanceOf(anonymous1)).to.equal(1000);
		expect(await YieldTokenContract.connect(owner).burn(anonymous1, 500));
		expect(await YieldTokenContract.balanceOf(anonymous1)).to.equal(500);
		// non-owner should not be able to burn
		await expect(YieldTokenContract.connect(anonymous1).burn(anonymous2, 500))
			.to.be.revertedWithCustomError(
				YieldTokenContract,
				"OwnableUnauthorizedAccount"
			)
			.withArgs(anonymous1);
	});

	it("should emit events when token is minted or burnt", async () => {
		await expect(
			YieldTokenContract.connect(owner).mint(anonymous1, 1000)
		).to.emit(YieldTokenContract, "Transfer");

		await expect(YieldTokenContract.connect(owner).burn(anonymous1, 500))
			.to.emit(YieldTokenContract, "Transfer")
			.withArgs(anonymous1, zeroAddress, 500);
	});
});
