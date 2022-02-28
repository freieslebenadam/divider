import React, { useState, useEffect } from 'react'
import { FaTimes } from "react-icons/fa"
import { useDividents, useLocale } from '../hooks'
import { formatPrice } from "../lib"
import { MdPerson } from "react-icons/md"

const Receipt = ({ receiptModalOpen, hideReceiptModal }) => {
  const [sumTotal, setSumTotal] = useState(0)
  const {dividents} = useDividents()

  const {t} = useLocale()

  const dividees = dividents.filter(div => div.total > 0)

  useEffect(() => {
    setSumTotal(0)
    if (dividees.length !== 0) {
      dividees.forEach(dividee => setSumTotal(prev => prev + dividee.total))
    }
  }, [dividees])

  return (
    <div className="fixed items-center justify-center top-0 left-0 bottom-0 right-0 animate-fade z-10"
      style={{display: receiptModalOpen ? "flex": "none"}}>
      <div className="absolute -z-10 top-0 left-0 w-full h-full bg-dim-500" onClick={hideReceiptModal}/>
      <div className="container py-4 flex justify-center">
        <div className="flex flex-col p-6 bg-neutral-100 dark:bg-neutral-700 rounded shadow-md z-50 w-[90%] sm:w-[35rem]">
          <div className='flex justify-between items-center'>
            <h4 className="font-semibold text-lg">{t.receipt.title}</h4>
            <button className='text-xl text-neutral-400 dark:text-neutral-500 transition-100 hover:text-red-500'
              onClick={hideReceiptModal}>
              <FaTimes />
            </button>
          </div>
          <div className="my-5">
            {dividees.length > 0 ? (
              <div className="flex flex-col">
                {dividees.map(divident => (
                    <div key={divident.id} className='flex p-2 justify-between items-center border-b-2 border-dashed border-dim-50 dark:border-lighter-50'>
                      <div className='flex items-center gap-1' style={{color: divident.color}}>
                        <div className='text-lg'><MdPerson /></div>
                        <p className='text-sm font-bold capitalize'>{divident.name}</p>
                      </div>
                      <p className='font-mono font-medium tracking-tighter'>
                        {formatPrice(divident.total)} <span className='text-dim-300 font-bold dark:text-lighter-300'>{t.currency}</span>
                      </p>
                    </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="text-xs font-medium text-neutral-500">{t.receipt.no_totals}</p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center pb-5">
            <p className="text-neutral-400 font-medium">{t.receipt.total}</p>
            <div className="font-mono font-medium text-neutral-500">
              <span className="text-indigo-500 dark:text-indigo-400 font-bold">{formatPrice(sumTotal)}</span>
              <span className="font-medium text-neutral-400 pl-2 select-none">{t.currency}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 transition-100 hover:bg-indigo-400 text-sm font-semibold text-white bg-indigo-500 rounded shadow uppercase" type="button" onClick={hideReceiptModal}>{t.receipt.button_ok}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Receipt