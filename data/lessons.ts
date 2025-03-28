export interface lessonsInterface {
	id: string;
	title: string;
	description: string;
	duration: string;
	completed: boolean;
	sections: {
		title: string;
		content: (
			| {
					type: "heading" | "paragraph";
					content: string;
			  }
			| {
					type: "list";
					items: string[];
			  }
		)[];
	}[];
	quiz: { question: string; options: string[]; correctAnswer: number }[];
}

export const getAllLessons = (): lessonsInterface[] => {
	const lessons: lessonsInterface[] = [
		// Lesson 1: Introduction to DeFi
		{
			id: "introduction-to-defi",
			title: "Introduction to DeFi",
			description:
				"Learn the basics of decentralized finance and how it works.",
			duration: "15 minutes",
			completed: true,
			sections: [
				{
					title: "What is DeFi?",
					content: [
						{ type: "heading", content: "Introduction to DeFi" },
						{
							type: "paragraph",
							content:
								"DeFi stands for Decentralized Finance, a new way to manage financial assets without intermediaries.",
						},
						{
							type: "list",
							items: [
								"Built on blockchain",
								"Uses smart contracts",
								"Removes intermediaries",
							],
						},
					],
				},
				{
					title: "Why DeFi Matters",
					content: [
						{ type: "heading", content: "The Impact of DeFi" },
						{
							type: "paragraph",
							content:
								"DeFi enables global financial inclusion by giving everyone access to financial tools.",
						},
						{
							type: "list",
							items: [
								"Borderless transactions",
								"Lower fees",
								"Decentralized governance",
							],
						},
					],
				},
			],
			quiz: [
				{
					question: "What is DeFi primarily built on?",
					options: [
						"Traditional banks",
						"Blockchain technology",
						"Government regulations",
					],
					correctAnswer: 1,
				},
				{
					question: "Which of the following is NOT a benefit of DeFi?",
					options: [
						"Lower fees",
						"Centralized control",
						"Global accessibility",
					],
					correctAnswer: 1,
				},
			],
		},

		// Lesson 2: Blockchain & Smart Contracts
		{
			id: "blockchain-and-smart-contracts",
			title: "Blockchain & Smart Contracts",
			description: "Understand the technology that powers DeFi applications.",
			duration: "20 minutes",
			completed: false,
			sections: [
				{
					title: "How Blockchain Works",
					content: [
						{ type: "heading", content: "The Role of Blockchain in DeFi" },
						{
							type: "paragraph",
							content:
								"Blockchain provides the decentralized infrastructure for DeFi.",
						},
						{
							type: "list",
							items: [
								"Immutable ledger",
								"Decentralized consensus",
								"Transparency and security",
							],
						},
					],
				},
				{
					title: "What Are Smart Contracts?",
					content: [
						{ type: "heading", content: "Automating Transactions" },
						{
							type: "paragraph",
							content:
								"Smart contracts execute transactions automatically based on pre-set conditions.",
						},
						{
							type: "list",
							items: [
								"Trustless execution",
								"No need for intermediaries",
								"Used in lending, trading, and staking",
							],
						},
					],
				},
			],
			quiz: [
				{
					question: "What is a smart contract?",
					options: [
						"A legal document",
						"A self-executing contract on blockchain",
						"A bank agreement",
					],
					correctAnswer: 1,
				},
				{
					question: "Which of the following is a feature of blockchain?",
					options: [
						"Centralized control",
						"Immutable ledger",
						"High transaction fees",
					],
					correctAnswer: 1,
				},
			],
		},

		// Lesson 3: DeFi Lending & Borrowing
		{
			id: "defi-lending",
			title: "DeFi Lending & Borrowing",
			description: "Learn how DeFi lending protocols work.",
			duration: "25 minutes",
			completed: false,
			sections: [
				{
					title: "Understanding DeFi Lending",
					content: [
						{ type: "heading", content: "How Lending Works" },
						{
							type: "paragraph",
							content:
								"DeFi lending allows users to lend and borrow assets without intermediaries.",
						},
						{
							type: "list",
							items: [
								"Collateralized loans",
								"Interest earned by lenders",
								"Smart contract automation",
							],
						},
					],
				},
				{
					title: "Top DeFi Lending Platforms",
					content: [
						{ type: "heading", content: "Platforms to Know" },
						{
							type: "paragraph",
							content:
								"Popular DeFi lending platforms include Aave, Compound, and MakerDAO.",
						},
						{ type: "list", items: ["Aave", "Compound", "MakerDAO"] },
					],
				},
			],
			quiz: [
				{
					question: "What is required for most DeFi loans?",
					options: ["A credit score", "Collateral", "A bank account"],
					correctAnswer: 1,
				},
				{
					question: "Which of the following is a DeFi lending platform?",
					options: ["Uniswap", "Aave", "Bitcoin"],
					correctAnswer: 1,
				},
			],
		},

		// Lesson 4: DeFi Staking & Yield Farming
		{
			id: "defi-staking-yield-farming",
			title: "DeFi Staking & Yield Farming",
			description:
				"Learn how staking and yield farming generate passive income.",
			duration: "30 minutes",
			completed: false,
			sections: [
				{
					title: "Understanding Staking",
					content: [
						{ type: "heading", content: "What is Staking?" },
						{
							type: "paragraph",
							content:
								"Staking involves locking crypto assets to support a blockchain network and earn rewards.",
						},
						{
							type: "list",
							items: [
								"Used in Proof-of-Stake (PoS) networks",
								"Earn rewards by securing the network",
								"Example: Ethereum 2.0 staking",
							],
						},
					],
				},
				{
					title: "Yield Farming Explained",
					content: [
						{ type: "heading", content: "Maximizing Rewards with Liquidity" },
						{
							type: "paragraph",
							content:
								"Yield farming involves providing liquidity to DeFi protocols in exchange for rewards.",
						},
						{
							type: "list",
							items: [
								"Liquidity pools",
								"APY (Annual Percentage Yield)",
								"Risks: Impermanent loss",
							],
						},
					],
				},
			],
			quiz: [
				{
					question: "What is the main purpose of staking?",
					options: [
						"Speculation",
						"Network security & earning rewards",
						"Short-term trading",
					],
					correctAnswer: 1,
				},
				{
					question: "What is a risk associated with yield farming?",
					options: ["Impermanent loss", "Fixed returns", "No risk involved"],
					correctAnswer: 0,
				},
			],
		},

		// Lesson 5: DeFi Trading & DEXs
		{
			id: "defi-trading-dex",
			title: "DeFi Trading & Decentralized Exchanges (DEXs)",
			description: "Learn how to trade assets on decentralized platforms.",
			duration: "35 minutes",
			completed: false,
			sections: [
				{
					title: "How Decentralized Exchanges Work",
					content: [
						{ type: "heading", content: "The Power of DEXs" },
						{
							type: "paragraph",
							content:
								"Decentralized exchanges allow peer-to-peer trading without intermediaries.",
						},
						{
							type: "list",
							items: [
								"Uses smart contracts",
								"No KYC needed",
								"Examples: Uniswap, SushiSwap, PancakeSwap",
							],
						},
					],
				},
				{
					title: "Understanding Slippage & Liquidity",
					content: [
						{ type: "heading", content: "Key Trading Concepts" },
						{
							type: "paragraph",
							content:
								"Slippage occurs when there is a difference between the expected price and execution price.",
						},
						{
							type: "list",
							items: [
								"Liquidity pools",
								"Market depth",
								"Gas fees impact trading",
							],
						},
					],
				},
			],
			quiz: [
				{
					question: "What is a DEX primarily used for?",
					options: ["Staking tokens", "Trading crypto assets", "Storing NFTs"],
					correctAnswer: 1,
				},
				{
					question: "What is slippage in trading?",
					options: [
						"A type of fee",
						"The difference between expected and executed price",
						"A type of cryptocurrency",
					],
					correctAnswer: 1,
				},
			],
		},

		// Lesson 6: Risks & Security in DeFi
		{
			id: "defi-risks-security",
			title: "Risks & Security in DeFi",
			description: "Understand how to protect your funds in DeFi.",
			duration: "40 minutes",
			completed: false,
			sections: [
				{
					title: "Common Risks in DeFi",
					content: [
						{ type: "heading", content: "Understanding Risks" },
						{
							type: "paragraph",
							content:
								"DeFi is innovative but comes with risks such as smart contract vulnerabilities and rug pulls.",
						},
						{
							type: "list",
							items: [
								"Impermanent loss",
								"Flash loan attacks",
								"Regulatory risks",
							],
						},
					],
				},
				{
					title: "Security Best Practices",
					content: [
						{ type: "heading", content: "How to Stay Safe" },
						{
							type: "paragraph",
							content:
								"To minimize risks, users should follow security best practices in DeFi.",
						},
						{
							type: "list",
							items: [
								"Use hardware wallets",
								"Avoid unknown smart contracts",
								"Perform thorough research before investing",
							],
						},
					],
				},
			],
			quiz: [
				{
					question: "Which of these is a common DeFi security risk?",
					options: [
						"Fixed interest rates",
						"Flash loan attacks",
						"CeFi integration",
					],
					correctAnswer: 1,
				},
				{
					question: "What is a recommended security practice in DeFi?",
					options: [
						"Use hardware wallets",
						"Share private keys",
						"Invest without research",
					],
					correctAnswer: 0,
				},
			],
		},

		// Lesson 7: DeFi Governance
		{
			id: "defi-governance",
			title: "DeFi Governance",
			description: "Learn how decentralized governance works in DeFi.",
			duration: "20 minutes",
			completed: false,
			sections: [
				{
					title: "What is DeFi Governance?",
					content: [
						{ type: "heading", content: "Decentralized Decision-Making" },
						{
							type: "paragraph",
							content:
								"DeFi governance allows token holders to vote on protocol changes and upgrades.",
						},
						{
							type: "list",
							items: [
								"Governance tokens",
								"Proposal submission",
								"Voting mechanisms",
							],
						},
					],
				},
				{
					title: "Examples of DeFi Governance",
					content: [
						{ type: "heading", content: "Governance in Action" },
						{
							type: "paragraph",
							content:
								"Popular DeFi projects like Uniswap and Compound use governance tokens to empower their communities.",
						},
						{
							type: "list",
							items: ["Uniswap (UNI)", "Compound (COMP)", "MakerDAO (MKR)"],
						},
					],
				},
			],
			quiz: [
				{
					question: "What is the purpose of governance tokens?",
					options: [
						"To trade on exchanges",
						"To vote on protocol changes",
						"To store value",
					],
					correctAnswer: 1,
				},
				{
					question: "Which of the following is a governance token?",
					options: ["UNI", "BTC", "ETH"],
					correctAnswer: 0,
				},
			],
		},

		// Lesson 8: DeFi Insurance
		{
			id: "defi-insurance",
			title: "DeFi Insurance",
			description: "Learn how insurance works in the DeFi ecosystem.",
			duration: "25 minutes",
			completed: false,
			sections: [
				{
					title: "What is DeFi Insurance?",
					content: [
						{ type: "heading", content: "Protecting Your Assets" },
						{
							type: "paragraph",
							content:
								"DeFi insurance provides coverage against risks such as smart contract failures and hacks.",
						},
						{
							type: "list",
							items: [
								"Smart contract coverage",
								"Custodial insurance",
								"Decentralized insurance protocols",
							],
						},
					],
				},
				{
					title: "Top DeFi Insurance Platforms",
					content: [
						{ type: "heading", content: "Platforms to Know" },
						{
							type: "paragraph",
							content:
								"Popular DeFi insurance platforms include Nexus Mutual and Cover Protocol.",
						},
						{
							type: "list",
							items: ["Nexus Mutual", "Cover Protocol", "Opyn"],
						},
					],
				},
			],
			quiz: [
				{
					question: "What does DeFi insurance protect against?",
					options: [
						"Market volatility",
						"Smart contract failures",
						"Regulatory changes",
					],
					correctAnswer: 1,
				},
				{
					question: "Which of the following is a DeFi insurance platform?",
					options: ["Nexus Mutual", "Uniswap", "Aave"],
					correctAnswer: 0,
				},
			],
		},

		// Lesson 9: DeFi Derivatives
		{
			id: "defi-derivatives",
			title: "DeFi Derivatives",
			description: "Learn about derivatives in the DeFi ecosystem.",
			duration: "30 minutes",
			completed: false,
			sections: [
				{
					title: "What are DeFi Derivatives?",
					content: [
						{ type: "heading", content: "Financial Instruments in DeFi" },
						{
							type: "paragraph",
							content:
								"DeFi derivatives are financial contracts that derive their value from underlying assets like cryptocurrencies.",
						},
						{
							type: "list",
							items: [
								"Futures contracts",
								"Options trading",
								"Synthetic assets",
							],
						},
					],
				},
				{
					title: "Examples of DeFi Derivatives",
					content: [
						{ type: "heading", content: "Derivatives in Action" },
						{
							type: "paragraph",
							content:
								"Platforms like Synthetix and dYdX offer decentralized derivatives trading.",
						},
						{
							type: "list",
							items: ["Synthetix", "dYdX", "Opyn"],
						},
					],
				},
			],
			quiz: [
				{
					question: "What are DeFi derivatives?",
					options: [
						"Physical assets",
						"Financial contracts based on underlying assets",
						"Governance tokens",
					],
					correctAnswer: 1,
				},
				{
					question: "Which platform is known for DeFi derivatives?",
					options: ["Synthetix", "Uniswap", "Compound"],
					correctAnswer: 0,
				},
			],
		},

		// Lesson 10: DeFi and Regulation
		{
			id: "defi-regulation",
			title: "DeFi and Regulation",
			description: "Understand the regulatory landscape of DeFi.",
			duration: "35 minutes",
			completed: false,
			sections: [
				{
					title: "Regulatory Challenges in DeFi",
					content: [
						{ type: "heading", content: "Navigating the Legal Landscape" },
						{
							type: "paragraph",
							content:
								"DeFi operates in a largely unregulated space, but governments are starting to take notice.",
						},
						{
							type: "list",
							items: [
								"Compliance with AML/KYC",
								"Tax implications",
								"Cross-border regulations",
							],
						},
					],
				},
				{
					title: "Future of DeFi Regulation",
					content: [
						{ type: "heading", content: "What Lies Ahead" },
						{
							type: "paragraph",
							content:
								"As DeFi grows, regulators are likely to introduce frameworks to ensure consumer protection and financial stability.",
						},
						{
							type: "list",
							items: [
								"Potential for stricter regulations",
								"Impact on innovation",
								"Global coordination",
							],
						},
					],
				},
			],
			quiz: [
				{
					question: "What is a major regulatory challenge for DeFi?",
					options: [
						"Lack of innovation",
						"Compliance with AML/KYC",
						"No challenges",
					],
					correctAnswer: 1,
				},
				{
					question: "What is the future of DeFi regulation?",
					options: [
						"No regulation",
						"Stricter frameworks",
						"DeFi will remain unregulated",
					],
					correctAnswer: 1,
				},
			],
		},
	];
	return lessons;
};
