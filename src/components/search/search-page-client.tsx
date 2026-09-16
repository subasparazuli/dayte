"use client"

import { useState } from "react"
import { PropertyCard } from "./property-card"
import { FilterPanel } from "./filter-panel"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, Map as MapIcon, List } from "lucide-react"

// Mock Data
const MOCK_PROPERTIES = Array(8).fill(null).map((_, i) => ({
  id: `prop-${i}`,
  name: `Premium Space ${i + 1}`,
  type: i % 2 === 0 ? "Hotel Room" : "Private Apartment",
  location: i % 2 === 0 ? "Thamel, Kathmandu" : "Sanepa, Lalitpur",
  rating: 4.5 + (i % 5) * 0.1,
  reviews: 12 + i * 5,
  pricePerHour: 500 + i * 150,
  distance: 1.2 + i * 0.5,
  image: `https://picsum.photos/seed/${i + 100}/600/400`,
  amenities: ["Wifi", "AC", "TV"]
}))

export function SearchPageClient({ searchParams }: { searchParams: any }) {
  const [view, setView] = useState<'list' | 'map'>('list')
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="flex-1 flex flex-col md:flex-row relative">
      {/* Filters Sidebar - Desktop */}
      <div className="hidden md:block w-72 border-r border-gray-200 p-6 bg-white overflow-y-auto">
        <FilterPanel />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Top Bar */}
        <div className="p-4 border-b border-gray-200 bg-white sticky top-16 z-30 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {searchParams.q ? `Stays in ${searchParams.q}` : "Available Stays"}
            </h1>
            <p className="text-sm text-gray-500">{MOCK_PROPERTIES.length} spaces found</p>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="md:hidden"
              onClick={() => setShowFilters(true)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
            </Button>

            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button
                className={`p-1.5 rounded-md text-sm font-medium transition-colors ${view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                onClick={() => setView('list')}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                className={`p-1.5 rounded-md text-sm font-medium transition-colors ${view === 'map' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                onClick={() => setView('map')}
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          {view === 'list' ? (
            <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {MOCK_PROPERTIES.map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center p-4">
              <div className="text-center">
                <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900">Map View Placeholder</h3>
                <p className="text-gray-500">Requires Google Maps API Key</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/50">
          <div className="ml-auto w-[85%] max-w-sm h-full bg-white shadow-xl flex flex-col animate-slide-up">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="text-gray-500">Close</button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <FilterPanel />
            </div>
            <div className="p-4 border-t bg-gray-50">
              <Button className="w-full" onClick={() => setShowFilters(false)}>Show Results</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
