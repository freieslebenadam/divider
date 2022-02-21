import React from "react"

const Layout = ({ children }) => {
  return (
    <main className="text-neutral-700 bg-neutral-200 min-h-screen">
      {children}
    </main>
  )
}

export default Layout