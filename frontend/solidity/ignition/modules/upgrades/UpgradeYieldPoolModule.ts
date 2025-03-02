import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config";
import YieldPoolProxyModule from "./YieldPoolProxyModule";
import yieldTokenV2Module from "./YieldTokenV2Module";

const ACCOUNT_ADDRESS = vars.get("ACCOUNT_ADDRESS");
if (!ACCOUNT_ADDRESS) {
	throw new Error(
		`ACCOUNT_ADDRESS is not set. "use npx hardhat vars set ACCOUNT_ADDRESS"`
	);
}

const upgradeModule = buildModule("upgradeModule", (m) => {
	const proxyAdminOwner = ACCOUNT_ADDRESS;

	const { yieldPoolProxy, yieldPoolProxyAdmin } =
		m.useModule(YieldPoolProxyModule);

	const { yieldTokenV2 } = m.useModule(yieldTokenV2Module);
	const YieldPoolV2 = m.contract("YieldPoolV2");

	const YieldPoolInitData = m.encodeFunctionCall(YieldPoolV2, "initialize", [
		yieldTokenV2, // YieldTokenV2 proxy address
		"10", // yield rate (10%)
		"86400", // min duration (1 day)
		"31536000", // max duration (1 year)
	]);

	// Perform upgrade with initialization
	m.call(
		yieldPoolProxyAdmin,
		"upgradeAndCall",
		[yieldPoolProxy, YieldPoolV2, YieldPoolInitData],
		{
			from: proxyAdminOwner,
			id: "upgradeProxyCall",
		}
	);

	return {
		yieldPoolProxyAdmin,
		yieldPoolProxy,
	};
});

export default upgradeModule;
