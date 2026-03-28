'use client'

import { ConnectKitButton } from 'connectkit'
import { Shield, TrendingUp, Info } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6 mb-12 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 tracking-tight">
          ResuDA
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 ml-12 mr-auto font-medium text-slate-400 transition-all">
        <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-purple-400" />
          News Feed
        </a>
        <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400" />
          About ResuDA
        </a>
      </div>

      <div className="flex items-center gap-4">
        <ConnectKitButton />
      </div>
    </nav>
  )
}
