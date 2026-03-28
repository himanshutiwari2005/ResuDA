'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, ThumbsDown, Send, User, ShieldCheck, Loader2 } from 'lucide-react'

const CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890' // Placeholder

const ABI = [
  {"inputs":[{"internalType":"uint256","name":"_newsId","type":"uint256"}],"name":"getNotesForNews","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"_noteId","type":"uint256"}],"name":"notes","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"newsId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"address","name":"author","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likes","type":"uint256"},{"internalType":"uint256","name":"dislikes","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"_newsId","type":"uint256"},{"internalType":"string","name":"_content","type":"string"}],"name":"addNote","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"_noteId","type":"uint256"},{"internalType":"bool","name":"_isLike","type":"bool"}],"name":"voteNote","outputs":[],"stateMutability":"nonpayable","type":"function"}
] as const

const MOCK_NOTES_DATABASE: Record<number, any[]> = {
  1: [
    { id: 101, content: "Sovereign AI isn't just about nodes; it's about localized data residency laws that aren't mentioned here.", author: "0x345...678", reputation: 120, likes: 45, dislikes: 2 },
    { id: 102, content: "The article implies this is only a government initiative, but decentralized communities are already building these clouds.", author: "0xabc...def", reputation: 85, likes: 21, dislikes: 1 }
  ],
  2: [
    { id: 201, content: "Monad's parallel execution is compared to standard EVMs, but it doesn't mention the specifics of the superscalar architecture.", author: "0x789...012", reputation: 340, likes: 112, dislikes: 4 },
    { id: 202, content: "Testnet numbers are often higher than mainnet reality. Need to see the stress test under varied gas markets.", author: "0x555...777", reputation: 50, likes: 19, dislikes: 3 }
  ],
  3: [
    { id: 301, content: "The policy mentions zero emissions by 2040, but the current draft actually excludes certain heavy industries until 2045.", author: "0x222...444", reputation: 210, likes: 67, dislikes: 0 },
    { id: 302, content: "Manufacturing hubs aren't just 'opposed', they've proposed a counter-tax-credit system which this article omits.", author: "0x111...333", reputation: 95, likes: 32, dislikes: 5 }
  ]
}

export function CommunityNotes({ newsId }: { newsId: number }) {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const [newNote, setNewNote] = useState('')

  const handleAddNote = () => {
    if (!newNote) return
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'addNote',
      args: [BigInt(newsId), newNote],
    })
  }

  const handleVote = (noteId: number, isLike: boolean) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'voteNote',
      args: [BigInt(noteId), isLike],
    })
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold tracking-tight text-white/90">Community Corrections</h2>
      </div>

      {isConnected ? (
        <div className="bg-slate-900/40 p-6 rounded-3xl border border-white/10 shadow-inner group-focus-within:border-purple-500/50 transition-all">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a community correction note... (Stored on Monad)"
            className="w-full bg-transparent border-none focus:ring-0 text-slate-200 resize-none min-h-[120px] placeholder-slate-600 text-lg"
          />
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
            <span className="text-xs text-slate-500">Hash-verifiable on-chain note</span>
            <button
              onClick={handleAddNote}
              disabled={isPending || !newNote}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              Publish to Monad
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-900/20 border border-white/5 rounded-3xl text-slate-500 italic">
          Connect your wallet to add corrections and vote on notes.
        </div>
      )}

      <div className="space-y-6">
        {(MOCK_NOTES_DATABASE[newsId] || []).map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-slate-900/60 rounded-3xl border border-white/10 hover:border-white/20 transition-all shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center text-slate-400">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white/80">User #{note.author}</div>
                  <div className="text-xs text-purple-400 font-mono">Reputation: +{note.reputation}</div>
                </div>
              </div>
              <span className="text-xs text-slate-500">Posted {index + 1} day ago</span>
            </div>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-6 pl-2 border-l-2 border-purple-500/20">
              {note.content}
            </p>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => handleVote(note.id, true)}
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-emerald-400/0 group-hover:bg-emerald-400/10 transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <span className="font-bold">{note.likes}</span>
              </button>
              <button 
                onClick={() => handleVote(note.id, false)}
                className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-red-400/0 group-hover:bg-red-400/10 transition-colors">
                  <ThumbsDown className="w-5 h-5" />
                </div>
                <span className="font-bold">{note.dislikes}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
