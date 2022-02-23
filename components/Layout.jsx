import React from "react"
import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <div className="text-neutral-700 bg-neutral-200 min-h-screen">
      <Header />

      <main className="pt-12">
        {children}
      </main>
    </div>
  )
}

export default Layout