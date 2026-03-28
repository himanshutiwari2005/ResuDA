'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, MessageSquare, AlertCircle } from 'lucide-react'

const MOCK_NEWS = [
  {
    id: 1,
    title: "Global Tech Summit 2026: The Rise of Sovereign AI",
    summary: "Leading nations gather to discuss the importance of decentralized AI infrastructure to preserve national digital sovereignty.",
    url: "https://example.com/tech-summit",
    source: "TechDaily",
    timestamp: "2 hours ago",
    category: "Technology"
  },
  {
    id: 2,
    title: "Monad Blockchain Reaches Record High Throughput in Testnet",
    summary: "The Monad testnet has surpassed initial expectations, demonstrating parallel execution capabilities that outshine traditional EVMs.",
    url: "https://example.com/monad-news",
    source: "CryptoWeek",
    timestamp: "4 hours ago",
    category: "Web3"
  },
  {
    id: 3,
    title: "New Climate Policy Sparks Controversy in European Parliament",
    summary: "A proposed bill aiming for zero emissions by 2040 faces stiff opposition from manufacturing hubs over economic concerns.",
    url: "https://example.com/climate-policy",
    source: "GlobalGazette",
    timestamp: "6 hours ago",
    category: "Politics"
  }
]

export function NewsFeed({ onSelectNews }: { onSelectNews: (news: any) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_NEWS.map((news, index) => (
        <motion.div
          key={news.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onSelectNews(news)}
          className="cursor-pointer group bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all shadow-2xl hover:shadow-purple-500/10"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800/50 text-slate-400 border border-slate-700">
                {news.category}
              </span>
              <div className="flex gap-2 text-slate-500">
                <ExternalLink className="w-4 h-4 group-hover:text-white transition-colors" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors leading-tight">
              {news.title}
            </h3>
            
            <p className="text-slate-400 text-sm line-clamp-3 mb-6">
              {news.summary}
            </p>
            
            <div className="flex justify-between items-center text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">{news.source}</span>
                <span>•</span>
                <span>{news.timestamp}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 group/notes">
                  <MessageSquare className="w-4 h-4 group-hover/notes:text-blue-400 transition-colors" />
                  <span>12</span>
                </div>
                <div className="flex items-center gap-1 group/bias">
                  <AlertCircle className="w-4 h-4 group-hover/bias:text-red-400 transition-colors" />
                  <span className="text-red-400/80">Check Bias</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
