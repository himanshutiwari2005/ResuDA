'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, ThumbsDown, Send, User, Loader2, MessageSquare } from 'lucide-react'
import { parseEther } from 'viem'

const CONTRACT_ADDRESS = '0x266BF8b803351FDFB01De8A6c33E18cFB07D9790'

const ABI = [
  { inputs: [{ internalType: 'uint256', name: '_newsId', type: 'uint256' }], name: 'getNotesForNews', outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ internalType: 'uint256', name: '_noteId', type: 'uint256' }], name: 'notes', outputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }, { internalType: 'uint256', name: 'newsId', type: 'uint256' }, { internalType: 'string', name: 'content', type: 'string' }, { internalType: 'address', name: 'author', type: 'address' }, { internalType: 'uint256', name: 'timestamp', type: 'uint256' }, { internalType: 'uint256', name: 'likes', type: 'uint256' }, { internalType: 'uint256', name: 'dislikes', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ internalType: 'uint256', name: '_newsId', type: 'uint256' }, { internalType: 'string', name: '_content', type: 'string' }], name: 'addNote', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ internalType: 'uint256', name: '_noteId', type: 'uint256' }, { internalType: 'bool', name: '_isLike', type: 'bool' }], name: 'voteNote', outputs: [], stateMutability: 'payable', type: 'function' }
] as const

const MOCK_NOTES_DATABASE: Record<number, any[]> = {
  1: [
    { id: 101, content: "Sovereign AI isn't just about nodes; it's about localized data residency laws that aren't mentioned here.", author: '0x345...678', reputation: 120, likes: 45, dislikes: 2 },
    { id: 102, content: 'The article implies this is only a government initiative, but decentralized communities are already building these clouds.', author: '0xabc...def', reputation: 85, likes: 21, dislikes: 1 }
  ]
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
    <div className="news-panel p-5 space-y-5 h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-[color:var(--rule)] pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 opacity-75" />
          <h3
            className="text-sm uppercase tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-head)' }}
          >
            Community Notes Desk
          </h3>
        </div>
        <div className="text-right">
          <div
            className="text-[10px] uppercase tracking-widest opacity-60"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Total Notes
          </div>
          <div className="text-lg leading-none" style={{ fontFamily: 'var(--font-head)' }}>
            {currentNotes.length}
          </div>
        </div>
      </div>

      {/* Input Section */}
      {isConnected ? (
        <div className="p-3 border border-[color:var(--rule)]">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a community correction note..."
            className="w-full bg-transparent border-none focus:ring-0 resize-none min-h-[110px] text-sm leading-relaxed placeholder-black/35"
          />
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-[color:var(--rule)]">
            <span
              className="text-[10px] uppercase tracking-widest opacity-65"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Protocol Ready
            </span>
            <button
              onClick={handleAddNote}
              disabled={isPending || !newNote}
              className="glass-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Dispatch
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 border border-[color:var(--rule)] text-center">
          <p
            className="text-[10px] uppercase tracking-widest opacity-65"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Connect wallet to submit a note
          </p>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-3 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
        <AnimatePresence>
          {currentNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 border border-[color:var(--rule)] hover:bg-[color:var(--soft-tint)] transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 border border-[color:var(--rule)] flex items-center justify-center">
                    <User className="w-4 h-4 opacity-70" />
                  </div>
                  <div>
                    <div
                      className="text-[10px] uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      Agent #{note.id}
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-widest opacity-60"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      Reputation +{note.reputation}
                    </div>
                  </div>
                </div>
                <span
                  className="text-[10px] uppercase tracking-widest opacity-50"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  Log #{index + 1}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-4 pl-3 border-l border-[color:var(--rule)]">
                {note.content}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleVote(note.id, true)}
                  disabled={isPending}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[color:var(--rule)] hover:bg-[color:var(--soft-tint)] transition-colors disabled:opacity-50"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="text-xs">{note.likes}</span>
                </button>

                <button
                  onClick={() => handleVote(note.id, false)}
                  disabled={isPending}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[color:var(--rule)] hover:bg-[color:var(--soft-tint)] transition-colors disabled:opacity-50"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span className="text-xs">{note.dislikes}</span>
                </button>

                <span
                  className="ml-auto text-[10px] uppercase tracking-widest opacity-60"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  Vote Fee: 0.0001 MON
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
