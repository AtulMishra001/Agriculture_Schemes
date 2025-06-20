"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import texts from "@/language/en.json"
import { Mail, Lock, User, Phone, ArrowRight, AlertCircle } from "lucide-react"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error , setError] = useState();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password, phone}),
      credentials: "include"
    });
    const data = await res.json();
    if(!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    router.push("/login")
  
  } catch (err: any) {
    setError(err.message)
  }
  }

  return (
    <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-12rem)]">
      <div className="w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row bg-white dark:bg-gray-800">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-2">
          <div className="flex justify-center mb-6">
            <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="rounded-full" />
          </div>

          <h1 className="text-md font-bold text-gray-900 dark:text-white text-center mb-6">
            {texts.auth.registerTitle}
          </h1>

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
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field pl-10"
                placeholder="Full Name"
                required
              />
            </div>

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
                <Phone size={16} className="text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field pl-10"
                placeholder="Phone Number"
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

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={16} className="text-gray-400" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field pl-10"
                placeholder={texts.auth.confirmPassword}
                required
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" className="rounded text-green-600 focus:ring-green-500 mr-2" required />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <a href="#" className="text-green-600 dark:text-green-400 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-600 dark:text-green-400 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              {texts.auth.signUp}
              <ArrowRight size={16} />
            </button>

            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
              {texts.auth.haveAccount}{" "}
              <Link href="/login" className="text-green-600 dark:text-green-400 hover:underline font-medium">
                {texts.auth.signIn}
              </Link>
            </p>
          </form>
        </div>

        {/* Right side - Image */}
        <div className="relative hidden md:block md:w-1/2 bg-green-600">
          <Image src="/images/register-bg.png" alt="Farmer in field" fill className="object-cover opacity-90" />
          <div className="absolute inset-0 bg-green-800/30 flex flex-col justify-center p-2">
            <div className="bg-white/10 backdrop-blur-sm p-1 rounded-lg max-w-xs mx-auto">
              <h2 className="text-md font-bold text-white text-center mb-2">Join Our Farming Community</h2>
              <p className="text-xs text-white/90 text-center">
                Create an account to access government schemes, agricultural resources, and connect with other farmers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
