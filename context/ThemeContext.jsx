import React, { useState, useEffect } from "react"

// Create new Theme Context
const ThemeContext = React.createContext()

const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true)

  // When "darkMode" changes, update document based on Local Storage "theme" variable
  useEffect(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove("dark")
      setDarkMode(false)
    }
  }, [darkMode])

  // Toggle Dark Mode and Update the Local Storage
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      setLocalStorageTheme(!prev)
      return !prev
    })
  }

  // Sets "theme" variable in Local Storage
  const setLocalStorageTheme = (isDark) => {
    localStorage.theme = isDark ? "dark" : "light"
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContextProvider, ThemeContext }