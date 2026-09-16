import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold text-indigo-900">QuickStay</span>
            <p className="mt-4 text-sm text-gray-500">
              Premium hourly short-stay accommodation marketplace in Nepal.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/help" className="hover:text-indigo-900">Help Center</Link></li>
              <li><Link href="/safety" className="hover:text-indigo-900">Safety information</Link></li>
              <li><Link href="/cancellation" className="hover:text-indigo-900">Cancellation options</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Hosting</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/host" className="hover:text-indigo-900">QuickStay your home</Link></li>
              <li><Link href="/host/resources" className="hover:text-indigo-900">Hosting resources</Link></li>
              <li><Link href="/host/forum" className="hover:text-indigo-900">Community forum</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">QuickStay</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-indigo-900">About us</Link></li>
              <li><Link href="/careers" className="hover:text-indigo-900">Careers</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-900">Terms & Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} QuickStay Nepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
