'use client'

import { ConnectKitButton } from 'connectkit'
import { ShieldCheck, Activity } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-[color:var(--rule)] bg-[color:var(--paper)]">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Mast section */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-[color:var(--rule)] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 opacity-80" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-lg sm:text-xl tracking-tight"
                style={{ fontFamily: 'var(--font-head)' }}
              >
                NewsChecker
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.18em] opacity-65"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                News Integrity Desk
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-[color:var(--rule)]">
            <div
              className="px-2 py-1 border border-[color:var(--rule)] text-[10px] uppercase tracking-widest opacity-70"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Network: Monad Testnet
            </div>
            <div
              className="px-2 py-1 border border-[color:var(--rule)] text-[10px] uppercase tracking-widest opacity-70 flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              <Activity className="w-3 h-3" />
              Chain ID: 10143
            </div>
          </div>
        </div>

        {/* Wallet action */}
        <div className="flex items-center gap-3">
          <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress, ensName, isConnecting }) => (
              <button
                onClick={show}
                className="glass-button hover:bg-[color:var(--soft-tint)] transition-colors"
              >
                <span
                  className="inline-block w-1.5 h-1.5 bg-black/70"
                  aria-hidden
                />
                <span>
                  {isConnecting
                    ? 'Connecting...'
                    : isConnected
                    ? (ensName ?? truncatedAddress)
                    : 'Connect Wallet'}
                </span>
              </button>
            )}
          </ConnectKitButton.Custom>
        </div>
      </div>
    </nav>
  )
}
