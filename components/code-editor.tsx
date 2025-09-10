"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CodeEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function CodeEditor({ language, value, onChange, className }: CodeEditorProps) {
  const [lineNumbers, setLineNumbers] = useState<number[]>([])

  useEffect(() => {
    const lines = value.split("\n").length
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1))
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd
      const newValue = value.substring(0, start) + "    " + value.substring(end)
      onChange(newValue)

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4
      }, 0)
    }
  }

  return (
    <div className={cn("flex h-full border rounded-lg overflow-hidden bg-card", className)}>
      {/* Line Numbers */}
      <div className="bg-muted/50 px-3 py-4 text-sm text-muted-foreground font-mono select-none border-r">
        {lineNumbers.map((num) => (
          <div key={num} className="leading-6 text-right">
            {num}
          </div>
        ))}
      </div>

      {/* Code Area */}
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-6 text-foreground"
          placeholder={`Write your ${language} code here...`}
          spellCheck={false}
        />
      </div>
    </div>
  )
}
