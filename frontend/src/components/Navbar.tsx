'use client'

import { motion } from 'framer-motion'
import { ConnectKitButton } from 'connectkit'
import { Zap, ShieldCheck, Activity } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-white/[0.08] bg-black/60 backdrop-blur-2xl">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand/Logo Section */}
        <div className="flex items-center gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-violet-600/20 border border-violet-500/30 shadow-[0_0_20px_rgba(131,100,232,0.2)]">
              <ShieldCheck className="w-7 h-7 text-violet-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter shimmer-text">
                ResuDA
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-violet-400 font-bold -mt-1">
                News Integrity
              </span>
            </div>
          </motion.div>

          {/* Broadcast Status (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-4 pl-8 border-l border-white/10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Network: Monad Testnet</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10">
              <Activity className="w-3 h-3 text-violet-400" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Chain ID: 10143</span>
            </div>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold tracking-widest uppercase">
            <Zap className="w-4 h-4 fill-current" />
            AI Live Analysis Available
          </div>

          <div className="h-10 w-px bg-white/10" />

          <ConnectKitButton.Custom>
            {({ isConnected, isConnecting, show, truncatedAddress, ensName }) => {
              return (
                <button
                  onClick={show}
                  className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all duration-300 font-bold text-xs uppercase tracking-widest overflow-hidden ${isConnected
                      ? 'border-violet-500/40 bg-violet-600/10 text-white'
                      : 'border-white/10 bg-white/5 hover:border-violet-500/60 hover:bg-violet-600/20 text-white/60 hover:text-white'
                    }`}
                >
                  <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(131,100,232,1)]" />
                  {isConnected ? (ensName ?? truncatedAddress) : 'Commence Control'}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/10 to-violet-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>
              )
            }}
          </ConnectKitButton.Custom>
        </div>
      </div>
    </nav>
  )
}
