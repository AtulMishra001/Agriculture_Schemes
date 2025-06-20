import Link from "next/link"
import { notFound } from "next/navigation"
import texts from "@/language/en.json"
import Image from "next/image"
import {
  CheckCircle,
  Users,
  Award,
  FileText,
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Building,
  Target,
} from "lucide-react"

export default async function SchemeDetails({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/schemes/${params.id}`, {
    cache: "no-store"
  })

  if (!res.ok) notFound()

  const scheme = await res.json()
  const imageQuery = encodeURIComponent(`agricultural field related to ${scheme.title.toLowerCase()}`)

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <div className="relative h-60 mb-6 rounded-xl overflow-hidden">
        <Image
          src={scheme.imageUrl || `/placeholder.svg?height=600&width=1200&query=${imageQuery}`}
          alt={scheme.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="p-2">
            <h1 className="text-md font-bold text-white mb-2">{scheme.title}</h1>
            <p className="text-sm text-white/90 max-w-2xl">{scheme.shortDescription}</p>

            {/* Scheme type badge */}
            {scheme.schemeType && (
              <div className="mt-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    scheme.schemeType === "central"
                      ? "bg-blue-100 text-blue-800"
                      : scheme.schemeType === "state"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {scheme.schemeType === "central"
                    ? "Central Government Scheme"
                    : scheme.schemeType === "state"
                      ? `State Government Scheme${scheme.state ? `: ${scheme.state}` : ""}`
                      : scheme.schemeType}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-1">
            <h2 className="section-title border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Scheme Overview</h2>

            <div className="mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300">{scheme.fullDescription}</p>
            </div>

            {/* Additional scheme details */}
            {(scheme.fundingSource ||
              scheme.implementingAgency ||
              scheme.targetGroup ||
              scheme.applicationDeadline) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                {scheme.fundingSource && (
                  <div className="flex items-start gap-2">
                    <Building size={18} className="text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 dark:text-white">Funding Source</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{scheme.fundingSource}</p>
                    </div>
                  </div>
                )}

                {scheme.implementingAgency && (
                  <div className="flex items-start gap-2">
                    <Building size={18} className="text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 dark:text-white">Implementing Agency</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{scheme.implementingAgency}</p>
                    </div>
                  </div>
                )}

                {scheme.targetGroup && (
                  <div className="flex items-start gap-2">
                    <Target size={18} className="text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 dark:text-white">Target Group</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{scheme.targetGroup}</p>
                    </div>
                  </div>
                )}

                {scheme.applicationDeadline && (
                  <div className="flex items-start gap-2">
                    <Calendar size={18} className="text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 dark:text-white">Application Deadline</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{scheme.applicationDeadline}</p>
                    </div>
                  </div>
                )}

                {scheme.state && scheme.schemeType === "state" && (
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 dark:text-white">State</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{scheme.state}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mb-6">
              <h2 className="section-title flex items-center gap-2">
                <Users size={18} className="text-green-600 dark:text-green-400" />
                {texts.schemeDetails.eligibility}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{scheme.eligibility}</p>
            </div>

            <div className="mb-6">
              <h2 className="section-title flex items-center gap-2">
                <Award size={18} className="text-green-600 dark:text-green-400" />
                {texts.schemeDetails.benefits}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{scheme.benefits}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-1 sticky top-20">
            <h2 className="section-title flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
              <FileText size={18} className="text-green-600 dark:text-green-400" />
              {texts.schemeDetails.requiredDocuments}
            </h2>

            <ul className="space-y-3 mb-6">
              {scheme.documents.map((doc: String, index: number) => (
                <li key={index} className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{doc}</span>
                </li>
              ))}
            </ul>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-1 mb-6">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-1">Application Process</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                Complete the application form with your details and upload the required documents to apply for this
                scheme.
              </p>
            </div>

            <div className="flex justify-between">
              <Link href="/" className="btn-secondary flex items-center gap-1">
                <ArrowLeft size={16} />
                {texts.common.back}
              </Link>
              <Link href={`/apply/${scheme._id}`} className="btn-primary flex items-center gap-1">
                {texts.common.applyNow}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
