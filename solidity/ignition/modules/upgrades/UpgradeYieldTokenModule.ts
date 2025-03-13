import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config";
import YieldTokenProxyModule from "./YieldTokenProxyModule";
import yieldPoolV2Module from "./YieldPoolV2Module";

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
	const { YieldPoolV2 } = m.useModule(yieldPoolV2Module);

	// Initialize the token with name and symbol
	const YieldTokenInitData = m.encodeFunctionCall(yieldTokenV2, "initialize", [
		"YieldEDU",
		"YDU",
		proxyAdminOwner,
	]);

	// First: Upgrade the proxy with the new implementation
	const upgradeCall = m.call(
		YieldTokenProxyAdmin,
		"upgradeAndCall",
		[YieldTokenProxy, yieldTokenV2, YieldTokenInitData],
		{
			from: proxyAdminOwner,
			id: "upgradeProxyCall",
		}
	);
	// Create a contract instance with the V2 ABI at the proxy address
	const proxiedYieldTokenV2 = m.contractAt("YieldTokenV2", YieldTokenProxy, {
		id: "YieldTokenV2Proxy",
		after: [upgradeCall],
	});

	// Set minter directly after upgrade
	m.call(proxiedYieldTokenV2, "setMinter", [YieldPoolV2.address, true], {
		from: proxyAdminOwner,
		id: "setMinter",
		after: [upgradeCall],
	});

	return {
		YieldTokenProxyAdmin,
		YieldTokenProxy,
	};
});

export default upgradeModule;
