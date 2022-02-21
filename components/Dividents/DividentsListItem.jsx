import React from "react"
import { FaTimes } from "react-icons/fa"

const DividentsListItem = ({ name, color }) => {
  return (
    <div className="flex items-center text-lighter-800 text-xs p-1 rounded shadow" style={{backgroundColor: color}}>
      <p className="px-2">{name}</p>
      <span className="bg-lighter-200 rounded p-1 transition-100 hover:bg-lighter-700 hover:text-dim-600 cursor-pointer"><FaTimes /></span>
    </div>
  )
}

export default DividentsListItem