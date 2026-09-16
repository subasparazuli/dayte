import Link from "next/link"
import { Star, MapPin, Wifi, AirVent, Tv } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface PropertyCardProps {
  property: {
    id: string
    name: string
    type: string
    location: string
    rating: number
    reviews: number
    pricePerHour: number
    distance: number
    image: string
    amenities: string[]
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`}>
      <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img 
            src={property.image} 
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-900">
            {property.type}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {property.name}
            </h3>
            <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded text-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-gray-900">{property.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{property.location}</span>
            <span className="mx-1">•</span>
            <span>{property.distance} km</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-400 mb-4">
            {property.amenities.includes("Wifi") && <Wifi className="w-4 h-4" />}
            {property.amenities.includes("AC") && <AirVent className="w-4 h-4" />}
            {property.amenities.includes("TV") && <Tv className="w-4 h-4" />}
          </div>
          
          <div className="pt-3 border-t border-gray-100 flex items-end justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(property.pricePerHour)}
              </span>
              <span className="text-sm text-gray-500"> / hour</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
