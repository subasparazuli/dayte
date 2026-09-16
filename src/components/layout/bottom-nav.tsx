"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Calendar, User, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()
  
  const navItems = [
    { href: "/", label: "Explore", icon: Search },
    { href: "/bookings", label: "Bookings", icon: Calendar },
    { href: "/host", label: "Host", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-indigo-900" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "fill-indigo-100")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
