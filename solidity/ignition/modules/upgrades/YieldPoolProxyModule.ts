import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config";

const ACCOUNT_ADDRESS = vars.get("ACCOUNT_ADDRESS");
if (!ACCOUNT_ADDRESS) {
	throw new Error(
		`ACCOUNT_ADDRESS is not set. "use npx hardhat vars set ACCOUNT_ADDRESS"`
	);
}

const YieldPoolProxyModule = buildModule("YieldPoolProxyModule", (m) => {
	const proxyAdminOwner = ACCOUNT_ADDRESS;
	const YieldToken = m.contract("YieldToken", [
		proxyAdminOwner,
		"Fixed Yield Token",
		"FYT",
	]); //constructor args

	const YieldPool = m.contract("YieldPool", [
		YieldToken,
		"Fixed Yield Token",
		"FYT",
	]);

	const yieldPoolProxy = m.contract("TransparentUpgradeableProxy", [
		YieldPool,
		proxyAdminOwner,
		"0x",
	]);

	const proxyAdminAddress = m.readEventArgument(
		yieldPoolProxy,
		"AdminChanged",
		"newAdmin"
	);

	const yieldPoolProxyAdmin = m.contractAt("ProxyAdmin", proxyAdminAddress);

	return { yieldPoolProxyAdmin, yieldPoolProxy };
});

export default YieldPoolProxyModule;
