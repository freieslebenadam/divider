import React, { useState } from "react"
import { useItems } from "../../hooks"
import ListItem from "./ListItem"

const ItemsList = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  const { items, sumTotal } = useItems()

  const formatPrice = (price) => {
    let formattedPrice = price.toString()
        
    if (!formattedPrice.match(/^[0-9]+\.[0-9]{2}$/)) {
      if (formattedPrice.match(/^[0-9]+\.[0-9]{1}$/)) {
        formattedPrice += "0"
      } else if (formattedPrice.match(/^[0-9]+$/)) {
        formattedPrice += ".00"
      }
    }

    return formattedPrice
  }

  return (
    <div className="flex flex-col gap-2 my-1">
      {items.map(item => <ListItem key={item.id} item={{...item, price: formatPrice(item.price)}} />)}
      <div className="text-sm flex">
        <div className="font-normal px-4 py-3 flex-auto"><span className="font-bold text-indigo-500">{items.length}</span> {items.length === 0 ? "Položek": items.length === 1 ? "Položka" : "Položky"}</div>
        <div className="flex-none font-mono py-3 px-4 font-semibold text-neutral-500">
          <span className="pr-2 text-xs font-sans text-neutral-400 font-normal">Celkem</span>
          <span className="text-indigo-500">{formatPrice(sumTotal())}</span>
          <span className="font-bold text-neutral-300 pl-1 text-xs select-none">Kč</span>
        </div>
      </div>
    </div>
  )
}

export default ItemsList