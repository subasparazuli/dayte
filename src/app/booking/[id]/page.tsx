import Link from "next/link"
import { CheckCircle2, MapPin, Clock, Key, Navigation, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your reservation {id} is complete.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="p-6 border-b border-gray-100 bg-indigo-900 text-white flex justify-between items-center">
            <div>
              <p className="text-indigo-200 text-sm mb-1">Check-in Code</p>
              <p className="text-3xl font-mono tracking-widest font-bold">8492</p>
            </div>
            <Key className="w-10 h-10 text-indigo-300 opacity-50" />
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex gap-4">
              <img src="https://picsum.photos/seed/1/120/120" className="w-24 h-24 rounded-lg object-cover" alt="Room" />
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Deluxe King Room</h3>
                <p className="text-gray-500">Oasis Boutique Hotel</p>
                <div className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 2 Hours • Oct 15, 14:00 - 16:00
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-indigo-600" /> Address & Directions
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Thamel Marg, Kathmandu 44600<br/>
                Next to the Himalayan Bank building.
              </p>
              <Button variant="outline" className="w-full text-sm">
                <Navigation className="w-4 h-4 mr-2" /> Open in Maps
              </Button>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Check-in Instructions</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Go directly to room 304 on the 3rd floor.</li>
                <li>• Enter the 4-digit code on the smart lock.</li>
                <li>• Do not disturb reception for privacy.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <Link href="/bookings" className="flex-1">
            <Button variant="outline" className="w-full">View My Bookings</Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="primary" className="w-full">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
