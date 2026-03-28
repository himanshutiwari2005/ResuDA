# ResuDA

Decentralized news-bias analysis platform with:

- **Frontend**: Next.js app (`frontend/`)
- **Smart Contracts**: Foundry Solidity workspace (`smart-contracts/`)

---

## Repository Structure

```text
ResuDA/
├─ frontend/             # Next.js + Tailwind + wagmi/connectkit UI
│  ├─ src/app/           # App router pages, layout, API routes
│  ├─ src/components/    # UI components (NewsFeed, BiasAnalysis, CommunityNotes, Navbar)
│  ├─ src/lib/           # Shared utilities (wagmi config, helpers)
│  └─ public/
├─ smart-contracts/      # Foundry contracts + scripts
│  ├─ src/               # Solidity sources (includes ResuDA.sol)
│  ├─ script/            # Deploy scripts
│  ├─ test/              # Contract tests
│  └─ foundry.toml
└─ README.md
```

---

## What ResuDA Does

- Pulls and displays news feed in an editorial UI
- Runs AI-assisted bias/context analysis
- Lets users submit and vote on community notes
- Persists note interactions via smart contract integration

---

## Tech Stack

### Frontend (`frontend/`)
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- wagmi + viem + ConnectKit (wallet + contract interaction)

### Contracts (`smart-contracts/`)
- Solidity
- Foundry (forge/cast/anvil)
- Deployment scripts in `script/`

---

## Prerequisites

- Node.js 18+
- npm
- Foundry (`forge`, `cast`, `anvil`)
- Wallet/RPC credentials for Monad Testnet (or your target chain)

---

## Local Development

### 1) Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:3000`.

> Configure environment variables in `frontend/.env` before running production-like flows.

### 2) Smart Contracts

```bash
cd smart-contracts
forge build
forge test
```

For deployment, use your Foundry script in `smart-contracts/script/` with your RPC URL and private key.

---

## Environment Configuration

### Frontend
- File: `frontend/.env`
   - Format of env is 
   ```GROQ_API_KEY = EXAMPLEKEY
      NEWSDATA_API_KEY = EXAMPLEKEY
   ```
- Add all variables required by:
  - wallet/connect config
  - API routes in `src/app/api/*`
  - contract addresses / chain configuration

### Smart Contracts
- File: `smart-contracts/.env` (see `.env.example` if present)
- Typical values:
  - `PRIVATE_KEY`
  - `RPC_URL`
  - optional explorer API key for verification

---

## Deployment

### Frontend (Vercel)
- Import repository in Vercel
- Set **Root Directory** to `frontend`
- Add `frontend/.env` values to Vercel Environment Variables
- Deploy

### Contracts
- Contracts are deployed from `smart-contracts/` using Foundry scripts.
- After deployment, copy contract addresses to frontend env/config.

---

## Main Frontend Modules

- `src/components/NewsFeed.tsx` — news listing and selection
- `src/components/BiasAnalysis.tsx` — AI analysis view
- `src/components/CommunityNotes.tsx` — on-chain notes/voting UI
- `src/components/Navbar.tsx` — masthead/navigation/wallet action

---

## Main Contract Workspace

- `smart-contracts/src/ResuDA.sol` — core contract source
- `smart-contracts/script/Deploy.s.sol` — deployment script
- `smart-contracts/test/` — test suite

---

## Notes

- `frontend/.next/` is build output and should not be edited manually.
- Keep contract ABI/address updates synchronized with frontend integration files.
- This repo is organized as a two-part system: web app + on-chain logic.


The contract has been deployed. The deployment can be chceked at: ```testnet.monadexplorer.com``` with hash ```0x266BF8b803351FDFB01De8A6c33E18cFB07D9790```

The application has been deployed at:
```https://newschecker-topaz.vercel.app/```