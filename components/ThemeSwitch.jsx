import React from "react"
import { FiMoon, FiSun } from "react-icons/fi"
import { useTheme } from "../hooks"

const ThemeSwitch = () => {
  const {darkMode, toggleDarkMode} = useTheme()

  const themeIcon = darkMode ? <FiMoon /> : <FiSun />

  return (
    <button onClick={toggleDarkMode} className="flex items-center justify-center w-8 h-8 hover:bg-lighter-300 dark:hover:bg-lighter-100 rounded-full shadow text-dim-500 dark:text-lighter-500 transition-100 hover:text-dim-900 hover:shadow-md dark:hover:text-lighter-900 active:scale-95">
      {themeIcon}
    </button>
  )
}

export default ThemeSwitch