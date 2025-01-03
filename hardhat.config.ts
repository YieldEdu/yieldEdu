const { HardhatUserConfig } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomicfoundation/hardhat-verify");

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

const config = {
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
	},

	etherscan: {
		apiKey: {
			"edu-testnet": ETHERSCAN_API_KEY,
		},
		customChains: [
			{
				chainId: 656476,
				network: "edu-testnet",
				urls: {
					apiURL: "https://edu-chain-testnet.blockscout.com/api",
					browserURL: "https://edu-chain-testnet.blockscout.com",
				},
			},
		],
	},

	sourcify: {
		enabled: false,
	},
};

module.exports = config;
