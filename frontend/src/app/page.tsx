'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { NewsFeed } from '@/components/NewsFeed'
import { BiasAnalysis } from '@/components/BiasAnalysis'
import { CommunityNotes } from '@/components/CommunityNotes'
import { ArrowLeft, Sparkles, ShieldCheck, Activity, Globe, Info } from 'lucide-react'

export default function Home() {
  const [selectedNews, setSelectedNews] = useState<any>(null)
  const [tickerNews, setTickerNews] = useState<any[]>([])

  useEffect(() => {
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
    <div className="min-h-full">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 space-y-6">
        <AnimatePresence mode="wait">
          {!selectedNews ? (
            <motion.div
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Editorial Header Banner */}
              <section className="news-panel p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 border-b border-[color:var(--rule)] pb-4">
                  <div className="space-y-3">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 border border-[color:var(--rule)] text-[10px] uppercase tracking-[0.2em]"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      <Activity className="w-3.5 h-3.5" />
                      Broadcast Protocol Active
                    </div>
                    <h1
                      className="text-4xl md:text-6xl leading-none tracking-tight"
                      style={{ fontFamily: 'var(--font-head)' }}
                    >
                      Truth Through <br />
                      Decentralized Intelligence
                    </h1>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-2 lg:text-right">
                    <p
                      className="text-xs max-w-[320px] opacity-75 uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      Analyze bias and context in real-time headlines with AI and community verification.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <div
                        className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-70"
                        style={{ fontFamily: 'var(--font-ui)' }}
                      >
                        <ShieldCheck className="w-4 h-4" />
                        On-Chain Verification
                      </div>
                      <div
                        className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-70"
                        style={{ fontFamily: 'var(--font-ui)' }}
                      >
                        <Globe className="w-4 h-4" />
                        Global Coverage
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Main Editorial Grid */}
              <div className="grid grid-cols-12 gap-6">
                <NewsFeed onSelectNews={setSelectedNews} />

                <aside className="hidden lg:block lg:col-span-12 xl:col-span-5 space-y-6">
                  <div className="news-panel p-5 relative">
                    <div className="absolute top-3 right-3 opacity-60">
                      <Info className="w-4 h-4" />
                    </div>

                    <h3
                      className="text-sm uppercase tracking-[0.12em] border-b border-[color:var(--rule)] pb-2 mb-4"
                      style={{ fontFamily: 'var(--font-head)' }}
                    >
                      Protocol Information
                    </h3>

                    <div className="space-y-4">
                      <p className="text-sm opacity-80 leading-relaxed">
                        NewsChecker operates as a live editorial desk. Interactions are hashed and published for transparent,
                        immutable review.
                      </p>

                      <ul className="space-y-3">
                        {[
                          { label: 'AI Model', val: 'Llama 3.1:70b', icon: Sparkles },
                          { label: 'Latency', val: '24ms', icon: Activity },
                          { label: 'Truth Hash', val: '0x266B...790', icon: ShieldCheck },
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 p-3 border border-[color:var(--rule)]">
                            <item.icon className="w-4 h-4 opacity-75" />
                            <span
                              className="text-[10px] uppercase tracking-[0.14em] opacity-70"
                              style={{ fontFamily: 'var(--font-ui)' }}
                            >
                              {item.label}
                            </span>
                            <span className="ml-auto text-xs font-semibold">{item.val}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 max-w-[1200px] mx-auto"
            >
              {/* Detail Header */}
              <div className="flex items-center justify-between border-b border-[color:var(--rule)] pb-3">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="flex items-center gap-2 border border-[color:var(--rule)] px-3 py-2 hover:bg-[color:var(--soft-tint)] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-ui)' }}>
                    Back to Desk
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-black/60" />
                  <span className="text-xs uppercase tracking-widest opacity-70" style={{ fontFamily: 'var(--font-ui)' }}>
                    Analysis In Progress
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-8 space-y-6">
                  <div className="news-panel p-3">
                    <div className="aspect-video overflow-hidden border border-[color:var(--rule)]">
                      <img
                        src={selectedNews.image}
                        alt={selectedNews.title}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>

                    <div className="mt-3 border-t border-[color:var(--rule)] pt-3">
                      <div
                        className="flex items-center gap-3 mb-3 text-[10px] uppercase tracking-widest opacity-75"
                        style={{ fontFamily: 'var(--font-ui)' }}
                      >
                        <span className="px-2 py-1 border border-[color:var(--rule)]">{selectedNews.category}</span>
                        <span>
                          {selectedNews.source} • {new Date(selectedNews.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl leading-tight" style={{ fontFamily: 'var(--font-head)' }}>
                        {selectedNews.title}
                      </h2>
                    </div>
                  </div>

                  <div className="news-panel p-5">
                    <p className="text-xl leading-relaxed first-letter:text-4xl first-letter:font-semibold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                      {selectedNews.summary}
                    </p>
                  </div>

                  <section className="pt-1">
                    <div className="flex items-center gap-3 mb-4 border-b border-[color:var(--rule)] pb-3">
                      <Sparkles className="w-5 h-5 opacity-75" />
                      <div className="flex flex-col">
                        <h3 className="text-2xl uppercase tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>
                          Llama Review
                        </h3>
                        <span
                          className="text-[10px] uppercase tracking-[0.2em] opacity-60"
                          style={{ fontFamily: 'var(--font-ui)' }}
                        >
                          Deep Context Extraction
                        </span>
                      </div>
                    </div>
                    <BiasAnalysis news={selectedNews} />
                  </section>
                </div>

                <div className="col-span-12 lg:col-span-4 mt-2 lg:mt-0">
                  <CommunityNotes newsId={selectedNews.id} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Newspaper ticker block */}
        <section className="news-panel overflow-hidden">
          <div className="flex items-center border-b border-[color:var(--rule)]">
            <div
              className="px-4 py-2 border-r border-[color:var(--rule)] text-xs uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Live Headlines
            </div>
            <div className="px-3 py-2 text-[11px] uppercase tracking-widest opacity-60" style={{ fontFamily: 'var(--font-ui)' }}>
              Wire Feed
            </div>
          </div>

          <div className="animate-ticker py-2">
            {tickerNews.map((news, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 border-r border-[color:var(--rule)] text-xs whitespace-nowrap"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                <span className="opacity-60">■</span> {news.title}
              </div>
            ))}
            {tickerNews.map((news, i) => (
              <div
                key={`dup-${i}`}
                className="flex items-center gap-3 px-6 border-r border-[color:var(--rule)] text-xs whitespace-nowrap"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                <span className="opacity-60">■</span> {news.title}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
