import type { Crop } from "@/utils/mockdata"
import Link from "next/link"
import Image from "next/image"
import { Leaf, ArrowRight } from "lucide-react"

export default async function CropsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/crops`, {
    method: "GET",
    cache: "no-store"
  })

  const crops: Crop[] = await res.json();

  const getImageQuery = (cropName: string) => {
    return encodeURIComponent(`farming ${cropName.toLowerCase()} field`)
  }

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <div className="relative h-60 mb-6 w-full">
        <Image src="/agricultural-crops-field.png" alt="Crops" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-md font-bold text-white mb-2">Agricultural Crops</h1>
            <p className="text-sm text-white/90 max-w-2xl">
              Explore information about various crops, their growing seasons, and recommended practices.
            </p>
          </div>
        </div>
      </div>

      {/* Content with container */}
      <div className="container mx-auto px-4 pb-12">
        <div className="mb-6">
          <h2 className="text-md font-bold text-gray-900 dark:text-white mb-4">Available Crops</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {crops.map((crop) => (
              <div key={crop._id} className="card hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-40 relative">
                  <Image
                    src={crop.imageUrl || `/placeholder.svg?height=200&width=400&query=${getImageQuery(crop.name)}`}
                    alt={crop.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
                    <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                <div className="p-1">
                  <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-1">{crop.name}</h3>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                      Season: {crop.season}
                    </span>
                    {crop.cropType && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                        {crop.cropType}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Fertilizers:</span> {crop.fertilizers.split(",")[0]}...
                    </p>
                  </div>

                  <Link href={`/crop-details/${crop._id}`} className="btn-primary inline-flex items-center gap-1 group">
                    View Details
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
