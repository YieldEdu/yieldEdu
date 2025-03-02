import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config";
import YieldTokenProxyModule from "./YieldTokenProxyModule";

const ACCOUNT_ADDRESS = vars.get("ACCOUNT_ADDRESS");
if (!ACCOUNT_ADDRESS) {
	throw new Error(
		`ACCOUNT_ADDRESS is not set. "use npx hardhat vars set ACCOUNT_ADDRESS"`
	);
}

const upgradeModule = buildModule("upgradeModule", (m) => {
	const proxyAdminOwner = ACCOUNT_ADDRESS;
	const { YieldTokenProxyAdmin, YieldTokenProxy } = m.useModule(
		YieldTokenProxyModule
	);

	const yieldTokenV2 = m.contract("YieldTokenV2");

	// Initialize the token with name and symbol
	const YieldTokenInitData = m.encodeFunctionCall(yieldTokenV2, "initialize", [
		"YieldEDU",
		"YDU",
	]);

	// Upgrade the proxy with the new implementation and initialize
	m.call(
		YieldTokenProxyAdmin,
		"upgradeAndCall",
		[YieldTokenProxy, yieldTokenV2, YieldTokenInitData],
		{
			from: proxyAdminOwner,
			id: "upgradeProxyCall",
		}
	);

	return {
		YieldTokenProxyAdmin,
		YieldTokenProxy,
	};
});

export default upgradeModule;
