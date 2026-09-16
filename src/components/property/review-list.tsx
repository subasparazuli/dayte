import { Star } from "lucide-react"

const MOCK_REVIEWS = [
  { id: 1, author: "Rajesh S.", rating: 5, date: "October 2023", text: "Very clean and discreet. Check-in was perfectly smooth via WhatsApp code." },
  { id: 2, author: "Anita G.", rating: 4, date: "September 2023", text: "Nice room, great amenities. Good value for a quick 3-hour rest before my flight." },
  { id: 3, author: "Prakash K.", rating: 5, date: "August 2023", text: "Highly recommend. Fast wifi and extremely quiet." }
]

export function ReviewList() {
  return (
    <div className="space-y-6">
      {MOCK_REVIEWS.map(review => (
        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-gray-900">{review.author}</div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                />
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-400 mb-2">{review.date}</div>
          <p className="text-gray-600 text-sm">{review.text}</p>
        </div>
      ))}
    </div>
  )
}
