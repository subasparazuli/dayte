import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Platform Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: "2,451" },
          { label: "Active Properties", value: "142" },
          { label: "Bookings (Month)", value: "845" },
          { label: "Platform Fee (Month)", value: "Rs. 245K" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Property Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">New Property {i}</p>
                    <p className="text-xs text-gray-500">Submitted 2 hrs ago</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">Approve</button>
                    <button className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-gray-900">User booked Room BKG-00{i}</p>
                    <p className="text-xs text-gray-500">5 mins ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
