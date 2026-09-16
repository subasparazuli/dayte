"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push('/')
    }, 1000)
  }

  return (
    <Card className="shadow-2xl border-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">Create an account</CardTitle>
        <p className="text-sm text-gray-500 text-center">Join Dayte today</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="John" required />
            <Input label="Last Name" placeholder="Doe" required />
          </div>
          
          <Input label="Phone Number" placeholder="98XXXXXXXX" type="tel" required />
          <Input label="Email (Optional)" placeholder="name@example.com" type="email" />

          <div className="flex flex-col space-y-2 pt-2">
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="adult" className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" required />
              <label htmlFor="adult" className="text-sm text-gray-600 leading-tight">
                I confirm I am 18 years of age or older. (ID will be verified at check-in)
              </label>
            </div>
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="terms" className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" required />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
