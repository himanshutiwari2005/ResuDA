'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, ThumbsDown, Send, User, ShieldCheck, Loader2, Coins, Flame, MessageSquare } from 'lucide-react'
import { parseEther } from 'viem'

const CONTRACT_ADDRESS = '0x266BF8b803351FDFB01De8A6c33E18cFB07D9790'

const ABI = [
  {"inputs":[{"internalType":"uint256","name":"_newsId","type":"uint256"}],"name":"getNotesForNews","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"_noteId","type":"uint256"}],"name":"notes","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"newsId","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"address","name":"author","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"likes","type":"uint256"},{"internalType":"uint256","name":"dislikes","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"_newsId","type":"uint256"},{"internalType":"string","name":"_content","type":"string"}],"name":"addNote","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"_noteId","type":"uint256"},{"internalType":"bool","name":"_isLike","type":"bool"}],"name":"voteNote","outputs":[],"stateMutability":"payable","type":"function"}
] as const

const MOCK_NOTES_DATABASE: Record<number, any[]> = {
  1: [
    { id: 101, content: "Sovereign AI isn't just about nodes; it's about localized data residency laws that aren't mentioned here.", author: "0x345...678", reputation: 120, likes: 45, dislikes: 2 },
    { id: 102, content: "The article implies this is only a government initiative, but decentralized communities are already building these clouds.", author: "0xabc...def", reputation: 85, likes: 21, dislikes: 1 }
  ],
}

export function CommunityNotes({ newsId }: { newsId: number }) {
  const { isConnected } = useAccount()
  const { writeContract, isPending } = useWriteContract()
  const [newNote, setNewNote] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

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
      value: parseEther('0.0001')
    })
  }

  const currentNotes = MOCK_NOTES_DATABASE[newsId] || []

  return (
    <div className="news-panel p-8 rounded-3xl space-y-8 h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-600/20 border border-violet-500/30">
            <MessageSquare className="w-6 h-6 text-violet-400" />
          </div>
          <h3 className="text-xl font-black tracking-tight text-white uppercase">Notes Desk</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-violet-400">Total Intel</span>
          <span className="text-lg font-black text-white">{currentNotes.length}</span>
        </div>
      </div>

      {/* Input Section */}
      {isConnected ? (
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 focus-within:border-violet-500/40 transition-all">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a community correction note... (SECURED ON MONAD)"
            className="w-full bg-transparent border-none focus:ring-0 text-white/80 resize-none min-h-[100px] placeholder-white/20 text-sm font-medium"
          />
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Protocol Ready</span>
            </div>
            <button
              onClick={handleAddNote}
              disabled={isPending || !newNote}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Dispatch
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center bg-white/5 border border-white/5 rounded-2xl">
           <p className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">Connect Terminal for Note Submission</p>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence>
          {currentNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white/90 uppercase tracking-widest leading-none">Agent #{note.id}</div>
                    <div className="text-[8px] text-violet-400 font-black uppercase tracking-widest mt-0.5">Reputation: +{note.reputation}</div>
                  </div>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Archive Log #{index + 1}</span>
              </div>
              
              <p className="text-white/60 text-xs leading-relaxed mb-4 pl-3 border-l border-violet-500/30">
                {note.content}
              </p>

              <div className="flex items-center gap-4">
                <div className="group/vote relative">
                   <button 
                    onClick={() => handleVote(note.id, true)}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 transition-all group/btn"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="text-xs font-black">{note.likes}</span>
                  </button>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-emerald-500/20 text-[8px] text-emerald-400 font-black uppercase rounded opacity-0 group-hover/vote:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                     +0.0001 MON
                  </div>
                </div>

                <div className="group/vote relative">
                  <button 
                    onClick={() => handleVote(note.id, false)}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/5 border border-red-500/10 text-red-400 hover:bg-red-500/10 transition-all group/btn"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span className="text-xs font-black">{note.dislikes}</span>
                  </button>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-red-500/20 text-[8px] text-red-400 font-black uppercase rounded opacity-0 group-hover/vote:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                     Burn Fee
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
