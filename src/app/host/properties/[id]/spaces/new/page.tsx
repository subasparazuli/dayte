"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewSpacePage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add a Space/Room</h1>
      
      <form className="space-y-4">
        <Input label="Space Name" placeholder="e.g. Deluxe King Room" />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Space Type</label>
            <select className="w-full h-10 rounded-lg border-gray-300">
              <option>Private Room</option>
              <option>Suite</option>
              <option>Entire Apartment</option>
            </select>
          </div>
          <Input label="Capacity" type="number" placeholder="2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Base Price (per hour)" type="number" placeholder="NPR 500" />
          <Input label="Cleaning Buffer (minutes)" type="number" placeholder="30" />
        </div>

        <div className="space-y-1 mt-4">
          <label className="block text-sm font-medium text-gray-700">Check-in Method</label>
          <select className="w-full h-10 rounded-lg border-gray-300">
            <option>Smart Lock Code</option>
            <option>Lockbox</option>
            <option>Meet Host</option>
            <option>Front Desk</option>
          </select>
        </div>

        <div className="pt-6">
          <Button type="button" className="w-full">Create Space</Button>
        </div>
      </form>
    </div>
  )
}
