"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { ShieldCheck, Calendar, Clock, Info } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [method, setMethod] = useState<'khalti'|'esewa'|'fonepay'>('khalti')

  const basePrice = 1600 // Mock data
  const serviceFee = 160
  const total = basePrice + serviceFee

  const handlePayment = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to success page with a mock ID
      router.push('/booking/BKG-84729')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Complete your booking</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Guest Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
                <Input label="Phone Number" placeholder="98XXXXXXXX" className="md:col-span-2" />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
                  <textarea 
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-900 focus:outline-none min-h-[100px]"
                    placeholder="E.g., require early check-in, quiet room..."
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${method === 'khalti' ? 'border-purple-600 bg-purple-50' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" checked={method === 'khalti'} onChange={() => setMethod('khalti')} className="w-5 h-5 text-purple-600 focus:ring-purple-600" />
                  <span className="ml-3 font-semibold text-purple-800 text-lg tracking-wide">KHALTI</span>
                </label>
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${method === 'esewa' ? 'border-green-600 bg-green-50' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" checked={method === 'esewa'} onChange={() => setMethod('esewa')} className="w-5 h-5 text-green-600 focus:ring-green-600" />
                  <span className="ml-3 font-semibold text-green-700 text-lg tracking-wide">eSewa</span>
                </label>
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${method === 'fonepay' ? 'border-red-600 bg-red-50' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" checked={method === 'fonepay'} onChange={() => setMethod('fonepay')} className="w-5 h-5 text-red-600 focus:ring-red-600" />
                  <span className="ml-3 font-semibold text-red-700 text-lg tracking-wide">fonepay</span>
                </label>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl mb-6">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold block mb-1">Cancellation Policy</span>
                  Free cancellation up to 2 hours before check-in. After that, a 50% fee applies.
                </div>
              </div>
              
              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" required />
                <span className="text-sm text-gray-600">
                  I agree to the House Rules, Cancellation Policy, and the Guest Terms of Service.
                </span>
              </label>

              <Button onClick={handlePayment} isLoading={isLoading} className="w-full h-14 text-lg">
                Pay {formatPrice(total)} & Confirm
              </Button>
            </section>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex gap-4">
                  <img src="https://picsum.photos/seed/1/100/100" className="w-20 h-20 rounded-lg object-cover" alt="Room" />
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-2">Deluxe King Room</h3>
                    <p className="text-sm text-gray-500">Oasis Boutique Hotel</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-indigo-700 font-medium bg-indigo-50 w-fit px-1.5 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3" /> Private Check-in
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-b space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" /> <span>Oct 15, 2023</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" /> <span>14:00 - 16:00 (2 Hours)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-semibold text-lg mb-4">Price details</h3>
                <div className="flex justify-between text-gray-600">
                  <span>{formatPrice(800)} x 2 hours</span>
                  <span>{formatPrice(basePrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600 pb-4 border-b">
                  <span>Service fee</span>
                  <span>{formatPrice(serviceFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total (NPR)</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
