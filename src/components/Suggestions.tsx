import React from 'react'
import { SuggestionChip } from '../data/types'

interface SuggestionsProps {
  onSelect: (question: string) => void
}

const chips: SuggestionChip[] = [
  { label: "🔷 What is Determinex?",        q: "What is Determinex?" },
  { label: "👟 Smart Shoe patent",           q: "Tell me about the smart shoe" },
  { label: "💻 Your skills",                 q: "What are your skills?" },
  { label: "🧠 Research interests",          q: "What are your research interests?" },
  { label: "🎯 Your goals",                  q: "What are your goals?" },
  { label: "🏆 Achievements",                q: "What are your achievements?" },
  { label: "🚀 All projects",                q: "Tell me about your projects" },
  { label: "🏢 Startup vision",              q: "Tell me about your startups" },
]

function Suggestions({ onSelect }: SuggestionsProps) {
  return (
    <div className="suggestions">
      {chips.map((chip: SuggestionChip, index: number) => (
        <button
          key={index}
          className="suggestion-chip"
          onClick={() => onSelect(chip.q)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}

export default Suggestions