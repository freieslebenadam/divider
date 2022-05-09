import React, { useState } from "react"
import { useItems, useLocale } from "../../hooks"

const AddItemForm = () => {
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const {addNewItem} = useItems()

  const {t} = useLocale()

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
    <form onSubmit={handleSubmit} className="w-full flex">
      <div className="flex flex-col text-[.7rem] min-w-[7.5rem] font-semibold text-indigo-500 uppercase flex-auto">
        <label htmlFor="itemName" className="pl-1">{t.items.add_form.name_label}</label>
        <input type="text" id="itemName"
          className="text-xs text-neutral-700 bg-neutral-50 dark:text-neutral-200 rounded shadow p-2 focus:outline-none focus:ring-0 outline-none dark:bg-neutral-700 transition-bg-100 ring-0 transition-200 focus:shadow-lg"
          placeholder={t.items.add_form.name_placeholder}
          value={itemName}
          onChange={handleNameChange}
          tabIndex={0}
          spellCheck="false"
          autoComplete="off"
          required
        />
      </div>
      <div className="flex flex-col text-[.7rem] font-semibold text-indigo-500 uppercase min-w-[2rem] max-w-[5rem] mx-2">
        <label htmlFor="itemPrice" className="pl-1">{t.items.add_form.price_label}</label>
        <input type="text" id="itemPrice" 
          className="text-xs text-neutral-700 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-700 transition-bg-100 shadow p-2 focus:outline-none focus:ring-0 rounded outline-none ring-0 transition-200 focus:shadow-lg"
          placeholder={t.items.add_form.price_placeholder}
          value={itemPrice}
          onChange={handlePriceChange}
          tabIndex={0}
          spellCheck="false"
          autoComplete="off"
          pattern="([0-9]|,|\.)*"
          required
          inputMode="decimal"
        />
      </div>
      <div className="flex flex-col text-[.7rem] font-semibold text-transparent uppercase flex-none">
        <div className="text-transparent">_</div>
        <button className="py-2 px-4 rounded shadow text-center text-xs font-semibold text-neutral-50 bg-indigo-500 focus:outline-none focus:scale-105 focus:shadow-md focus:shadow-indigo-300 active:scale-100 transition-100 hover:bg-indigo-400" type="submit" tabIndex={0}>{t.items.add_form.button_add}</button>
      </div>
    </form>
  )
}

export default AddItemForm