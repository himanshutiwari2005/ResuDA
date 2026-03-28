import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from 'connectkit'
import { defineChain } from 'viem'

export const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'MONAD', symbol: 'MONAD', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MonadExplorer', url: 'https://explorer.monad-testnet.ai' },
  },
  testnet: true,
})

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

// A robust configuration that prevents crashing if Project ID is missing
export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [monadTestnet, mainnet, sepolia],
    transports: {
      [monadTestnet.id]: http(),
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },

    // WalletConnect v2 Project ID - MUST be obtained from cloud.walletconnect.com
    // Handling the case where the ID is missing to prevent startup crashes
    walletConnectProjectId: projectId || '00000000000000000000000000000000',

    // Required App Info
    appName: 'ResuDA',

    // Optional App Info
    appDescription: 'Web3 AI Bias & Community Correction',
    appUrl: 'https://resuda.ai',
    appIcon: 'https://resuda.ai/logo.png',
  }),
)
