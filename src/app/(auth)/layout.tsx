import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-6">
          <span className="text-3xl font-bold text-white">Dayte</span>
          <span className="block text-sm text-indigo-200/80 mt-1 italic">Your date for the day, privacy ensured.</span>
        </Link>
        {children}
      </div>
    </div>
  )
}
