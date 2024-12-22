# 🌟 EDU Fixed Yield Protocol

A decentralized fixed-yield protocol built on EDU Chain that enables users to earn guaranteed yields on their EDU tokens while contributing to the educational ecosystem.

![EDU](https://github.com/user-attachments/assets/6e7cd216-f018-4f28-8485-1ab3669e9927)

## 🎯 Overview

EDU Fixed Yield Protocol introduces a innovative approach to DeFi yield generation by:

- Providing fixed-rate yields on EDU token deposits
- Implementing a staking mechanism for enhanced returns
- Creating a sustainable yield generation model
- Contributing to EDU Chain's TVL and ecosystem growth

### 🌟 Key Features

- **Fixed Yield Generation**: Lock EDU tokens for predetermined periods (7-365 days) and earn guaranteed yields
- **Yield Token System**: Receive FYT tokens representing your yield position
- **Flexible Lock Durations**: Choose lock periods that suit your investment strategy
- **Staking Rewards**: Stake EDU tokens to earn additional rewards
- **Gas Optimized**: Implemented with gas efficiency in mind

## 🛠 Technical Implementation

### Smart Contracts

1. **YieldToken.sol**

   - ERC20-compliant yield token
   - Represents tokenized yield positions
   - Controlled minting/burning mechanisms

2. **YieldPool.sol**

   - Core yield generation logic
   - Position management
   - Duration-based yield calculations

3. **StakingRewards.sol**
   - EDU token staking functionality
   - Additional reward mechanisms
   - Stake tracking system

### Architecture

```README.md

User
  │
  ├─ YieldPool
  │   ├─ Deposit EDU
  │   ├─ Receive YieldTokens
  │   └─ Withdraw Principal + Yield
  │
  └─ StakingRewards
      ├─ Stake EDU
      └─ Earn Staking Rewards
```

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- NPM or Yarn
- Hardhat

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/edu-fixed-yield

# Install dependencies
cd edu-fixed-yield
npm install

# Configure environment variables
# Add wallet address
 npx hardhat vars set ACCOUNT_ADDRESS
✔ Enter value: ********************************
# Account address is the same as your wallet address

![for more information on Configure environment variables ](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables)

# Configuration variables are stored in plain text on your disk. Avoid using this feature for data you wouldn’t normally save in an unencrypted file. Run npx hardhat vars path to find the storage's file location.


# (optional) create a localhost JSON-RPC server. add this network to metamask by creating a custom network. Import the private key into metamask to see funds.
npx hardhat node

# Compile smartContract
npx hardhat compile

# Deploying the smartContract to EDU Chain
npx hardhat ignition deploy ./ignition/modules/YieldToken.ts

# Run tests
npx hardhat test

```

### Smart Contract Addresses

- EDU Token: `[EDU_TOKEN_ADDRESS]`
- YieldPool: `[YIELD_POOL_ADDRESS]`
- StakingRewards: `[STAKING_REWARDS_ADDRESS]`

## 💻 Frontend Interface

Our protocol features a modern, user-friendly interface built with:

- React.js
- TailwindCSS
- shadcn/ui components
- Web3 integration

### Features

- Interactive deposit/withdraw interface
- Real-time yield calculations
- Position tracking dashboard
- Analytics visualization
- Wallet integration

## 🔒 Security Considerations

- Implemented ReentrancyGuard for all external functions
- Comprehensive input validation
- Access control mechanisms
- Emergency withdrawal functionality
- Gas optimization without compromising security

## Running the frontend

```shell
 cd frontend
# pnpm install or npm install
#pnpm dev or npm run dev

```

## 🧪 Testing

```shell

# Run all tests
npx hardhat test
REPORT_GAS=true npx hardhat test

# Run specific test file
npx hardhat test test/YieldPool.test.js

# Get coverage report
npx hardhat coverage

#help
npx hardhat help


```

## 📈 Project Impact

### Ecosystem Contribution

- Increases EDU Chain TVL
- Provides new utility for EDU tokens
- Encourages long-term token locking
- Attracts new users to the ecosystem

### Innovation

- Fixed yield mechanism
- Educational integration potential
- Scalable architecture
- Gas-optimized implementation

## 🛣 Future Roadmap

1. **Phase 1**: Core Protocol Launch

   - Basic fixed yield functionality
   - Staking mechanism
   - Frontend interface

2. **Phase 2**: Enhanced Features

   - Educational milestones integration
   - Dynamic yield rates
   - Governance implementation

3. **Phase 3**: Ecosystem Expansion
   - Cross-chain integration
   - Additional yield strategies
   - Advanced analytics

## 👥 Team

- Kamasah Dickson - Smart Contract Developer
- SmartContract dev, Web3 and Fullstack Dev

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with 💙 for RISEIN EDU Chain Hackathon 2024
