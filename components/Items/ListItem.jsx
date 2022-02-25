import React, { useEffect, useState } from "react"
import { MdGroupAdd, MdPerson } from "react-icons/md"
import { BsThreeDotsVertical } from "react-icons/bs"
import { TiTick } from "react-icons/ti"
import { useDividents, useItems } from "../../hooks"

const ListItem = ({ item }) => {
  const [delShow, setDelShow] = useState(false)
  const [dividentsModal, setDividentsModal] = useState(false)
  
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedDividents, setSelectedDividents] = useState([])
  
  const {deleteItem, updateDividents} = useItems()
  const {dividents} = useDividents()

  useEffect(() => {
    if (item.dividents.length > 0) {
      setSelectedDividents(item.dividents)
    }
  }, [])

  useEffect(() => {
    if (dividentsModal) {
      document.querySelector("body").style.overflow = "hidden"
    } else {
      document.querySelector("body").style.overflow = "auto"
    }
  }, [dividentsModal])

  useEffect(() => {
    if (selectedItem !== null) {
      updateDividents(selectedItem, selectedDividents)
    }
  }, [selectedDividents])

  useEffect(() => {
    setSelectedDividents(prev => (
      prev.filter(dividentId => dividents.find(div => div.id === dividentId))
    ))
  }, [dividents])

  const handleDelete = () => {
    deleteItem(item.id)
    setDelShow(false)
  }

  const showDividentsModal = (id) => {
    setSelectedItem(id)
    setDividentsModal(true)
  }
  const hideDividentsModal = () => {
    setDividentsModal(false)
    setSelectedItem(null)
  }

  const toggleDividentSelection = (id) => {
    setSelectedDividents(prev => {
      if (prev.find(dividentId => dividentId === id)) {
        return prev.filter(dividentId => dividentId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  return (
    <>
      <form style={{display: dividentsModal? "flex": "none"}} className="fixed items-center justify-center top-0 left-0 bottom-0 right-0 animate-fade z-10">
        <div className="absolute z-40 top-0 left-0 w-full h-full bg-dim-500" onClick={hideDividentsModal} />
        <div className="flex flex-col p-6 bg-neutral-100 dark:bg-neutral-700 rounded shadow-md z-50 min-w-[25rem]">
          <div>
            <h4 className="font-semibold text-lg capitalize">Položka <span className="text-indigo-500 font-extrabold dark:text-indigo-400">{item.name}</span></h4>
            <p className="text-xs text-neutral-400">Tato položka stojí <span className="text-indigo-500 dark:text-indigo-400 font-medium">{item.price}</span> Kč</p>
          </div>
          <div className="my-5">
            <div className="flex flex-col">
              <label className="text-xs font-semibold uppercase text-indigo-500 dark:text-indigo-400" htmlFor="dividentsSelect">Přidělit dělitele</label>
              <div id="dividentsSelect" className="flex flex-col gap-2 py-2">
                {dividents.length === 0 && (
                  <p className="text-sm font-medium text-neutral-500">Žádní dělitelé</p>
                )}
                {dividents.map(divident => (
                  <button key={divident.id} type="button" className="flex items-center text-lighter-800 text-sm p-2 rounded shadow animate-fade transition-100" style={{backgroundColor: divident.color}} onClick={() => toggleDividentSelection(divident.id)}>
                    <div className="bg-lighter-800 p-2 rounded-full animate-fade" style={{display: selectedDividents.includes(divident.id)? "inline-block": "none",color: divident.color}}>
                      <TiTick />
                    </div>
                    <p className="p-2 select-none capitalize transition-100">{divident.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 transition-100 hover:bg-indigo-400 text-sm font-semibold text-white bg-indigo-500 rounded shadow" type="button" onClick={hideDividentsModal}>OK</button>
          </div>
        </div>
      </form>

      <div key={item.id} className="flex bg-neutral-50 dark:bg-neutral-700 transition-bg-100 rounded shadow text-sm animate-slide overflow-hidden">
        <button className={`relative flex-none w-5 transition-100 hover:bg-neutral-200 dark:hover:bg-neutral-600 hover:text-neutral-400 rounded-l flex items-center justify-center text-xl text-neutral-300`} onClick={() => setDelShow(prev => !prev)} style={{width: delShow ? "2.5rem" : "auto"}}>
          <BsThreeDotsVertical />
        </button>
        <button style={{display: delShow?"block":"none"}} className="bg-red-500 rounded shadow px-2 m-1 text-[.75rem] text-red-100 transition-100 hover:bg-red-600 animate-rollout" onClick={handleDelete}>
          Odstranit
        </button>
        <div className="flex-none min-w-[2.5rem] font-semibold py-3 px-2 overflow-hidden capitalize">
          {item.name}
        </div>
        <div className="flex-auto relative py-3 px-2 overflow-hidden">
          {item.dividents.map((dividentId, index) => {
            // console.log("Item:",item.name,"Dividents:",item.dividents)
            if (dividents.find(divident => divident.id === dividentId) !== null) {
              let style = {
                left: 0 + index * 7.5,
                color: dividents.find(divident => divident.id === dividentId) != null ? dividents.find(divident => divident.id === dividentId).color : "transparent"
              }
              return (
                <div key={dividentId} style={style} className="absolute text-lg z-1">
                  <MdPerson />
                </div>
              )
            }
          })}
        </div>
        <div className="flex-none font-mono py-3 px-4 font-semibold text-neutral-500 dark:text-neutral-300">
          {item.price}<span className="font-bold text-neutral-300 dark:text-neutral-500 pl-1 text-xs select-none">Kč</span>
        </div>
        <button className="flex-none flex text-neutral-400 text-xl justify-center items-center w-14 rounded-r transition-100 hover:bg-neutral-100 hover:text-indigo-500" onClick={() => showDividentsModal(item.id)}>
          <MdGroupAdd />
        </button>
      </div>
    </>
  )
}

export default ListItem