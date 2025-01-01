import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomicfoundation/hardhat-verify";

const { vars } = require("hardhat/config");
const ACCOUNT_PRIVATE_KEY = vars.get("ACCOUNT_PRIVATE_KEY");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

if (!ACCOUNT_PRIVATE_KEY) {
	throw new Error(
		`ACCOUNT_PRIVATE_KEY is not set. "use npx hardhat vars set ACCOUNT_PRIVATE_KEY"`
	);
}

if (!ETHERSCAN_API_KEY) {
	throw new Error(
		`ETHERSCAN_API_KEY is not set. "use npx hardhat vars set ETHERSCAN_API_KEY"`
	);
}

const config: HardhatUserConfig = {
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
		localhost: {
			url: "http://127.0.0.1:8545/",
			accounts: [
				"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", //public test address
			],
		},
	},

	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
		customChains: [
			{
				chainId: 656476,
				network: "edu-testnet",
				urls: {
					apiURL: "https://opencampus-codex.blockscout.com/api",
					browserURL: "https://opencampus-codex.blockscout.com",
				},
			},
		],
	},
};

export default config;
