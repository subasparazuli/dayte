"use client"

import { useState } from "react"
import { Tabs } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react"

const MOCK_BOOKINGS = [
  { id: "BKG-84729", status: "upcoming", property: "Oasis Boutique Hotel", space: "Deluxe King Room", date: "Oct 15, 2023", time: "14:00 - 16:00", image: "https://picsum.photos/seed/1/200/200" },
  { id: "BKG-11234", status: "past", property: "Lalitpur Heights Apartment", space: "Private Studio", date: "Sep 28, 2023", time: "18:00 - 22:00", image: "https://picsum.photos/seed/5/200/200" },
  { id: "BKG-09876", status: "cancelled", property: "Baneshwor Guest House", space: "Standard Room", date: "Aug 12, 2023", time: "10:00 - 13:00", image: "https://picsum.photos/seed/6/200/200" }
]

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const filteredBookings = MOCK_BOOKINGS.filter(b => b.status === activeTab)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Bookings</h1>
        
        <Tabs 
          className="mb-8"
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: "upcoming", label: "Upcoming" },
            { id: "past", label: "Past" },
            { id: "cancelled", label: "Cancelled" }
          ]}
        />

        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No {activeTab} bookings</h3>
              <p className="text-gray-500 mt-1">When you book a stay, it will appear here.</p>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <div key={booking.id} className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow cursor-pointer group">
                <img src={booking.image} alt={booking.property} className="w-full md:w-48 h-32 object-cover rounded-lg" />
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-mono text-gray-500">{booking.id}</p>
                      <Badge variant={booking.status === 'upcoming' ? 'success' : booking.status === 'past' ? 'neutral' : 'error'}>
                        {booking.status.toUpperCase()}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{booking.property}</h3>
                    <p className="text-gray-600 text-sm mb-4">{booking.space}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400" /> {booking.date}</div>
                    <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" /> {booking.time}</div>
                  </div>
                </div>

                <div className="hidden md:flex items-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
