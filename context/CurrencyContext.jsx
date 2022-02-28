import React, { useState } from 'react'
import { useLocalStorage } from '../hooks'

export const CurrencyContext = React.createContext()

const CurrencyContextProvider = ({ children }) => {
  const [currencies, setCurrencies] = useState([
    { id: 1, name: "USD", symbol: "$" },
    { id: 2, name: "EUR", symbol: "€" },
    { id: 3, name: "CZK", symbol: "Kč" },
    { id: 4, name: "GBP", symbol: "£" },
    { id: 5, name: "AUD", symbol: "$" },
    { id: 6, name: "CAD", symbol: "$" },
  ])
  const [currency, setCurrency] = useState({})

  const [localStorageCurrency, setLocalStorageCurrency] = useLocalStorage("currency", null)

  const setCurrencyTo = (id) => {
    setCurrency(currencies.find(cur => cur.id === id))
    setLocalStorageCurrency(id)
  }

  return (
    <CurrencyContext.Provider value={{currency, currencies, setCurrencyTo}}>
      {children}
    </CurrencyContext.Provider>
  )
}

export { CurrencyContextProvider }