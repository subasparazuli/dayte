import Link from "next/link"
import { LayoutDashboard, Users, Building, Activity } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-300 min-h-screen p-4 flex flex-col">
        <div className="text-white font-bold text-xl mb-8 pl-2">QuickStay Admin</div>
        <nav className="space-y-2 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 text-white">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/properties" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
            <Building className="w-5 h-5" /> Properties
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" /> Users
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
            <Activity className="w-5 h-5" /> Bookings
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
