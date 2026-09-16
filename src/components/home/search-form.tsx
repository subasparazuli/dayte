"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Calendar, Clock, Hourglass, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SearchForm() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("2")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set("q", location)
    if (date) params.set("date", date)
    if (time) params.set("time", time)
    if (duration) params.set("duration", duration)
    
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="glass-card p-2 md:p-4 rounded-2xl w-full mx-auto shadow-2xl">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        {/* Location */}
        <div className="flex-1 w-full relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <MapPin className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="Where do you need a stay?" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full h-14 pl-10 pr-4 rounded-xl border-none bg-gray-50/80 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 font-medium placeholder:text-gray-500"
          />
        </div>

        {/* Date */}
        <div className="flex-1 w-full relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Calendar className="w-5 h-5" />
          </div>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-14 pl-10 pr-4 rounded-xl border-none bg-gray-50/80 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 font-medium"
          />
        </div>

        {/* Time & Duration Row on Mobile */}
        <div className="flex flex-row w-full md:flex-1 gap-2 md:gap-4">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Clock className="w-5 h-5" />
            </div>
            <input 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-14 pl-10 pr-2 rounded-xl border-none bg-gray-50/80 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 font-medium"
            />
          </div>

          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Hourglass className="w-5 h-5" />
            </div>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full h-14 pl-10 pr-4 rounded-xl border-none bg-gray-50/80 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 font-medium appearance-none"
            >
              <option value="1">1 Hour</option>
              <option value="2">2 Hours</option>
              <option value="3">3 Hours</option>
              <option value="4">4 Hours</option>
              <option value="6">6 Hours</option>
              <option value="8">8 Hours</option>
              <option value="12">12 Hours</option>
            </select>
          </div>
        </div>

        <Button type="submit" variant="secondary" className="w-full md:w-auto h-14 px-8 text-lg rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
          <Search className="w-5 h-5" /> Search
        </Button>
      </form>
    </div>
  )
}
