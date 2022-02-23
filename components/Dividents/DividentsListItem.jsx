import React from "react"
import { FaTimes } from "react-icons/fa"
import { useDividents, useItems } from "../../hooks"

const DividentsListItem = ({ divident: { id, name, color } }) => {
  const {deleteDivident} = useDividents()
  const {purgeDivident} = useItems()

  const handleDelete = () => {
    purgeDivident(id)
    deleteDivident(id)
  }

  return (
    <div className="flex items-center text-lighter-800 text-xs p-1 rounded shadow animate-fade" style={{backgroundColor: color}}>
      <p className="px-2 select-none capitalize">{name}</p>
      <button className="bg-lighter-200 rounded p-1 transition-100 hover:bg-lighter-700 hover:text-dim-600 cursor-pointer" onClick={handleDelete}><FaTimes /></button>
    </div>
  )
}

export default DividentsListItem