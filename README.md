# ResuDA: Web3 AI Bias & Community Correction

**ResuDA** is a decentralized truth-seeking platform for the Monad Blitz hackathon. It utilizes local **Llama 3.1:8b** for initial bias detection and **Monad Testnet** for community-verified corrections.

## Features
- **AI Bias Check**: Real-time analysis of news articles to identify misinterpreted lines and missing context via local Ollama.
- **Community Corrections**: Web3 "Community Notes" stored on-chain for transparent, immutable fact-checking.
- **Monad Integration**: High-throughput transaction handling on the Monad testnet.
- **On-chain Reputation**: Users gain credibility through verifiable community engagement.

## Getting Started

### Prerequisites
1. **Ollama**: Install [Ollama](https://ollama.com/) and run Llama 3.1:
   ```bash
   ollama run llama3.1:8b
   ```
2. **Node.js**: Ensure you're on a recent version (v18+).

### Installation
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```

## Smart Contracts
The unified contract `ResuDA.sol` is located in the `smart-contracts/` directory.

## Contributing
- **AI Engine**: Local Llama 3.1 (via Ollama)
- **Blockchain**: Monad Testnet (Chain ID 10143)
- **Frontend**: Next.js 14, Tailwind, Framer Motion

---
Built for the **Monad Blitz** Hackathon.
