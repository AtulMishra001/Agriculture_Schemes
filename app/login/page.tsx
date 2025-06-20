"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import texts from "@/language/en.json"
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      })

      const data = await res.json()
      console.log(data)

      if (!res.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Redirect based on role
      if (data.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/user/dashboard")
      }
    } catch (err: any) {
      setError(err.message)
    }

    setIsLoading(false)
  }

  return (
    <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-12rem)]">
      <div className="w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row bg-white dark:bg-gray-800">
        {/* Left side - Image */}
        <div className="relative hidden md:block md:w-1/2 bg-green-600">
          <Image src="/images/login-bg.png" alt="Farming landscape" fill className="object-cover opacity-90" />
          <div className="absolute inset-0 bg-green-800/30 flex flex-col justify-center p-2">
            <div className="bg-white/10 backdrop-blur-sm p-1 rounded-lg max-w-xs mx-auto">
              <h2 className="text-lg font-bold text-white text-center mb-2">Supporting Farmers Across India</h2>
              <p className="text-sm text-white/90 text-center">
                Access government schemes designed to empower agricultural communities and enhance productivity.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-2">
          <div className="flex justify-center mb-6">
            <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="rounded-full" />
          </div>

          <h1 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-6">{texts.auth.loginTitle}</h1>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-md mb-4 flex items-center gap-2">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail size={16} className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder={texts.auth.email}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={16} className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder={texts.auth.password}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-green-600 focus:ring-green-500 mr-2" />
                <span className="text-xs text-gray-700 dark:text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-xs text-green-600 dark:text-green-400 hover:underline">
                {texts.auth.forgotPassword}
              </a>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  {texts.auth.signIn}
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
              {texts.auth.noAccount}{" "}
              <Link href="/register" className="text-green-600 dark:text-green-400 hover:underline font-medium">
                {texts.auth.signUp}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
