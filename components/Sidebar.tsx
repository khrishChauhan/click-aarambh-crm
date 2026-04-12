"use client"

import Link from "next/link"
import { LayoutDashboard, Users, CalendarDays } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-zinc-900 text-gray-300 flex flex-col justify-between p-5">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <h1 className="text-xl font-semibold text-white mb-8">
          Click Aarambh
        </h1>

        {/* Navigation */}
        <nav className="space-y-4">

          <Link
            href="/dashboard"
            className="flex items-center gap-3 hover:text-white transition"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/leads"
            className="flex items-center gap-3 hover:text-white transition"
          >
            <Users size={18} />
            Leads
          </Link>

          <Link
            href="/meetings"
            className="flex items-center gap-3 hover:text-white transition"
          >
            <CalendarDays size={18} />
            Meetings
          </Link>

        </nav>

      </div>

      {/* Bottom Section */}
      <button className="text-left hover:text-white">
        Logout
      </button>

    </div>
  )
}