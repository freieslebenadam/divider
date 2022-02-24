import React from "react"
import { useItems } from "../../hooks"
import ListItem from "./ListItem"
import { formatPrice } from "../../lib"

const ItemsList = () => {
  const { items, sumTotal } = useItems()

  const itemsCountSpelling = items.length === 1 ? "Položka" : items.length > 1 && items.length < 5 ? "Položky" : "Položek"

  const sortedItems = [...items].sort((a,b) => {if (a.id > b.id) return -1 })

  return (
    <>
      <div className="flex flex-col gap-2 my-1">
        <div className="text-sm flex">
          <div className="font-normal px-4 py-3 flex-auto"><span className="font-bold text-indigo-500">{items.length}</span> {itemsCountSpelling}</div>
          <div className="flex-none font-mono py-3 px-4 font-semibold text-neutral-500">
            <span className="pr-2 text-xs font-sans text-neutral-400 font-normal">Celkem</span>
            <span className="text-indigo-500">{formatPrice(sumTotal())}</span>
            <span className="font-bold text-neutral-300 pl-1 text-xs select-none">Kč</span>
          </div>
        </div>
        {sortedItems.map(item => <ListItem key={item.id} item={{...item, price: formatPrice(item.price)}} />)}
      </div>
    </>
  )
}

export default ItemsList