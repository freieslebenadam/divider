import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { TiTick } from "react-icons/ti"
import { useCurrency } from '../hooks'

const CurrencySelect = () => {
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const {currencies,currency,setCurrencyTo} = useCurrency()

  const toggleCurrency = (value = null) => {
    if (typeof value === "boolean") {
      setCurrencyOpen(value)
    } else {
      setCurrencyOpen(prev => !prev)
    }
  }

  return (
    <div className='relative' onMouseLeave={() => toggleCurrency(false)}>
      <button className={`px-2 py-1 text-[.55rem] font-medium rounded-t ${!currencyOpen&&"rounded-b"} shadow bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 flex items-center gap-1 pr-3`} onClick={toggleCurrency}>
        <span>
          {currencyOpen?<IoIosArrowUp />:<IoIosArrowDown />}
        </span>
        <span>{currency.name}</span>
      </button>
      <div className='animate-fade absolute top-5 text-[.55rem] text-center w-full bg-neutral-100 dark:bg-neutral-700 rounded-b shadow pb-2' style={{display: currencyOpen?"block":"none"}}>
        {currencies.sort((a,b) => a.name < b.name && -1).map(curr => (
          <div key={curr.id} className='flex items-center justify-center py-1 cursor-pointer transition-75 hover:bg-indigo-500 hover:text-neutral-100' onClick={() => {setCurrencyTo(curr.id);setCurrencyOpen(false)}}>
            <span style={{opacity: currency.id === curr.id ? 1 : 0}}>
              <TiTick />
            </span>
            <span>{curr.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CurrencySelect