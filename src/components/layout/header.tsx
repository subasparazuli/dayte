"use client"

import Link from "next/link"
import { Menu, Search, User, Compass } from "lucide-react"
import { Button } from "../ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled ? "glass-card border-b-0 rounded-none shadow-sm" : "bg-transparent border-b border-gray-200/20"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-600 dark:from-indigo-400 dark:to-indigo-200">
            Dayte
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/search" className="text-sm font-medium text-gray-700 hover:text-indigo-900 transition-colors flex items-center gap-1">
            <Search className="w-4 h-4" /> Explore
          </Link>
          <Link href="/host" className="text-sm font-medium text-gray-700 hover:text-indigo-900 transition-colors">
            Become a Host
          </Link>
          <div className="h-4 w-px bg-gray-300" />
          <Link href="/login">
            <Button variant="ghost" className="text-sm font-medium">Log in</Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">Sign up</Button>
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden p-2 text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}
