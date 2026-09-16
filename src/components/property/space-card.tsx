"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"

interface SpaceCardProps {
  propertyId: string
  space: {
    id: string
    name: string
    type: string
    capacity: number
    price: number
    image: string
    amenities: string[]
  }
}

export function SpaceCard({ space, propertyId }: SpaceCardProps) {
  const router = useRouter()
  const [duration, setDuration] = useState("2")

  const handleBook = () => {
    router.push(`/checkout?property=${propertyId}&space=${space.id}&duration=${duration}`)
  }

  return (
    <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-full md:w-1/3 aspect-video md:aspect-auto">
        <img src={space.image} alt={space.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{space.name}</h3>
              <p className="text-sm text-gray-500">{space.type}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-indigo-900">{formatPrice(space.price)}</span>
              <span className="text-sm text-gray-500">/hr</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" /> Up to {space.capacity} guests
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {space.amenities.map(am => (
              <span key={am} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                {am}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <div className="flex-1 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <select 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
              className="flex-1 h-10 rounded-lg border-gray-300 text-sm focus:ring-indigo-500"
            >
              <option value="1">1 Hour ({formatPrice(space.price * 1)})</option>
              <option value="2">2 Hours ({formatPrice(space.price * 2)})</option>
              <option value="3">3 Hours ({formatPrice(space.price * 3)})</option>
              <option value="4">4 Hours ({formatPrice(space.price * 4)})</option>
            </select>
          </div>
          <Button onClick={handleBook} className="w-full sm:w-auto px-8">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}
