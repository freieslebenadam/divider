import React from 'react'
import { FaTimes } from "react-icons/fa"

const Receipt = ({ receiptModalOpen, hideReceiptModal }) => {

  return (
    <div className="fixed items-center justify-center top-0 left-0 bottom-0 right-0 animate-fade z-10"
      style={{display: receiptModalOpen ? "flex": "none"}}>
      <div className="absolute -z-10 top-0 left-0 w-full h-full bg-dim-500" onClick={hideReceiptModal}/>
      <div className="container py-4">
        <div className="flex flex-col p-6 bg-neutral-100 rounded shadow-md z-50 min-w-[25rem]">
          <div className='flex justify-between items-center'>
            <h4 className="font-semibold text-lg">Kompletní vyúčtování</h4>
            <button className='text-xl text-neutral-400 transition-100 hover:text-red-500'
              onClick={hideReceiptModal}>
              <FaTimes />
            </button>
          </div>
          <div className="my-5">
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase text-indigo-500">Dělitelé</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 transition-100 hover:bg-indigo-400 text-sm font-semibold text-white bg-indigo-500 rounded shadow" type="button">OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Receipt