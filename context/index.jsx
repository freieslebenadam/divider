import React from "react"
import { DividentsContextProvider } from "./DividentsContext"
import { ItemsContextProvider } from "./ItemsContext"
import { ThemeContextProvider } from "./ThemeContext"
import { LocaleContextProvider } from "./LocaleContext"
import { CurrencyContextProvider } from "./CurrencyContext"

const ContextProvider = ({ children }) => {
  return (
    <ThemeContextProvider>
      <LocaleContextProvider>
        <CurrencyContextProvider>
          <DividentsContextProvider>
            <ItemsContextProvider>
              {children}
            </ItemsContextProvider>
          </DividentsContextProvider>
        </CurrencyContextProvider>
      </LocaleContextProvider>
    </ThemeContextProvider>
  )
}

export default ContextProvider