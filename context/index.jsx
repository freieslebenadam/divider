import React from "react"
import { DividentsContextProvider } from "./DividentsContext"
import { ItemsContextProvider } from "./ItemsContext"
import { ThemeContextProvider } from "./ThemeContext"

const ContextProvider = ({ children }) => {
  return (
    <ThemeContextProvider>
      <DividentsContextProvider>
        <ItemsContextProvider>
          {children}
        </ItemsContextProvider>
      </DividentsContextProvider>
    </ThemeContextProvider>
  )
}

export default ContextProvider