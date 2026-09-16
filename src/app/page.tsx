import { SearchForm } from "@/components/home/search-form"
import { PopularLocations } from "@/components/home/popular-locations"
import { HowItWorks } from "@/components/home/how-it-works"
import { TrustIndicators } from "@/components/home/trust-indicators"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800 pt-16 pb-32 md:pt-24 md:pb-48 px-4 overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500 blur-3xl mix-blend-screen" />
          <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-amber-500 blur-3xl mix-blend-screen" />
        </div>

        <div className="relative z-10 container mx-auto max-w-5xl flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 animate-slide-up">
            Book a private short stay, <br className="hidden md:block"/>
            <span className="text-amber-400">by the hour.</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl animate-slide-up" style={{ animationDelay: '100ms' }}>
            Find premium hotels, guest rooms & private spaces across Nepal. 
            Discreet, secure, and ready when you are.
          </p>
          
          <div className="w-full max-w-4xl animate-slide-up" style={{ animationDelay: '200ms' }}>
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <TrustIndicators />
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Popular Locations</h2>
            <p className="text-gray-600 mt-2">Find the perfect space in Nepal's top spots</p>
          </div>
          <PopularLocations />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How QuickStay Works</h2>
          <HowItWorks />
        </div>
      </section>
    </div>
  )
}
