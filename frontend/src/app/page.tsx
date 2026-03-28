'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { NewsFeed } from '@/components/NewsFeed'
import { BiasAnalysis } from '@/components/BiasAnalysis'
import { CommunityNotes } from '@/components/CommunityNotes'
import { ArrowLeft, Sparkles, Zap, ShieldCheck, Activity, Globe, Info } from 'lucide-react'

export default function Home() {
  const [selectedNews, setSelectedNews] = useState<any>(null)
  const [tickerNews, setTickerNews] = useState<any[]>([])

  useEffect(() => {
    // Fetch a few news items for the ticker
    const fetchTicker = async () => {
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        setTickerNews(data.slice(0, 5))
      } catch (err) {
        console.error('Ticker fetch failed')
      }
    }
    fetchTicker()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0c] selection:bg-violet-500/30">
      <div className="bg-glow-violet opacity-30" />
      <div className="bg-glow-berry opacity-20" />

      <Navbar />

      <main className="max-w-[1400px] mx-auto px-6 pt-12 pb-32">
        <AnimatePresence mode="wait">
          {!selectedNews ? (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Header Header Control Banner */}
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-white/5 pb-12">
                <div className="space-y-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black tracking-[0.2em] uppercase"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    Broadcast Protocol Active
                  </motion.div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none shimmer-text">
                    Truth Through <br />
                    <span className="text-violet-500">Decentralized Intelligence.</span>
                  </h1>
                </div>

                <div className="flex flex-col items-end gap-2 text-right">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest max-w-[300px]">
                    Analyze bias and mission context in real-time headlines with Llama 3.1 & Monad Blockchain.
                  </p>
                  <div className="flex gap-4 pt-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                      <ShieldCheck className="w-4 h-4 text-emerald-500/50" />
                      On-Chain Verification
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                      <Globe className="w-4 h-4 text-blue-500/50" />
                      Global Coverage
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Control Panel Grid */}
              <div className="grid grid-cols-12 gap-8">
                {/* News Feed Window */}
                <NewsFeed onSelectNews={setSelectedNews} />

                {/* Info Panel / Sidebar Window */}
                <div className="hidden lg:block lg:col-span-12 xl:col-span-5 space-y-8">
                  <div className="news-panel p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                      <Info className="w-5 h-5 text-white/20 group-hover:text-violet-400 transition-colors" />
                    </div>
                    <h3 className="text-lg font-black tracking-tight mb-4 uppercase text-white/90">Protocol Information</h3>
                    <div className="space-y-6">
                      <p className="text-sm text-white/40 leading-relaxed font-medium">
                        NewsChecker represents the next-gen Newsroom Control Center. Every interaction is cryptographically hashed and verified against the Monad Testnet for immutable truth.
                      </p>
                      <ul className="space-y-4">
                        {[
                          { label: 'AI Model', val: 'Llama 3.1:70b', icon: Zap, color: 'text-violet-400' },
                          { label: 'Latency', val: '24ms', icon: Activity, color: 'text-emerald-400' },
                          { label: 'Truth Hash', val: '0x266B...790', icon: ShieldCheck, color: 'text-blue-400' },
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                            <item.icon className={`w-4 h-4 ${item.color}`} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.label}</span>
                            <span className="ml-auto text-xs font-black text-white/80">{item.val}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-12 max-w-[1200px] mx-auto"
            >
              {/* Detail Header Control Bar */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-all group"
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-violet-500/40">
                    <ArrowLeft className="w-5 h-5" />
                  </div>
                  <span className="font-black text-xs uppercase tracking-widest">Back to Desk</span>
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-violet-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-violet-400">Analysis In Progress</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-12">
                <div className="col-span-12 lg:col-span-8 space-y-8">
                  <div className="news-panel p-2 rounded-3xl overflow-hidden">
                    <div className="aspect-video relative rounded-2xl overflow-hidden">
                      <img src={selectedNews.image} className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded bg-violet-500 text-[10px] font-black uppercase tracking-widest">{selectedNews.category}</span>
                          <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{selectedNews.source} • {new Date(selectedNews.date).toLocaleDateString()}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-tight">
                          {selectedNews.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="news-panel p-8 rounded-3xl">
                    <p className="text-2xl text-white/70 font-light leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-violet-500 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                      {selectedNews.summary}
                    </p>
                  </div>

                  <section className="pt-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-[0_0_20px_rgba(131,100,232,0.1)]">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-black tracking-tight text-white uppercase">Llama Review</h3>
                        <span className="text-[10px] text-white/20 font-bold tracking-[0.3em] uppercase">Deep Neural Context Extraction</span>
                      </div>
                    </div>
                    <BiasAnalysis news={selectedNews} />
                  </section>
                </div>

                <div className="col-span-12 lg:col-span-4 mt-12 lg:mt-0">
                  <CommunityNotes newsId={selectedNews.id} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* News Ticker Footer Bar */}
      <footer className="fixed bottom-0 left-0 w-full h-14 bg-black border-t border-white/10 z-[100] flex items-center overflow-hidden">
        <div className="px-6 h-full bg-violet-600 flex items-center justify-center gap-2 z-10 shadow-[20px_0_40px_rgba(0,0,0,0.8)]">
          <Activity className="w-5 h-5 text-white animate-pulse" />
          <span className="text-xs font-black uppercase tracking-tight text-white">Live Headlines</span>
        </div>
        <div className="animate-ticker group cursor-default">
          {tickerNews.map((news, i) => (
            <div key={i} className="flex items-center gap-4 px-8 border-r border-white/10 text-xs font-bold text-white/40 whitespace-nowrap group-hover:text-white transition-colors">
              <span className="text-violet-500">●</span> {news.title}
            </div>
          ))}
          {/* Repeat for seamless loop */}
          {tickerNews.map((news, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-4 px-8 border-r border-white/10 text-xs font-bold text-white/40 whitespace-nowrap group-hover:text-white transition-colors">
              <span className="text-violet-500">●</span> {news.title}
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}
