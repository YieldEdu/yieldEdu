import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import YieldTokenProxyModule from "./upgrades/YieldTokenProxyModule";

const YieldTokenModule = buildModule("YieldTokenModule", (m) => {
	const { YieldTokenProxy, YieldTokenProxyAdmin } = m.useModule(
		YieldTokenProxyModule
	);
	const YieldToken = m.contractAt("YieldToken", YieldTokenProxy); //constructor args

	return { YieldToken, YieldTokenProxy, YieldTokenProxyAdmin };
});

export default YieldTokenModule;
