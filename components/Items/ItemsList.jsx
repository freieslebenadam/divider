import React, { useEffect, useState } from "react"
import { useDividents, useItems, useLocale } from "../../hooks"
import ListItem from "./ListItem"
import { formatPrice } from "../../lib"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { BsFilter } from "react-icons/bs"
import { TiTick } from "react-icons/ti"

const ItemsList = () => {
  const { items, sumTotal } = useItems()
  const { dividents } = useDividents()

  const {t} = useLocale()

  const [filteredItems, setFilteredItems] = useState([])
  const [flexibleItems, setFlexibleItems] = useState([])

  const [sortingOpen, setSortingOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const [sorting, setSorting] = useState([
    { type: "newest", title: t.items.list.sorting.newest, selected: true },
    { type: "oldest", title: t.items.list.sorting.oldest, selected: false },
    { type: "name", title: t.items.list.sorting.name, selected: false },
    { type: "most_expensive", title: t.items.list.sorting.most_expensive, selected: false },
    { type: "cheapest", title: t.items.list.sorting.cheapest, selected: false },
    { type: "dividents", title: t.items.list.sorting.dividents, selected: false }
  ])

  const [filtering, setFiltering] = useState([])

  const itemsCountSpelling = items.length === 1 ? t.items.list.items_count.one : items.length > 1 && items.length < 5 ? t.items.list.items_count.special : t.items.list.items_count.rest

  const filterItems = (items) => {
    const selectedFilters = filtering.filter(fil => fil.selected).map(fil => fil.id)

    let newItemsWithDividents = [...items].filter(item => item.dividents.length > 0)
    let newItemsWithoutDividents = [...items].filter(item => item.dividents.length === 0)

    let newItems = []

    newItems = newItemsWithDividents.filter(item => {
      let passes = false
      item.dividents.forEach(dividentId => {
        if (selectedFilters.includes(dividentId)) {
          passes = true
        }
      })
      return passes
    })

    if (selectedFilters.includes(0)) {
      return [ ...newItems, ...newItemsWithoutDividents ]
    } else {
      return newItems
    }
  }

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
  const toggleFilter = (value = null) => {
    if (typeof value !== "boolean") {
      setFilterOpen(prev => !prev)
    } else {
      setFilterOpen(value)
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

  const toggleDivident = (id) => {
    setFiltering(prev => {
      return prev.map(div => {
        if (div.id === id) {
          return { ...div, selected: !div.selected }
        }
        return div
      })
    })
  }

  useEffect(() => {
    let existingDividents = [...dividents].map(divident => {
      if (typeof filtering.find(div => div.id === divident.id) === "undefined") {
        return { 
          id: divident.id,
          name: divident.name,
          color: divident.color,
          selected: true
        }
      } else {
        return filtering.find(div => div.id === divident.id)
      }
    })

    const noDivident = {
      id: 0,
      name: t.items.list.filtering.non_asigned,
      color: "#939393",
      selected: true
    }

    setFiltering([...existingDividents, noDivident])

  }, [dividents])

  useEffect(() => {
    setFilteredItems(filterItems(items))
  }, [filtering])

  useEffect(() => {
    setFlexibleItems([...filteredItems])
    setFlexibleItems(prev => sortItemsBy(prev, sorting.find(sort => sort.selected).type))
  }, [filteredItems])

  useEffect(() => {
    setFilteredItems(filterItems(items))
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
          <span className="pr-2 text-xs font-sans text-neutral-400 font-normal">{t.items.list.items_price_sum}</span>
          <span className="text-indigo-500 tracking-tighter">{formatPrice(sumTotal())}</span>
          <span className="font-bold text-neutral-300 dark:text-neutral-400 pl-1 text-xs select-none">{t.currency}</span>
        </div>
      </div>
      <div className="flex justify-between" style={{display: items.length > 0? "flex": "none"}}>
        <div className="w-36 relative" onMouseLeave={() => toggleSorting(false)}>
          <button className={`bg-neutral-50 dark:bg-neutral-700 flex justify-start px-2 group items-center rounded-t ${sortingOpen?"shadow-md":"shadow rounded-b"} transition-200 transition-bg-100 py-2 w-full text-xs font-medium text-neutral-500 dark:text-neutral-300`} onClick={toggleSorting}>
            <span className="group-hover:text-indigo-500 dark:group-hover:text-indigo-400 text-sm transition-100">
              {sortingOpen?<IoIosArrowUp/>:<IoIosArrowDown />}
            </span>
            <span className="flex-auto">{sorting.find(sort => sort.selected).title}</span>
          </button>
          <div className="bg-neutral-50 dark:bg-neutral-700 absolute pb-3 w-full z-30 flex rounded-b shadow-md shadow-dim-200 animate-fade flex-col text-xs" style={{display: sortingOpen? "flex": "none"}}>
            {sorting.map((sort,index) => (
              <button key={index} className={`text-left pl-4 ${sort.selected?"text-indigo-500 dark:text-indigo-400 font-medium":"text-neutral-500 dark:text-neutral-400"} transition-100 py-2 hover:text-indigo-500 dark:hover:text-indigo-400`} onClick={() => setSortingType(sort.type)}>
                {sort.title}
              </button>
            ))}
          </div>
        </div>
        <div className="w-32 relative" onMouseLeave={() => toggleFilter(false)}>
          <button className={`bg-neutral-50 dark:bg-neutral-700 flex justify-start px-2 group items-center rounded-t ${filterOpen?"shadow-md":"shadow rounded-b"} transition-200 transition-bg-100 py-2 w-full text-xs font-medium text-neutral-500 dark:text-neutral-300`} onClick={toggleFilter}>
            <span className="flex-auto">{t.items.list.filtering.title}</span>
            <span className="group-hover:text-indigo-500 dark:group-hover:text-indigo-400 text-base transition-100">
              <BsFilter />
            </span>
          </button>
          <div className="bg-neutral-50 dark:bg-neutral-700 absolute pb-3 w-full z-30 flex rounded-b shadow-md shadow-dim-200 animate-fade flex-col text-xs" style={{display: filterOpen? "flex": "none"}}>
            {filtering.map(divident => {
              let holder = ""
              return (
                <button key={divident.id} className={`text-neutral-500 dark:text-neutral-400 transition-100 py-3 capitalize font-medium flex justify-start items-center px-4`} onMouseEnter={(e) => {
                  holder = e.target.style.color
                  e.target.style.color = divident.color
                }} onMouseLeave={(e) => e.target.style.color = holder} onClick={() => toggleDivident(divident.id)}>
                  <span className="pr-1 text-base" style={{color: divident.color, opacity: divident.selected?1:0}}>
                    <TiTick />
                  </span>
                  <span className="font-semibold">
                    {divident.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      {flexibleItems.map(item => <ListItem key={item.id} item={{...item, price: formatPrice(item.price)}} />)}
    </div>
  )
}

export default ItemsList