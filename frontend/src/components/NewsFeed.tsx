'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Zap, LayoutDashboard, Radio } from 'lucide-react'

export function NewsFeed({ onSelectNews }: { onSelectNews: (news: any) => void }) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [newsList, setNewsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/news')
        if (!response.ok) throw new Error('Failed to fetch news')
        const data = await response.json()
        setNewsList(data)
        if (data.length > 0) {
          setSelectedId(data[0].id)
          // Don't auto-select the first one for analysis to avoid overload, 
          // but show it in the feed
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="col-span-12 lg:col-span-12 xl:col-span-7 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="news-panel p-4 rounded-xl h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="col-span-12 lg:col-span-12 xl:col-span-7 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
        <p className="text-red-400 font-bold uppercase tracking-widest text-xs">Feed Sync Error: {error}</p>
      </div>
    )
  }

  return (
    <section className="col-span-12 lg:col-span-12 xl:col-span-7 space-y-4 max-h-[800px] overflow-y-auto custom-scrollbar pr-4">
      {newsList.map((news, index) => (
        <motion.div
          key={news.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`group news-panel p-4 rounded-2xl flex gap-6 cursor-default relative overflow-hidden ${
            selectedId === news.id ? 'border-violet-500/40 bg-violet-600/5' : ''
          }`}
        >
          {/* Broadcaster Segment Header */}
          <div className="absolute top-0 right-0 p-3 flex gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                <Radio className="w-2.5 h-2.5 text-violet-400" />
                <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Live Segment</span>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 relative">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between py-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">
                  {news.category}
                </span>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">•</span>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none">
                  {news.source}
                </span>
              </div>
              <h3 className="text-lg font-black tracking-tight text-white leading-tight line-clamp-2 pr-20">
                {news.title}
              </h3>
            </div>

            {/* Noticeable but Professional Action */}
            <div className="flex items-center justify-between mt-4 pb-1">
               <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  Extracted: {new Date(news.date).toLocaleDateString()}
               </span>
               <button
                  onClick={() => {
                    setSelectedId(news.id)
                    onSelectNews(news)
                  }}
                  className="group/btn relative overflow-hidden px-6 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-violet-500/50 hover:bg-violet-600/10 transition-all duration-300"
               >
                  <div className="scan-line group-hover/btn:opacity-100 opacity-0 transition-opacity" />
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-white/60 group-hover/btn:text-white transition-colors">
                     <LayoutDashboard className="w-3.5 h-3.5" />
                     Analyze Context
                  </div>
               </button>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  )
}
