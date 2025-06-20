import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, Droplets, Leaf, Thermometer, Sprout, ArrowLeft } from "lucide-react"

export default async function CropDetails({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/crops/${params.id}`, {
    cache: "no-store"
  })
  if (!res.ok) notFound()
  const crop = await res.json()


  const imageQuery = encodeURIComponent(`farming ${crop.name.toLowerCase()} field`)

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <div className="relative h-60 mb-6 rounded-xl overflow-hidden">
        <Image
          src={crop.imageUrl || `/placeholder.svg?height=600&width=1200&query=${imageQuery}`}
          alt={crop.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="p-2">
            <h1 className="text-md font-bold text-white mb-2">{crop.name}</h1>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Season: {crop.season}
              </span>
              {crop.cropType && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Type: {crop.cropType}
                </span>
              )}
              {crop.soilType && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Soil: {crop.soilType}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-1">
            <h2 className="section-title border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Crop Information</h2>

            {/* Crop Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg flex items-start gap-3">
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-800 dark:text-white">Growing Season</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{crop.season}</p>
                </div>
              </div>

              {crop.waterRequirement && (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white">Water Requirement</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{crop.waterRequirement}</p>
                  </div>
                </div>
              )}

              {crop.soilType && (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg flex items-start gap-3">
                  <Sprout className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white">Soil Type</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{crop.soilType}</p>
                  </div>
                </div>
              )}

              {crop.growthDuration && (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white">Growth Duration</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{crop.growthDuration} days</p>
                  </div>
                </div>
              )}
            </div>

            {/* Fertilizers */}
            <div className="mb-6">
              <h2 className="section-title flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                Recommended Fertilizers
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{crop.fertilizers}</p>
            </div>

            {/* Pesticides */}
            <div className="mb-6">
              <h2 className="section-title flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-red-600 dark:text-red-400" />
                Recommended Pesticides
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{crop.pesticides}</p>
            </div>

            {/* Back button */}
            <div className="mt-6">
              <Link href="/crops" className="btn-secondary flex items-center gap-1 w-fit">
                <ArrowLeft size={16} />
                Back to Crops
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-1 sticky top-20">
            <h2 className="section-title border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Cultivation Tips</h2>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 flex-shrink-0">
                  <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Prepare the soil well before planting</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 flex-shrink-0">
                  <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Ensure proper spacing between plants</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 flex-shrink-0">
                  <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Monitor for pests and diseases regularly
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 flex-shrink-0">
                  <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Apply fertilizers as per recommended schedule
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 flex-shrink-0">
                  <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Harvest at the right time for best quality
                </span>
              </li>
            </ul>

            {/* Related Schemes */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-1 mb-6">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Related Schemes</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/scheme-details/1" className="text-sm text-green-600 dark:text-green-400 hover:underline">
                    PM-KISAN Scheme
                  </Link>
                </li>
                <li>
                  <Link href="/scheme-details/2" className="text-sm text-green-600 dark:text-green-400 hover:underline">
                    Pradhan Mantri Fasal Bima Yojana
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
