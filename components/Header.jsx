import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaReceipt } from 'react-icons/fa'
import { useDividents, useItems } from '../hooks'
import Receipt from "./Receipt"
import ThemeSwitch from "./ThemeSwitch"

const Header = () => {
  const [receiptModalOpen, setReceiptModalOpen] = useState(false)
  const {countTotals} = useDividents()
  const {items} = useItems()

  const showReceiptModal = () => {
    countTotals(items)
    setReceiptModalOpen(true)
    console.log("Setting totals")
  }
  const hideReceiptModal = () => {
    setReceiptModalOpen(false)
  }

  useEffect(() => {
    if (receiptModalOpen) {
      document.querySelector("body").style.overflow = "hidden"
    } else {
      document.querySelector("body").style.overflow = "auto"
    }
  }, [receiptModalOpen])

  return (
    <>
      <Receipt 
        receiptModalOpen={receiptModalOpen} 
        hideReceiptModal={hideReceiptModal} 
      />

      <header className='fixed top-0 left-0 w-full h-12 z-[5] bg-neutral-50 dark:bg-neutral-800 shadow transition-bg-100'>
        <div className="container h-full flex items-center">
          <Link href={`/`} passHref>
            <div className='flex items-center h-full cursor-pointer transition-100 group flex-none'>
              <h1 className='font-extrabold text-lg border-r-4 border-indigo-500 pr-2'>Sqer</h1>
              <h2 className='font-extrabold text-xl lowercase pl-2 text-indigo-500 transition-100 group-hover:pl-3'>Divider</h2>
            </div>
          </Link>
          <div className='flex-auto' />
          <div className='flex-none px-8'>
            <ThemeSwitch />
          </div>
          <div className='flex items-center flex-none'>
            <button className='text-xl text-neutral-400 transition-100 hover:text-indigo-500 cursor-pointer' onClick={showReceiptModal}>
              <FaReceipt />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header