import Link from "next/link"

const LOCATIONS = [
  { name: "Thamel", count: 42, color: "from-blue-400 to-indigo-500" },
  { name: "Lazimpat", count: 28, color: "from-emerald-400 to-teal-500" },
  { name: "Baneshwor", count: 35, color: "from-amber-400 to-orange-500" },
  { name: "Patan", count: 19, color: "from-purple-400 to-pink-500" },
  { name: "Jawalakhel", count: 15, color: "from-cyan-400 to-blue-500" },
  { name: "Bhaktapur", count: 12, color: "from-red-400 to-rose-500" }
]

export function PopularLocations() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {LOCATIONS.map((loc) => (
        <Link 
          key={loc.name} 
          href={`/search?q=${loc.name}`}
          className="group relative h-40 rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${loc.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
            <h3 className="font-bold text-lg">{loc.name}</h3>
            <p className="text-sm opacity-90">{loc.count} stays</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
