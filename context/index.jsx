import React from "react"
import { DividentsContextProvider } from "./DividentsContext"
import { ItemsContextProvider } from "./ItemsContext"

const ContextProvider = ({ children }) => {
  return (
    <ItemsContextProvider>
        <DividentsContextProvider>
        {children}
      </DividentsContextProvider>
    </ItemsContextProvider>
  )
}

export default ContextProvider