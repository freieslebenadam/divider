import React, { useState } from "react"
import { MdGroupAdd } from "react-icons/md"
import { BsThreeDotsVertical } from "react-icons/bs"
import { useItems } from "../../hooks"

const ListItem = ({ item }) => {
  const [delShow, setDelShow] = useState(false)
  const {deleteItem} = useItems()

  const handleDelete = () => {
    deleteItem(item.id)
    setDelShow(false)
  }

  return (
    <div key={item.id} className="flex bg-neutral-50 rounded shadow text-sm animate-slide">
      <button className={`relative flex-none w-5 transition-100 hover:bg-neutral-200 hover:text-neutral-400 rounded-l flex items-center justify-center text-xl text-neutral-300`} onClick={() => setDelShow(prev => !prev)} style={{width: delShow ? "2.5rem" : "auto"}}>
        <BsThreeDotsVertical />
      </button>
      <button style={{display: delShow?"block":"none"}} className="bg-red-500 rounded shadow px-2 m-1 text-[.75rem] text-red-100 transition-100 hover:bg-red-600 animate-rollout" onClick={handleDelete}>
        Odstranit
      </button>
      <div className="flex-auto font-semibold py-3 px-2 overflow-hidden capitalize">
        {item.name}
      </div>
      <div className="flex-none font-mono py-3 px-4 font-semibold text-neutral-500">
        {item.price}<span className="font-bold text-neutral-300 pl-1 text-xs select-none">Kč</span>
      </div>
      <button className="flex-none flex text-neutral-400 text-xl justify-center items-center w-14 rounded-r transition-100 hover:bg-neutral-100 hover:text-indigo-500">
        <MdGroupAdd />
      </button>
    </div>
  )
}

export default ListItem