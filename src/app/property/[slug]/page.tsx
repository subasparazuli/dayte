import { MapPin, Star, ShieldCheck, Clock } from "lucide-react"
import { SpaceCard } from "@/components/property/space-card"
import { ReviewList } from "@/components/property/review-list"

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Mock property data
  const property = {
    id: slug,
    name: "Oasis Boutique Hotel & Spa",
    type: "Hotel",
    location: "Thamel, Kathmandu",
    rating: 4.8,
    reviews: 124,
    description: "Experience luxury and privacy in the heart of Thamel. Our boutique hotel offers soundproofed rooms, premium amenities, and total discretion for your short stays.",
    amenities: ["Free WiFi", "AC", "Smart TV", "Room Service", "En-suite Bathroom", "Mini Bar"],
    houseRules: ["No smoking inside", "No parties", "Valid ID required at check-in"],
    host: { name: "Oasis Management", joined: "2023" }
  }

  // Mock spaces
  const spaces = [
    { id: "s1", name: "Deluxe King Room", type: "Private Room", capacity: 2, price: 800, image: "https://picsum.photos/seed/1/400/300", amenities: ["King Bed", "Bathtub", "City View"] },
    { id: "s2", name: "Premium Suite", type: "Suite", capacity: 2, price: 1500, image: "https://picsum.photos/seed/2/400/300", amenities: ["King Bed", "Jacuzzi", "Living Area"] }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Image Gallery Placeholder */}
      <div className="w-full h-[40vh] md:h-[60vh] bg-gray-900 relative">
        <img src="https://picsum.photos/seed/10/1920/1080" className="w-full h-full object-cover opacity-80" alt="Property" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white container mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{property.name}</h1>
          <div className="flex items-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{property.rating}</span>
              <span className="text-gray-300">({property.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {property.location}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4">About this place</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map(item => (
                  <div key={item} className="flex items-center gap-2 text-gray-700">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">Available Spaces</h2>
              <div className="space-y-4">
                {spaces.map(space => (
                  <SpaceCard key={space.id} space={space} propertyId={property.id} />
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
              <ReviewList />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">House Rules</h3>
              <ul className="space-y-3 mb-6">
                {property.houseRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span className="text-sm">{rule}</span>
                  </li>
                ))}
              </ul>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Hosted by {property.host.name}</h3>
                <p className="text-sm text-gray-500">Joined {property.host.joined}</p>
              </div>
            </div>
            
            <div className="bg-gray-200 h-64 rounded-2xl flex items-center justify-center border border-gray-300">
              <div className="text-center text-gray-500">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="font-medium">Map View</p>
                <p className="text-xs">Exact location provided after booking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
