import Image from "next/image"
import Link from "next/link"
import texts from "@/language/en.json"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner p-2 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/image.png" alt="Logo" width={40} height={40} className="rounded-full" />
              <span className="text-md font-semibold text-green-600 dark:text-green-400">Agriculture Schemes</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
              Connecting farmers with government schemes and resources to enhance agricultural productivity and improve
              livelihoods.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                <Facebook size={16} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                <Twitter size={16} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                <Instagram size={16} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#schemes"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Schemes
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Government Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Ministry of Agriculture
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Farmer Portal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Kisan Call Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                >
                  Agricultural Extension
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={14} className="text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-xs text-gray-600 dark:text-gray-400">123 Agriculture Road, New Delhi, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={14} className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                <span className="text-xs text-gray-600 dark:text-gray-400">+91 1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center">
                <Mail size={14} className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                <span className="text-xs text-gray-600 dark:text-gray-400">support@farmerschemes.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">{texts.common.footer}</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a
                href="#"
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
