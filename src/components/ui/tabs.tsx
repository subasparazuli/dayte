"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TabsProps {
  tabs: { id: string; label: string; content?: React.ReactNode }[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={className}>
      <div className="flex space-x-1 border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all relative",
                isActive ? "text-indigo-900" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-900 rounded-t-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
