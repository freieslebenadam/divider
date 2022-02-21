import React from "react"
import { DividentsContextProvider } from "./DividentsContext"
import { ItemsContextProvider } from "./ItemsContext"

const ContextProvider = ({ children }) => {
  return (
    <DividentsContextProvider>
      <ItemsContextProvider>
        {children}
      </ItemsContextProvider>
    </DividentsContextProvider>
  )
}

export default ContextProvider