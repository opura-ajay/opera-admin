"use client"

import { useState } from "react"
import Footer from "../components/layout/Footer"
import Header from "../components/layout/Header"


export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        {/* <div className="hidden md:block">
          <Sidebar />
        </div> */}

        {/* Mobile drawer */}
        {/* {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
              <Sidebar />
            </div>
          </div>
        )} */}

        {/* Page content */}
        <main className="flex-1">
          <Header />
          {children}
          <Footer />
        </main>
      </div>


    </div>
  )
}

