import Link from "next/link"
import { Home, Calendar, DollarSign, Settings, PlusCircle, Building } from "lucide-react"

export default function HostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] p-4">
        <nav className="space-y-1">
          <Link href="/host" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700">
            <Home className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/host/properties" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
            <Building className="w-5 h-5 text-gray-400" /> Properties
          </Link>
          <Link href="/host/bookings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
            <Calendar className="w-5 h-5 text-gray-400" /> Bookings
          </Link>
          <Link href="/host/earnings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
            <DollarSign className="w-5 h-5 text-gray-400" /> Earnings
          </Link>
          <Link href="/host/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
            <Settings className="w-5 h-5 text-gray-400" /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
