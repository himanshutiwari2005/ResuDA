'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { NewsFeed } from '@/components/NewsFeed'
import { BiasAnalysis } from '@/components/BiasAnalysis'
import { CommunityNotes } from '@/components/CommunityNotes'
import { ArrowLeft, Sparkles, Zap, ShieldCheck } from 'lucide-react'

export default function Home() {
  const [selectedNews, setSelectedNews] = useState<any>(null)

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <AnimatePresence mode="wait">
        {!selectedNews ? (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase mb-4"
              >
                <Zap className="w-4 h-4 fill-current" />
                Live on Monad Testnet
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 leading-none">
                Truth Through <br />
                <span className="text-blue-500">Decentralized AI.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                Identify bias, misinterpreted lines, and missing context in real-time news with LLama 3.1 and community-verified hashing.
              </p>

              <div className="flex items-center justify-center gap-6 pt-6">
                <div className="flex items-center gap-2 text-slate-500">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>On-chain Verifiability</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span>AI-Driven Analysis</span>
                </div>
              </div>
            </div>

            <section className="pt-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Recent Global News</h2>
                <div className="h-px bg-white/10 flex-grow mx-8" />
              </div>
              <NewsFeed onSelectNews={setSelectedNews} />
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12 max-w-5xl mx-auto"
          >
            <button
              onClick={() => setSelectedNews(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group mb-8"
            >
              <div className="p-2 rounded-full bg-slate-900 border border-white/5 group-hover:border-white/20">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-bold tracking-tight">Back to Feed</span>
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest border border-purple-500/20">
                  {selectedNews.category}
                </span>
                <span className="text-slate-500 text-sm">{selectedNews.source} • {selectedNews.timestamp}</span>
              </div>
              <h2 className="text-5xl font-black tracking-tighter text-white leading-tight">
                {selectedNews.title}
              </h2>
              <p className="text-2xl text-slate-400 font-light leading-relaxed">
                {selectedNews.summary}
              </p>
            </div>

            <div className="h-px bg-white/5 w-full my-12" />

            <section className="space-y-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">Llama 3.1:8b Bias Check</h3>
                </div>
              </div>
              <BiasAnalysis news={selectedNews} />
            </section>

            <div className="h-px bg-white/5 w-full my-12" />

            <section>
              <CommunityNotes newsId={selectedNews.id} />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
