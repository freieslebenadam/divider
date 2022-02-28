import React from "react"
import { DividentsContextProvider } from "./DividentsContext"
import { ItemsContextProvider } from "./ItemsContext"
import { ThemeContextProvider } from "./ThemeContext"
import { LocaleContextProvider } from "./LocaleContext"

const ContextProvider = ({ children }) => {
  return (
    <ThemeContextProvider>
      <LocaleContextProvider>
        <DividentsContextProvider>
          <ItemsContextProvider>
            {children}
          </ItemsContextProvider>
        </DividentsContextProvider>
      </LocaleContextProvider>
    </ThemeContextProvider>
  )
}

export default ContextProvider