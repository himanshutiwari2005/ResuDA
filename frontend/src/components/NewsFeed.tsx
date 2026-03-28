'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export function NewsFeed({ onSelectNews }: { onSelectNews: (news: any) => void }) {
  const [selectedNews, setSelectedNews] = useState<any>(null)
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
          setSelectedNews(data[0])
          onSelectNews(data[0])
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [onSelectNews])

  const handleSelect = (news: any) => {
    setSelectedNews(news)
    onSelectNews(news)
  }

  if (loading) {
    return (
      <section className="col-span-12 lg:col-span-5 space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-64 animate-pulse flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 h-24 animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="col-span-12 lg:col-span-5 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
        <p className="text-red-400">Error loading news: {error}. Please check your NEWSDATA_API_KEY in Vercel/Local env.</p>
      </section>
    )
  }

  return (
    <section className="col-span-12 lg:col-span-5 space-y-6">
      {/* Featured News Card */}
      {selectedNews && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-2xl"
        >
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={selectedNews.image} 
              alt={selectedNews.title}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-lg">
                {selectedNews.category}
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20">
                Live Analysis
              </span>
            </div>
          </div>
          
          <div className="p-6 space-y-3">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 leading-tight">
              {selectedNews.title}
            </h2>
            <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
              {selectedNews.summary}
            </p>
          </div>
        </motion.div>
      )}

      {/* News List */}
      <div className="space-y-4 h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {newsList.map((news) => (
          <motion.div
            key={news.id}
            whileHover={{ x: 8 }}
            onClick={() => handleSelect(news)}
            className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex gap-4 ${
              selectedNews?.id === news.id 
                ? 'bg-white/10 border-white/30 shadow-lg' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1 py-1 flex-1">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">{news.category}</span>
                <span className="text-[10px] text-white/40">{new Date(news.date).toLocaleDateString()}</span>
              </div>
              <h3 className="text-sm font-semibold text-white/90 line-clamp-2 leading-snug">{news.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
