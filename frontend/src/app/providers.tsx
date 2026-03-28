'use client'

import React, { ReactNode, useState, useEffect } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import { config } from '@/lib/wagmi'

export function Providers({ children }: { children: ReactNode }) {
  // Initialize QueryClient inside the component to be SSR-safe in Next.js 14
  const [queryClient] = useState(() => new QueryClient())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
            {children}
          </div>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
