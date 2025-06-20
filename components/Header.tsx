"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "@/utils/theme"
import { usePathname, useRouter } from "next/navigation"
import texts from "@/language/en.json"
import {
  Moon,
  Sun,
  Menu,
  X,
  Home,
  LogIn,
  UserPlus,
  LayoutDashboard,
  ChevronDown,
  Leaf,
  FileText,
  User,
  LogOut,
  Bell,
} from "lucide-react"

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  useEffect(() => {
    async function fetchAuthStatus() {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/my`, {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.role === "user");
          setIsAdminAuthenticated(data.role === "admin");
          setUserName(data.name);
        } else {
          setIsAuthenticated(false);
          setIsAdminAuthenticated(false);
          setUserName("");
        }
      } catch {
        setIsAuthenticated(false);
        setIsAdminAuthenticated(false);
        setUserName("");
      }
    }

    fetchAuthStatus();
  }, [pathname])

  const handleLogout = async () => {
    await fetch(`${BASE_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
    setIsAuthenticated(false);
    setIsAdminAuthenticated(false);
    setUserName("");
    router.push("/");
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const getActiveClass = (path: string) => {
    return isActive(path)
      ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
      : "text-gray-700 dark:text-gray-300"
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="text-lg font-bold text-green-600 dark:text-green-400 hidden sm:inline-block">
              {texts.common.appName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors ${getActiveClass(
                "/",
              )}`}
            >
              <Home size={18} />
              {texts.common.home}
            </Link>

            <Link
              href="/schemes"
              className={`flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors ${getActiveClass(
                "/schemes",
              )}`}
            >
              <FileText size={18} />
              Schemes
            </Link>

            <Link
              href="/crops"
              className={`flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors ${getActiveClass(
                "/crops",
              )}`}
            >
              <Leaf size={18} />
              Crops
            </Link>

            {isAdminAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen)
                    setIsUserDropdownOpen(false)
                  }}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors ${
                    pathname.startsWith("/admin")
                      ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <LayoutDashboard size={18} />
                  {texts.common.admin}
                  <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
                    <Link
                      href="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/admin/schemes"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Manage Schemes
                    </Link>
                    <Link
                      href="/admin/crops"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Manage Crops
                    </Link>
                    <Link
                      href="/admin/approvals"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Approvals
                    </Link>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              aria-label={theme === "dark" ? texts.common.lightMode : texts.common.darkMode}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated || isAdminAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setIsUserDropdownOpen(!isUserDropdownOpen)
                    setIsDropdownOpen(false)
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400">
                    {userName ? userName.charAt(0) : (isAdminAuthenticated ? "A" : "R")}
                  </div>
                  <span className="hidden sm:inline">
                    {userName ? userName : (isAdminAuthenticated ? "Admin" : "User")}
                  </span>
                  <ChevronDown size={14} className={`transition-transform ${isUserDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
                    {isAuthenticated && (
                      <>
                        <Link
                          href="/user/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <LayoutDashboard size={16} />
                          Dashboard
                        </Link>
                        <Link
                          href="/user/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <User size={16} />
                          Profile
                        </Link>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      </>
                    )}

                    {isAdminAuthenticated && (
                      <>
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <LayoutDashboard size={16} />
                          Admin Dashboard
                        </Link>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      </>
                    )}

                    <button
                      onClick={() => {
                        handleLogout()
                        setIsUserDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/admin/login"
                  className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {texts.common.admin}
                </Link>
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {texts.common.login}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
                >
                  {texts.common.register}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 dark:text-gray-300 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium ${getActiveClass(
                  "/",
                )}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                {texts.common.home}
              </Link>

              <Link
                href="/schemes"
                className={`flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium ${getActiveClass(
                  "/schemes",
                )}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText size={18} />
                Schemes
              </Link>

              <Link
                href="/crops"
                className={`flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium ${getActiveClass(
                  "/crops",
                )}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Leaf size={18} />
                Crops
              </Link>

              {isAuthenticated && (
                <Link
                  href="/user/dashboard"
                  className={`flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium ${getActiveClass(
                    "/user/dashboard",
                  )}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              )}

              {isAdminAuthenticated && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2 px-4"></div>
                  <p className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{userName || "Admin"}</p>
                  <Link
                    href="/admin/dashboard"
                    className={`flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium ${getActiveClass(
                      "/admin/dashboard",
                    )}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    Admin Dashboard
                  </Link>
                  <Link
                    href="/admin/schemes"
                    className={`flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium ${getActiveClass(
                      "/admin/schemes",
                    )}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText size={18} />
                    Manage Schemes
                  </Link>
                  <Link
                    href="/admin/crops"
                    className={`flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium ${getActiveClass(
                      "/admin/crops",
                    )}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Leaf size={18} />
                    Manage Crops
                  </Link>
                  <Link
                    href="/admin/approvals"
                    className={`flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium ${getActiveClass(
                      "/admin/approvals",
                    )}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText size={18} />
                    Approvals
                  </Link>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <Link
                    href="/admin/login"
                    className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={18} />
                    {texts.common.admin}
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={18} />
                    {texts.common.login}
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus size={18} />
                    {texts.common.register}
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-red-600 dark:text-red-400"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
