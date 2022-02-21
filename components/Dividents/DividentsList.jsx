import React from "react"
import { FaPlus } from "react-icons/fa"
import { useDividents } from "../../hooks"
import DividentsListItem from "./DividentsListItem"

const dummyData = [
  { id: 1, name: "Ondra", color: "#f43f5e" },
  { id: 2, name: "Michal", color: "#6366f1" },
  { id: 3, name: "Adam", color: "#10b981" },
  { id: 4, name: "Káťa", color: "#f59e0b" },
]

const colors = [
  { hex: "#f59e0B", occupied: false }
]

const DividentsList = () => {
  const {dividents} = useDividents()

  return (
    <div className="flex flex-wrap gap-1">
      {dividents.map(item => (
        <DividentsListItem key={item.id} name={item.name} color={item.color} />
      ))}
      <button className="flex items-center text-white text-xs transition-100 hover:bg-indigo-500 bg-neutral-300 py-2 px-3 rounded shadow">
        <FaPlus />
      </button>
    </div>
  )
}

export default DividentsList