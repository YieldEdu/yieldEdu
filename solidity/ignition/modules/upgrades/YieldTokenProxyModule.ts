import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config";

const ACCOUNT_ADDRESS = vars.get("ACCOUNT_ADDRESS");
if (!ACCOUNT_ADDRESS) {
	throw new Error(
		`ACCOUNT_ADDRESS is not set. "use npx hardhat vars set ACCOUNT_ADDRESS"`
	);
}

const YieldTokenProxyModule = buildModule("YieldTokenProxyModule", (m) => {
	const proxyAdminOwner = ACCOUNT_ADDRESS;
	const YieldToken = m.contract("YieldToken", [
		proxyAdminOwner,
		"Fixed Yield Token",
		"FYT",
	]); //constructor args

	const YieldTokenProxy = m.contract("TransparentUpgradeableProxy", [
		YieldToken,
		proxyAdminOwner,
		"0x",
	]);

	const proxyAdminAddress = m.readEventArgument(
		YieldTokenProxy,
		"AdminChanged",
		"newAdmin"
	);

	const YieldTokenProxyAdmin = m.contractAt("ProxyAdmin", proxyAdminAddress);

	return { YieldTokenProxy, YieldTokenProxyAdmin };
});

export default YieldTokenProxyModule;
