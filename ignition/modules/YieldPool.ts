import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config";

const accountAddress = vars.get("ACCOUNT_ADDRESS");
if (!accountAddress) {
	throw new Error(
		"ACCOUNT_ADDRESS environment variable is required. use npx hardhat vars set ACCOUNT_ADDRESS in terminal"
	);
}

const yieldPoolModule = buildModule("yieldPoolModule", (m) => {
	const eduToken = m.contract("YieldToken", [
		accountAddress,
		"Fixed Yield Token",
		"FYT",
	]);
	const yieldPool = m.contract("YieldPool", [
		eduToken,
		"Fixed Yield Token",
		"FYT",
	]);

	return {
		yieldPool,
	};
});

export default yieldPoolModule;
