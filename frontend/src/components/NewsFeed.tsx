'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, LayoutDashboard, Radio } from 'lucide-react'

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
        <div className="news-panel p-6 flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin opacity-70" />
          <span
            className="text-[11px] uppercase tracking-widest opacity-70"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Typesetting wire feed...
          </span>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="news-panel p-4 h-28">
            <div className="h-full flex flex-col justify-between">
              <div className="w-40 border-t border-[color:var(--rule)]" />
              <div className="w-full border-t border-[color:var(--rule)]" />
              <div className="w-3/4 border-t border-[color:var(--rule)]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="col-span-12 lg:col-span-12 xl:col-span-7">
        <div className="news-panel p-6">
          <p
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Feed Sync Error: {error}
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className="col-span-12 lg:col-span-12 xl:col-span-7 space-y-4 max-h-[800px] overflow-y-auto custom-scrollbar pr-2">
      {newsList.map((news, index) => (
        <motion.article
          key={news.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.04 }}
          className={`news-panel p-4 flex gap-4 relative ${
            selectedId === news.id ? 'border-[color:var(--rule-strong)] bg-[color:var(--soft-tint)]' : ''
          }`}
        >
          {/* Segment meta */}
          <div className="absolute top-2 right-2 px-2 py-1 border border-[color:var(--rule)] flex items-center gap-1.5">
            <Radio className="w-3 h-3 opacity-70" />
            <span
              className="text-[9px] uppercase tracking-widest opacity-65"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Live Segment
            </span>
          </div>

          {/* Thumbnail */}
          <div className="w-28 h-28 overflow-hidden flex-shrink-0 border border-[color:var(--rule)]">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover grayscale" />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
            <div className="space-y-1.5 pr-20">
              <div
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-70"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                <span>{news.category}</span>
                <span>•</span>
                <span>{news.source}</span>
              </div>

              <h3
                className="text-xl leading-tight line-clamp-2"
                style={{ fontFamily: 'var(--font-head)' }}
              >
                {news.title}
              </h3>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[color:var(--rule)]">
              <span
                className="text-[10px] uppercase tracking-widest opacity-60"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Extracted: {new Date(news.date).toLocaleDateString()}
              </span>

              <button
                onClick={() => {
                  setSelectedId(news.id)
                  onSelectNews(news)
                }}
                className="glass-button"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Analyze Context
              </button>
            </div>
          </div>
        </motion.article>
      ))}
    </section>
  )
}
