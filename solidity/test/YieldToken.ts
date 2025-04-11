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

	it("should enforce mint cooldown period", async () => {
		await YieldTokenContract.connect(owner).mint(anonymous1, 1000);
		await expect(
			YieldTokenContract.connect(owner).mint(anonymous1, 1000)
		).to.be.revertedWith("Must wait 24 hours between mints");

		// Fast forward time by 24 hours + 1 second
		await hre.network.provider.send("evm_increaseTime", [86401]);
		await hre.network.provider.send("evm_mine");

		// Should work after cooldown
		await expect(YieldTokenContract.connect(owner).mint(anonymous1, 1000)).to
			.not.be.reverted;
	});

	describe("Student functionality", () => {
		it("should manage student status correctly", async () => {
			expect(await YieldTokenContract.getIsStudent(anonymous1)).to.be.false;

			await YieldTokenContract.setStudentStatus(anonymous1, true);
			expect(await YieldTokenContract.getIsStudent(anonymous1)).to.be.true;

			await YieldTokenContract.setStudentStatus(anonymous1, false);
			expect(await YieldTokenContract.getIsStudent(anonymous1)).to.be.false;
		});

		it("should allow minting for students without cooldown", async () => {
			await YieldTokenContract.setStudentStatus(anonymous1, true);

			// First mint
			await YieldTokenContract.mintForStudent(anonymous1, 1000);
			expect(await YieldTokenContract.balanceOf(anonymous1)).to.equal(1000);

			// Immediate second mint should work for students
			await YieldTokenContract.mintForStudent(anonymous1, 1000);
			expect(await YieldTokenContract.balanceOf(anonymous1)).to.equal(2000);
		});

		it("should reject mintForStudent for non-students", async () => {
			await expect(
				YieldTokenContract.mintForStudent(anonymous1, 1000)
			).to.be.revertedWith("Address must be a student");
		});
	});

	it("should allow InsufficientMint without restrictions", async () => {
		await YieldTokenContract.InsufficientMint(anonymous1, 1000);
		expect(await YieldTokenContract.balanceOf(anonymous1)).to.equal(1000);

		// Should allow immediate second mint
		await YieldTokenContract.InsufficientMint(anonymous1, 1000);
		expect(await YieldTokenContract.balanceOf(anonymous1)).to.equal(2000);
	});
});
