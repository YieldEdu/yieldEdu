import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "solidity-coverage";

const { vars } = require("hardhat/config");
const ACCOUNT_PRIVATE_KEY = vars.get("ACCOUNT_PRIVATE_KEY");

if (!ACCOUNT_PRIVATE_KEY) {
	throw new Error(
		"ACCOUNT_PRIVATE_KEY is not set. use npx hardhat vars set ACCOUNT_PRIVATE_KEY"
	);
}

const config: HardhatUserConfig = {
	// defaultNetwork: "",
	gasReporter: {
		enabled: false,
		outputFile: "gas-report.txt",
		noColors: true,
	},
	solidity: {
		version: "0.8.28",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		"edu-testnet": {
			url: "https://rpc.open-campus-codex.gelato.digital",
			accounts: [ACCOUNT_PRIVATE_KEY],
		},
		edu: {
			url: "https://rpc.edu-chain.raas.gelato.cloud",
			accounts: [ACCOUNT_PRIVATE_KEY],
		},
	},
	etherscan: {
		apiKey: "",
		customChains: [
			{
				chainId: 656476,
				network: "edu-testnet",
				urls: {
					apiURL: "https://opencampus-codex.blockscout.com/api",
					browserURL: "https://opencampus-codex.blockscout.com",
				},
			},
			{
				chainId: 41923,
				network: "edu",
				urls: {
					apiURL: "",
					browserURL: "https://rpc.edu-chain.raas.gelato.cloud",
				},
			},
		],
	},
};

export default config;
