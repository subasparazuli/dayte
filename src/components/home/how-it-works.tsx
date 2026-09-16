import { Search, CalendarCheck, Key } from "lucide-react"

const STEPS = [
  {
    icon: Search,
    title: "Find a space",
    description: "Search by location, date, and choose exactly how many hours you need."
  },
  {
    icon: CalendarCheck,
    title: "Book instantly",
    description: "Secure your stay instantly with Khalti, eSewa, or Fonepay."
  },
  {
    icon: Key,
    title: "Check-in privately",
    description: "Receive your access details and enjoy your private, comfortable stay."
  }
]

export function HowItWorks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {STEPS.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 text-indigo-900 shadow-inner">
            <step.icon className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
          <p className="text-gray-600 max-w-sm">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
