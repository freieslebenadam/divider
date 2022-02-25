import React from "react"
import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <div className="text-neutral-700 bg-neutral-200 min-h-screen dark:text-neutral-200 dark:bg-neutral-900 transition-bg-100 selection:bg-indigo-500 selection:text-indigo-50">
      <Header />

      <main className="pt-12">
        {children}
      </main>
    </div>
  )
}

export default Layout