'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Info, ChevronRight, Loader2, Sparkles, Quote } from 'lucide-react'
import axios from 'axios'

interface BiasReport {
  biasScore: number
  misinterpretedLines: string[]
  missingContext: string[]
  summary: string
}

export function BiasAnalysis({ news }: { news: any }) {
  const [loading, setLoading] = useState(true)
  const [report, setReport] = useState<BiasReport | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalysis() {
      setLoading(true)
      try {
        const response = await axios.post('/api/bias-check', {
          content: news.summary + " " + news.title
        })
        setReport(response.data)
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to analyze bias')
      } finally {
        setLoading(false)
      }
    }

    if (news) fetchAnalysis()
  }, [news])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-3xl border border-white/5 backdrop-blur-3xl shadow-2xl">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <Sparkles className="w-4 h-4 text-purple-400 absolute -top-2 -right-2 animate-bounce" />
        </div>
        <p className="mt-4 text-slate-400 font-medium tracking-wide">AI Llama 3.1 analyzing context...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 bg-red-950/20 border border-red-500/30 rounded-3xl backdrop-blur-xl flex items-center gap-4 text-red-400">
        <AlertTriangle className="w-8 h-8 shrink-0" />
        <p>{error}</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900/60 p-8 rounded-3xl border border-white/10 shadow-3xl hover:border-blue-500/20 transition-all">
          <div className="flex items-center gap-2 mb-6 text-blue-400 font-semibold tracking-wider">
            <Quote className="w-5 h-5 fill-current" />
            <span>AI ANALYSIS SUMMARY</span>
          </div>
          <p className="text-xl text-slate-200 leading-relaxed font-light italic">
            "{report?.summary}"
          </p>
        </div>

        <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="relative z-20 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 block mb-2">Bias Index</span>
            <div className="text-6xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {report?.biasScore}%
            </div>
            <div className={`text-xs mt-2 font-bold uppercase tracking-wider ${report!.biasScore > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
              {report!.biasScore > 50 ? 'High Bias' : 'Low Bias'}
            </div>
          </div>
          <div 
            className={`absolute bottom-0 left-0 transition-all duration-1000 ease-out w-full opacity-20 group-hover:opacity-40 ${report!.biasScore > 50 ? 'bg-red-500' : 'bg-emerald-500'}`} 
            style={{ height: `${report?.biasScore}%` }} 
          />
          <div 
            className={`absolute bottom-0 left-0 h-1 w-full transition-all duration-1000 ${report!.biasScore > 50 ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]'}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-400 font-bold mb-4">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="tracking-tight uppercase">Misinterpreted Lines</h4>
          </div>
          {report?.misinterpretedLines.map((line, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className="p-5 bg-red-500/5 border-l-4 border-red-500/40 rounded-r-xl text-slate-300 text-sm leading-relaxed"
            >
              {line}
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-400 font-bold mb-4">
            <Info className="w-5 h-5" />
            <h4 className="tracking-tight uppercase">Missing Context</h4>
          </div>
          {report?.missingContext.map((ctx, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className="p-5 bg-blue-500/5 border-l-4 border-blue-500/40 rounded-r-xl text-slate-300 text-sm leading-relaxed"
            >
              {ctx}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
