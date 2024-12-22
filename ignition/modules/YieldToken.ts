import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const { vars } = require("hardhat/config");

const accountAddress = vars.get("ACCOUNT_ADDRESS");
if (!accountAddress) {
	throw new Error(
		"ACCOUNT_ADDRESS environment variable is required. use npx hardhat vars set ACCOUNT_ADDRESS in terminal"
	);
}

const YieldTokenModule = buildModule("YieldTokenModule", (m) => {
	const YieldToken = m.contract("YieldToken", [
		accountAddress,
		"Fixed Yield Token",
		"FYT",
	]); //constructor args
	return { YieldToken };
});

export default YieldTokenModule;
