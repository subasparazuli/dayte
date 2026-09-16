"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [method, setMethod] = useState<'phone' | 'email'>('phone')
  const [step, setStep] = useState<'input' | 'otp'>('input')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('otp')
    }, 1000)
  }

  const handleVerify = (e: React.FormEvent) => {
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
        <CardTitle className="text-2xl text-center font-bold">Welcome back</CardTitle>
        <p className="text-sm text-gray-500 text-center">Log in to your account</p>
      </CardHeader>
      <CardContent>
        {step === 'input' ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div className="flex p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${method === 'phone' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => setMethod('phone')}
              >
                Phone
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${method === 'email' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => setMethod('email')}
              >
                Email
              </button>
            </div>

            {method === 'phone' ? (
              <div className="flex gap-2">
                <Input value="+977" readOnly className="w-20 text-center bg-gray-50" />
                <Input type="tel" placeholder="98XXXXXXXX" className="flex-1" required />
              </div>
            ) : (
              <Input type="email" placeholder="name@example.com" leftIcon={<Mail className="w-4 h-4" />} required />
            )}

            <div className="flex items-center space-x-2 mt-4">
              <input type="checkbox" id="adult" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" required />
              <label htmlFor="adult" className="text-sm text-gray-600">
                I confirm I am 18 years or older
              </label>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Send Code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-sm text-center text-gray-600 mb-4">
              Enter the 6-digit code sent to your {method}.
            </p>
            <Input 
              type="text" 
              placeholder="000000" 
              maxLength={6} 
              className="text-center text-2xl tracking-widest h-14" 
              required 
            />
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Verify & Login
            </Button>
            <button 
              type="button" 
              onClick={() => setStep('input')}
              className="w-full text-sm text-indigo-600 hover:text-indigo-800"
            >
              Back
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
