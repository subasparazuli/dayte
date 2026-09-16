import { ShieldCheck, CheckCircle2, CreditCard, Clock } from "lucide-react"

const INDICATORS = [
  { icon: ShieldCheck, text: "Private & discreet check-in" },
  { icon: CheckCircle2, text: "Verified premium properties" },
  { icon: CreditCard, text: "Secure local payments" },
  { icon: Clock, text: "Flexible hourly rates" }
]

export function TrustIndicators() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
      {INDICATORS.map((indicator, idx) => (
        <div key={idx} className="flex items-center gap-2 text-gray-600">
          <indicator.icon className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-medium">{indicator.text}</span>
        </div>
      ))}
    </div>
  )
}
