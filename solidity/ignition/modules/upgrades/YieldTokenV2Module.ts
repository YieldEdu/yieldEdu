import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import YieldTokenModule from "../YieldTokenModule";

const yieldTokenV2Module = buildModule("YieldTokenV2Module", (m) => {
	const { YieldTokenProxy } = m.useModule(YieldTokenModule);

	const yieldTokenV2 = m.contractAt("YieldTokenV2", YieldTokenProxy);

	return { yieldTokenV2 };
});

export default yieldTokenV2Module;
