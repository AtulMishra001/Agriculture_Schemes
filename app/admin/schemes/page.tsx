"use client"

import texts from "@/language/en.json"
import { Plus, Trash2, Edit, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState, useRef, useEffect } from "react"


export default function AdminSchemes() {
  const [schemeList, setSchemeList] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [fullDescription, setFullDescription] = useState("")
  const [eligibility, setEligibility] = useState("")
  const [benefits, setBenefits] = useState("")
  const [documents, setDocuments] = useState("")
  const [schemeImage, setSchemeImage] = useState<string | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingSchemeId, setEditingSchemeId] = useState<string | null>(null)
  const [schemeType, setSchemeType] = useState("")
  const [fundingSource, setFundingSource] = useState("")
  const [implementingAgency, setImplementingAgency] = useState("")
  const [targetGroup, setTargetGroup] = useState("")
  const [applicationDeadline, setApplicationDeadline] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [state, setState] = useState("")
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/schemes`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setSchemeList(data))
      .catch(err => console.error("Failed to fetch schemes:", err))
  }, [])

  useEffect(() => {
     async function checkAccess() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/my`, { credentials: "include" });
        if (!res.ok) {
          console.log(res.status)
          router.push("/login");
        }
        const data = await res.json();

        if (data.role !== "admin") {
          router.push("/login");
        }else {
          setIsAuthenticated(true)
        }
      }
      checkAccess()
  }, [router])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
      setIsUploadingImage(true)
      setSchemeImage(null) 

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

      if (!cloudName || !uploadPreset) {
        console.error(
          "Cloudinary cloud name or upload preset is not configured."
        )
        alert("File upload service is not configured. Please contact support.")
        setIsUploadingImage(false)
        return
      }

      const cloudinaryFormData = new FormData()
      cloudinaryFormData.append("file", file)
      cloudinaryFormData.append("upload_preset", uploadPreset)
      cloudinaryFormData.append("folder", "scheme_images") 

      try {
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: cloudinaryFormData
          }
        )

        if (!cloudinaryResponse.ok) {
          const errorData = await cloudinaryResponse.json()
          throw new Error(
            `Cloudinary upload failed: ${errorData.error.message}`
          )
        }
         const cloudinaryData = await cloudinaryResponse.json()
        setSchemeImage(cloudinaryData.secure_url)
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error)
        alert(`Failed to upload image: ${error instanceof Error ? error.message : String(error)}`)
        setSchemeImage(null)
      } finally {
        setIsUploadingImage(false)
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const clearImage = () => {
    setSchemeImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = {
      title,
      shortDescription,
      fullDescription,
      eligibility,
      benefits,
      documents: documents.split(",").map((doc) => doc.trim()),
      imageUrl: schemeImage || "",
      schemeType,
      fundingSource,
      implementingAgency,
      targetGroup,
      applicationDeadline,
      state: schemeType === "state" ? state : undefined
    }

    try {
      const url = isEditMode
        ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/schemes/${editingSchemeId}`
        : `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/schemes`
      const method = isEditMode ? "PUT" : "POST"

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Failed to save scheme")

      if (isEditMode) {
        setSchemeList((prev) =>
          prev.map((s) => (s._id === editingSchemeId ? data : s))
        )
      } else {
        setSchemeList((prev) => [...prev, data])
      }

      resetForm()
    } catch (err) {
      console.error("Failed to submit scheme:", err)
    }
  }

  const resetForm = () => {
    setTitle("")
    setShortDescription("")
    setFullDescription("")
    setEligibility("")
    setBenefits("")
    setDocuments("")
    setSchemeImage(null)
    setSchemeType("")
    setFundingSource("")
    setImplementingAgency("")
    setTargetGroup("")
    setApplicationDeadline("")
    setIsEditMode(false)
    setEditingSchemeId(null)
    setState("")
  }

  const handleEditScheme = (scheme: any) => {
    setTitle(scheme.title)
    setShortDescription(scheme.shortDescription)
    setFullDescription(scheme.fullDescription)
    setEligibility(scheme.eligibility)
    setBenefits(scheme.benefits)
    setDocuments(scheme.documents.join(", "))
    setSchemeImage(scheme.imageUrl || null)
    setSchemeType(scheme.schemeType)
    setFundingSource(scheme.fundingSource)
    setImplementingAgency(scheme.implementingAgency)
    setTargetGroup(scheme.targetGroup)
    setApplicationDeadline(scheme.applicationDeadline)
    setState(scheme.state || "")
    setIsEditMode(true)
    setEditingSchemeId(scheme._id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDeleteScheme = async (schemeId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/schemes/${schemeId}`, {
        method: "DELETE",
        credentials: "include"
      })
      if (res.ok) {
        setSchemeList((prev) => prev.filter((s) => s._id !== schemeId))
      } else {
        console.error("Failed to delete scheme")
      }
    } catch (err) {
      console.error("Error deleting scheme:", err)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Please login to access the admin panel...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{texts.admin.schemes.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card p-1 sticky top-20">
            <h2 className="section-title border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 flex items-center">
              {isEditMode ? (
                <>
                  <Edit size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                  Edit Scheme
                </>
              ) : (
                <>
                  <Plus size={18} className="mr-2 text-green-600 dark:text-green-400" />
                  {texts.admin.schemes.addScheme}
                </>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Scheme Image</label>
                <div
                  className={`border-2 border-dashed ${
                    schemeImage || isUploadingImage ? "border-green-300" : "border-gray-300"
                  } dark:border-gray-700 rounded-md overflow-hidden ${
                    !schemeImage && "hover:bg-gray-50 dark:hover:bg-gray-800"
                  } transition-colors`}
                >
                  {schemeImage ? (
                    <div className="relative">
                      <Image
                        src={schemeImage || "/placeholder.svg"}
                        alt="Scheme preview"
                        width={400}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                         </div>
                  ) : isUploadingImage ? (
                    <div className="p-4 text-center flex flex-col items-center justify-center h-40">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      <span className="block text-sm text-gray-700 dark:text-gray-300 mt-2">
                        Uploading...
                      </span>
                    </div>
                  ) : (
                    <div
                      className="p-4 text-center cursor-pointer flex flex-col items-center justify-center h-40"
                      onClick={triggerFileInput}
                      role="button"
                      tabIndex={0}
                    >
                      <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                        Click to upload scheme image (Max 2MB)
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG, or GIF (Max 2MB)</span>
                    </div>
                  )}
                  <input
                    type="file"
                    id="schemeImage"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    disabled={isUploadingImage}

                  />
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {texts.admin.schemes.schemeTitle} *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {/* Scheme Type */}
              <div>
                <label htmlFor="schemeType" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Scheme Type *
                </label>
                <select
                  id="schemeType"
                  value={schemeType}
                  onChange={(e) => setSchemeType(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select Scheme Type</option>
                  <option value="central">Central Government Scheme</option>
                  <option value="state">State Government Scheme</option>
                  <option value="ngo">NGO Scheme</option>
                  <option value="international">International Organization Scheme</option>
                </select>
              </div>
              {schemeType === "state" && (
                <div>
                  <label htmlFor="state" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    State *
                  </label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="Delhi">Delhi</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                  </select>
                </div>
              )}

              {/* Funding Source */}
              <div>
                <label htmlFor="fundingSource" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Funding Source *
                </label>
                <input
                  type="text"
                  id="fundingSource"
                  value={fundingSource}
                  onChange={(e) => setFundingSource(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Ministry of Agriculture, World Bank"
                  required
                />
              </div>

              {/* Implementing Agency */}
              <div>
                <label htmlFor="implementingAgency" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Implementing Agency *
                </label>
                <input
                  type="text"
                  id="implementingAgency"
                  value={implementingAgency}
                  onChange={(e) => setImplementingAgency(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Department of Agriculture, NABARD"
                  required
                />
              </div>

              {/* Target Group */}
              <div>
                <label htmlFor="targetGroup" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Target Group *
                </label>
                <input
                  type="text"
                  id="targetGroup"
                  value={targetGroup}
                  onChange={(e) => setTargetGroup(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Small & Marginal Farmers, Women Farmers"
                  required
                />
              </div>

              {/* Application Deadline */}
              <div>
                <label htmlFor="applicationDeadline" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Application Deadline
                </label>
                <input
                  type="date"
                  id="applicationDeadline"
                  value={applicationDeadline}
                  onChange={(e) => setApplicationDeadline(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="shortDescription" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {texts.admin.schemes.shortDescription} *
                </label>
                <textarea
                  id="shortDescription"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="input-field"
                  rows={2}
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="fullDescription" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {texts.admin.schemes.fullDescription} *
                </label>
                <textarea
                  id="fullDescription"
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  className="input-field"
                  rows={4}
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="eligibility" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {texts.admin.schemes.eligibility} *
                </label>
                <textarea
                  id="eligibility"
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  className="input-field"
                  rows={3}
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="benefits" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {texts.admin.schemes.benefits} *
                </label>
                <textarea
                  id="benefits"
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  className="input-field"
                  rows={3}
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="documents" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {texts.admin.schemes.documents} *
                </label>
                <textarea
                  id="documents"
                  value={documents}
                  onChange={(e) => setDocuments(e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder="Enter comma-separated list of required documents"
                  required
                ></textarea>
              </div>

              <div className="flex justify-between pt-2">
                {isEditMode && (
                  <button type="button" className="btn-secondary text-xs" onClick={resetForm}>
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className={`btn-primary ${isEditMode ? "bg-blue-600 hover:bg-blue-700" : ""} ${
                    isEditMode ? "ml-auto" : "w-full"
                  }`}
                  disabled={isUploadingImage}
                >
                  {isEditMode ? "Update Scheme" : texts.common.submit}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card p-1">
            <h2 className="section-title border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
              Scheme List ({schemeList.length})
            </h2>

            <div className="space-y-4">
              {schemeList.map((scheme) => (
                <div
                  key={scheme._id}
                  className="border border-gray-200 dark:border-gray-700 rounded-md p-1 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-1/4 relative">
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden relative">
                        <Image
                          src={scheme.imageUrl || `/agricultural-scheme.png?height=200&width=400&query=agricultural scheme related to ${scheme.title?.toLowerCase?.() || ""}`}
                          alt={scheme.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="sm:w-3/4">
                      <div className="flex flex-wrap gap-2 mb-1">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                          Central Scheme
                        </span>
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded-full">
                          Ministry of Agriculture
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{scheme.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 mb-2">{scheme.shortDescription}</p>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {scheme.documents.slice(0, 3).map((doc: String, index: any) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                          >
                            {doc.split(" ")[0]}
                          </span>
                        ))}
                        {scheme.documents.length > 3 && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                            +{scheme.documents.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          onClick={() => handleEditScheme(scheme)}
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                          onClick={() => handleDeleteScheme(scheme._id)}
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
