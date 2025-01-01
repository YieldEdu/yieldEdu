# 🌟 EDU Fixed Yield Protocol

A decentralized fixed-yield protocol built on EDU Chain that enables users to earn guaranteed yields on their EDU tokens.

## 🔧 Prerequisites

- Node.js v18+
- Git
- A wallet with EDU testnet tokens
- An IDE (VS Code recommended)

## 🚀 Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/Kamasah-Dickson/Risein-ICP-bootcamp
cd Risein-ICP-bootcamp
```

2. **Install dependencies**

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. **Set up environment variables**

````bash
# In the root directory
npx hardhat vars set ACCOUNT_PRIVATE_KEY
# Enter your wallet's private key when prompted

4. **Compile Smart Contracts**

```bash
# In the root directory
npx hardhat compile
````

5. **Run Tests**

```bash
npx hardhat test
```

6. **Start Frontend Development Server**

```bash
# In the frontend directory
cd frontend
npm run dev
```

7. **Access the Application**
   Open `http://localhost:3000` in your browser

## 📝 Contract Addresses (EDU Testnet)

<!-- - YieldToken: `0xaE90E60d95396012D611148899f66c0989246337`
- YieldPool: `0x9D27d14D8Ea738823Ab0a74493F4B7DA11F3F005` -->

## 🧪 Testing

```bash
# Run all tests with gas reporting
REPORT_GAS=true npx hardhat test

# Run coverage
npx hardhat coverage
```

## 🔍 Features

- Fixed yield generation on EDU token deposits
- Flexible lock durations (7-365 days)
- Real-time yield tracking
- User-friendly dashboard
- Interactive analytics

## 🛠 Tech Stack

- **Frontend**: Next.js, TailwindCSS, shadcn/ui
- **Web3**: Reown AppKit, wagmi, viem
- **Smart Contracts**: Solidity, Hardhat
- **Testing**: Hardhat, Chai

## 📈 Local Development

1. **Start Local Hardhat Node**

```bash
npx hardhat node
```

2. **Deploy Contracts Locally**

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

3. **Configure Frontend**

- Update contract addresses in `frontend/lib/utils.ts`
- Ensure your wallet is connected to localhost network

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

Built by [Kamasah Dickson](https://kamasahdickson.vercel.app)
