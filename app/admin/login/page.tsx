"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Lock, User, ArrowRight, AlertCircle } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
        credentials: "include" // Required to send cookie
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(res.status);
        throw new Error(data.message || "Login failed");
      }

      // Redirect based on role
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    }

    setIsLoading(false);
  }

  return (
    <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-12rem)]">
      <div className="w-full max-w-md overflow-hidden rounded-xl shadow-2xl bg-white dark:bg-gray-800">
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16">
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover rounded-full" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">Admin Login</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
            Enter your credentials to access the admin panel
          </p>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-md mb-4 flex items-center gap-2">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="Email"
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
                placeholder="Password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-green-600 focus:ring-green-500 mr-2" />
                <span className="text-xs text-gray-700 dark:text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-xs text-green-600 dark:text-green-400 hover:underline">
                Forgot Password?
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
                  Login to Admin Panel
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
              This area is restricted to authorized personnel only.
              <br />
              Unauthorized access attempts may be subject to legal action.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
