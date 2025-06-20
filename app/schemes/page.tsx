import type { Scheme } from "@/utils/mockdata"
import SchemeCard from "@/components/SchemeCard"
import Image from "next/image"
import { Search, Filter } from "lucide-react"

export default async function SchemesPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/schemes`, {
      cache: "no-store"
    })
    const schemes: Scheme[] = await res.json()
  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <div className="relative h-60 mb-6 w-full">
        <Image src="/agricultural-scheme.png" alt="Government Schemes" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-white mb-2">Government Schemes for Farmers</h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Explore various government schemes designed to support farmers across India
            </p>
          </div>
        </div>
      </div>

      {/* Content with container */}
      <div className="container mx-auto px-4 pb-12">
        {/* Search and Filter Section */}
        <div className="mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                  placeholder="Search schemes by name, type, or category..."
                />
              </div>
              <div className="flex gap-2">
                <select className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm px-3 py-2">
                  <option value="">All Scheme Types</option>
                  <option value="central">Central Schemes</option>
                  <option value="state">State Schemes</option>
                  <option value="ngo">NGO Schemes</option>
                </select>
                <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-medium">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Schemes Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Available Schemes</h2>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold px-3 py-1 rounded-full">
              {schemes.length} Schemes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme) => (
              <SchemeCard key={scheme._id} scheme={scheme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
