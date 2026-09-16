"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewPropertyPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-2">Add a new property</h1>
      <p className="text-gray-500 mb-8">Step {step} of 4: Basic Information</p>

      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <Input label="Property Name" placeholder="e.g. Oasis Boutique Hotel" />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Property Type</label>
            <select className="w-full h-10 rounded-lg border-gray-300">
              <option>Hotel</option>
              <option>Guest House</option>
              <option>Private Apartment</option>
              <option>Villa</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea className="w-full rounded-lg border-gray-300 p-3 min-h-[100px]" placeholder="Describe your property..." />
          </div>
          <Button onClick={() => setStep(2)} className="w-full mt-6">Next Step</Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-fade-in">
          <Input label="Street Address" placeholder="Thamel Marg" />
          <Input label="City" placeholder="Kathmandu" />
          <Input label="Map Coordinates (Lat, Lng)" placeholder="27.7172, 85.3240" />
          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={() => setStep(1)} className="w-full">Back</Button>
            <Button onClick={() => setStep(3)} className="w-full">Next Step</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 animate-fade-in">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
            <p className="text-sm text-gray-500 mb-2">Drag and drop photos here, or click to browse</p>
            <Button variant="outline" size="sm">Upload Photos</Button>
          </div>
          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={() => setStep(2)} className="w-full">Back</Button>
            <Button onClick={() => setStep(4)} className="w-full">Next Step</Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-sm font-medium text-gray-700 mb-2">Select Amenities</p>
          <div className="grid grid-cols-2 gap-3">
            {["Wifi", "Parking", "AC", "Restaurant", "24/7 Front Desk"].map(am => (
              <label key={am} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                <span className="text-sm">{am}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={() => setStep(3)} className="w-full">Back</Button>
            <Button variant="primary" className="w-full">Submit Property</Button>
          </div>
        </div>
      )}
    </div>
  )
}
