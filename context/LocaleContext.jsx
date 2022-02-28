import React, { useState } from 'react'
import { cs, en } from "../lib/localization"

export const LocaleContext = React.createContext()

const LocaleContextProvider = ({ children }) => {
  const [t, setT] = useState(cs)

  const setLocaleTo = (locale) => {
    switch (locale) {
      case "en":
        setT(en)
        break
      case "cs":
        setT(cs)
        break
    }
  }

  return (
    <LocaleContext.Provider value={{t, setLocaleTo}}>
      {children}
    </LocaleContext.Provider>
  )
}

export { LocaleContextProvider }