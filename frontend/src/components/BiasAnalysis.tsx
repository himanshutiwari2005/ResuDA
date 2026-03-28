'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Info, Loader2, MessageSquare } from 'lucide-react'
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
      setError(null)
      try {
        const response = await axios.post('/api/bias-check', {
          content: news.summary + ' ' + news.title,
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
      <div className="news-panel p-8 md:p-10 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin opacity-70" />
        <p
          className="text-xs uppercase tracking-widest opacity-70"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          AI Llama 3.1 analyzing context...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="news-panel p-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 mt-0.5 opacity-75 shrink-0" />
        <p className="text-sm leading-relaxed">{error}</p>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="news-panel p-6">
        <p className="text-sm opacity-75">No analysis available.</p>
      </div>
    )
  }

  const biasIsHigh = report.biasScore > 50

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 news-panel p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[color:var(--rule)] pb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 opacity-75" />
              <h3
                className="text-sm uppercase tracking-[0.12em]"
                style={{ fontFamily: 'var(--font-head)' }}
              >
                AI Analysis Summary
              </h3>
            </div>
            <span
              className="text-[10px] uppercase tracking-widest opacity-60"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Editorial Output
            </span>
          </div>

          <p className="text-lg leading-relaxed italic">"{report.summary}"</p>
        </div>

        <div className="news-panel p-6 flex flex-col justify-between">
          <div className="space-y-1">
            <span
              className="block text-[10px] uppercase tracking-[0.2em] opacity-60"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Bias Index
            </span>
            <div className="text-5xl leading-none" style={{ fontFamily: 'var(--font-head)' }}>
              {report.biasScore}%
            </div>
            <div
              className="text-[10px] uppercase tracking-widest opacity-70"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {biasIsHigh ? 'High Bias' : 'Neutral Status'}
            </div>
          </div>

          <div className="mt-4">
            <div className="h-[6px] border border-[color:var(--rule)]">
              <div
                className="h-full bg-black/20"
                style={{ width: `${Math.max(0, Math.min(100, report.biasScore))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="news-panel p-5">
          <div className="flex items-center gap-2 border-b border-[color:var(--rule)] pb-2 mb-4">
            <AlertTriangle className="w-4 h-4 opacity-75" />
            <h4
              className="text-sm uppercase tracking-[0.12em]"
              style={{ fontFamily: 'var(--font-head)' }}
            >
              Misinterpreted Lines
            </h4>
          </div>

          <div className="space-y-3">
            {report.misinterpretedLines.length ? (
              report.misinterpretedLines.map((line, i) => (
                <div key={i} className="p-3 border border-[color:var(--rule)] text-sm leading-relaxed hover:bg-[color:var(--soft-tint)] transition-colors">
                  {line}
                </div>
              ))
            ) : (
              <p className="text-sm opacity-70">No misinterpreted lines detected.</p>
            )}
          </div>
        </section>

        <section className="news-panel p-5">
          <div className="flex items-center gap-2 border-b border-[color:var(--rule)] pb-2 mb-4">
            <Info className="w-4 h-4 opacity-75" />
            <h4
              className="text-sm uppercase tracking-[0.12em]"
              style={{ fontFamily: 'var(--font-head)' }}
            >
              Missing Context
            </h4>
          </div>

          <div className="space-y-3">
            {report.missingContext.length ? (
              report.missingContext.map((ctx, i) => (
                <div key={i} className="p-3 border border-[color:var(--rule)] text-sm leading-relaxed hover:bg-[color:var(--soft-tint)] transition-colors">
                  {ctx}
                </div>
              ))
            ) : (
              <p className="text-sm opacity-70">No missing context detected.</p>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  )
}
