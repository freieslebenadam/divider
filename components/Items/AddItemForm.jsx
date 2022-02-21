import React, { useState } from "react"
import { useItems } from "../../hooks"

const AddItemForm = () => {
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const {addNewItem} = useItems()

  const handleNameChange = (e) => {
    setItemName(e.target.value)
  }

  const handlePriceChange = (e) => {
    let value = e.target.value
    if (value.match(/^([0-9]+\.?,?([0-9]+)?|^$)$/)) {
      setItemPrice(e.target.value)
    } 
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let fixedPrice = itemPrice.trim()
    fixedPrice = fixedPrice.replace(',', '.')
    fixedPrice = Number(fixedPrice)
    fixedPrice = Math.round((fixedPrice + Number.EPSILON) * 100) / 100

    addNewItem(itemName, fixedPrice)

    setItemName("")
    setItemPrice("")

    document.getElementById("itemName").focus()

  }

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <div className="flex flex-col text-[.7rem] font-semibold text-indigo-500 uppercase flex-auto">
        <label htmlFor="itemName" className="pl-1">Název</label>
        <input type="text" id="itemName"
          className="text-xs text-gray-700 bg-neutral-50 rounded shadow p-2 focus:outline-none focus:ring-0"
          placeholder="Položka"
          value={itemName}
          onChange={handleNameChange}
          tabIndex={1}
          spellCheck="false"
          autoComplete="off"
          required
        />
      </div>
      <div className="flex flex-col text-[.7rem] font-semibold text-indigo-500 uppercase w-32 mx-2">
        <label htmlFor="itemPrice" className="pl-1">Cena</label>
        <input type="text" id="itemPrice" 
          className="text-xs text-gray-700 bg-neutral-50 shadow p-2 focus:outline-none focus:ring-0 rounded"
          placeholder="19.99"
          value={itemPrice}
          onChange={handlePriceChange}
          tabIndex={2}
          spellCheck="false"
          autoComplete="off"
          required

        />
      </div>
      <div className="flex flex-col text-[.7rem] font-semibold text-transparent uppercase flex-none">
        <div className="">Potvrdit</div>
        <button className="py-2 px-4 rounded shadow text-center text-xs font-semibold text-neutral-50 bg-indigo-500 focus:outline-none focus:scale-105 focus:shadow-md focus:shadow-indigo-300 active:scale-100 transition-100 hover:bg-indigo-400" type="submit" tabIndex={3}>Přidat</button>
      </div>
    </form>
  )
}

export default AddItemForm