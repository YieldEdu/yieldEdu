import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum } from "wagmi/chains";
import { defineChain } from "viem";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
	throw new Error("PROJECT_ID environment variable is not defined");
}

export const edu = defineChain({
	id: 41923,
	name: "EDU Chain",
	iconURL:
		"https://opencampus.xyz/static/media/coin-logo.39cbd6c42530e57817a5b98ac7621ca7.svg",
	nativeCurrency: {
		name: "EDU Chain",
		symbol: "EDU",
		decimals: 18,
	},
	rpcUrls: {
		default: {
			http: ["https://rpc.edu-chain.raas.gelato.cloud"], // Provided RPC URL
		},
	},
	blockExplorers: {
		default: {
			name: "EDU Explorer",
			url: "https://educhain.blockscout.com",
		},
	},
});
export const eduTestnet = defineChain({
	id: 656476,
	iconURL:
		"https://opencampus.xyz/static/media/coin-logo.39cbd6c42530e57817a5b98ac7621ca7.svg",
	name: "EDU Chain Testnet",
	nativeCurrency: {
		name: "EDU Chain",
		symbol: "EDU",
		decimals: 18,
	},

	testnet: true,
	rpcUrls: {
		default: {
			http: ["https://rpc.open-campus-codex.gelato.digital"],
		},
	},
	blockExplorers: {
		default: {
			name: "EDU Explorer",
			url: "https://edu-chain-testnet.blockscout.com",
		},
	},
});

export const config = getDefaultConfig({
	appName: "YieldStake",
	projectId,
	chains: [
		arbitrum,
		edu,
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [eduTestnet] : []),
	],
	ssr: true,
});
