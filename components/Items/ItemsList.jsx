import React, { useEffect, useState } from "react"
import { useItems } from "../../hooks"
import ListItem from "./ListItem"
import { formatPrice } from "../../lib"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

const ItemsList = () => {
  const { items, sumTotal } = useItems()

  const [flexibleItems, setFlexibleItems] = useState([])

  const [sortingOpen, setSortingOpen] = useState(false)

  const [sorting, setSorting] = useState([
    { type: "newest", title: "Od nejnovějších", selected: true },
    { type: "oldest", title: "Od nejstarších", selected: false },
    { type: "name", title: "Dle názvu", selected: false },
    { type: "most_expensive", title: "Od nejdražších", selected: false },
    { type: "cheapest", title: "Od nejlevnějších", selected: false },
    { type: "dividents", title: "Dle dlužitelů", selected: false }
  ])

  const itemsCountSpelling = items.length === 1 ? "Položka" : items.length > 1 && items.length < 5 ? "Položky" : "Položek"

  const sortItemsBy = (items,type) => {
    let newItems = [...items]
    switch(type) {
      case "newest":
        newItems.sort((a,b) => a.id > b.id && -1)
        break
      case "oldest":
        newItems.sort((a,b) => a.id < b.id && -1)
        break
      case "name":
        newItems.sort((a,b) => a.name.localeCompare(b.name))
        break
      case "most_expensive":
        newItems.sort((a,b) => a.price > b.price && -1)
        break
      case "cheapest":
        newItems.sort((a,b) => a.price < b.price && -1)
        break
      case "dividents":
        let moreThanOne = newItems.filter(item => item.dividents.length > 1)
        let exactlyOne = newItems.filter(item => item.dividents.length === 1)
        let none = newItems.filter(item => item.dividents.length === 0)

        moreThanOne.sort((a,b) => a.dividents.length > b.dividents.length && - 1)
        exactlyOne.sort((a,b) => a.dividents[0] > b.dividents[0] && -1)

        newItems = [ ...moreThanOne, ...exactlyOne, ...none ]
        break
      default: 
        break
    }
    return newItems
  }

  const toggleSorting = (value = null) => {
    if (typeof value !== "boolean") {
      setSortingOpen(prev => !prev)
    } else {
      setSortingOpen(value)
    }
  }

  const setSortingType = (type) => {
    setSorting(prev => prev.map(pr => {
      if (pr.type === type) {
        return { ...pr, selected: true }
      } else {
        return { ...pr, selected: false }
      }
    }))
    toggleSorting(false)
  }

  useEffect(() => {
    setFlexibleItems([...items])
    setFlexibleItems(prev => sortItemsBy(prev, sorting.find(sort => sort.selected).type))
  }, [items])

  useEffect(() => {
    const selected = sorting.find(sort => sort.selected)
    
    setFlexibleItems(prev => sortItemsBy(prev, selected.type))
  }, [sorting])

  return (
    <div className="flex flex-col gap-2 my-1">
      <div className="text-sm flex px-1 sm:px-4">
        <div className="font-normal py-3 flex-auto">
          <span className="font-bold text-indigo-500">{items.length}</span>
          <span className="text-xs sm:text-base pl-1 dark:text-neutral-400">{itemsCountSpelling}</span>
        </div>
        <div className="flex-none font-mono py-3 font-semibold text-neutral-500">
          <span className="pr-2 text-xs font-sans text-neutral-400 font-normal">Celkem</span>
          <span className="text-indigo-500 tracking-tighter">{formatPrice(sumTotal())}</span>
          <span className="font-bold text-neutral-300 dark:text-neutral-400 pl-1 text-xs select-none">Kč</span>
        </div>
      </div>
      <div className="flex justify-between" style={{display: items.length > 0? "flex": "none"}}>
        <div className="w-36 relative" onMouseLeave={() => toggleSorting(false)}>
          <button className={`bg-neutral-50 flex justify-start px-2 group items-center rounded-t ${!sortingOpen&&"rounded-b"} shadow py-2 w-full text-xs font-medium text-neutral-500`} onClick={toggleSorting}>
            <span className="group-hover:text-indigo-500 text-sm transition-100">
              {sortingOpen?<IoIosArrowUp/>:<IoIosArrowDown />}
            </span>
            <span className="flex-auto">{sorting.find(sort => sort.selected).title}</span>
          </button>
          <div className="bg-neutral-50 absolute pb-3 w-full z-30 flex rounded-b shadow-md animate-fade flex-col text-xs" style={{display: sortingOpen? "flex": "none"}}>
            {sorting.map((sort,index) => (
              <button key={index} className={`text-left pl-4 ${sort.selected?"text-indigo-500 font-medium":"text-neutral-500"} transition-100 py-2 hover:text-indigo-500`} onClick={() => setSortingType(sort.type)}>
                {sort.title}
              </button>
            ))}
          </div>
        </div>
        <div>
          {/* FILTERING */}
        </div>
      </div>
      {flexibleItems.map(item => <ListItem key={item.id} item={{...item, price: formatPrice(item.price)}} />)}
    </div>
  )
}

export default ItemsList