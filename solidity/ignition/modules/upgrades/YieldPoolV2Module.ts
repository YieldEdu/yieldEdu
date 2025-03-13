import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import YieldPoolProxyModule from "./YieldPoolProxyModule";

const yieldPoolV2Module = buildModule("yieldPoolV2Module", (m) => {
	const { yieldPoolProxy } = m.useModule(YieldPoolProxyModule);

	const YieldPoolV2 = m.contractAt("YieldPoolV2", yieldPoolProxy);

	return { YieldPoolV2 };
});

export default yieldPoolV2Module;
