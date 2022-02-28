import React, { useState, useEffect } from "react"
import { FaPlus } from "react-icons/fa"
import { useDividents, useLocale } from "../../hooks"
import DividentsListItem from "./DividentsListItem"
import { TiTick } from "react-icons/ti"

const colors = [
  { id: "color-1", hex: "#ef4444", selected: false },
  { id: "color-2", hex: "#f59e0B", selected: false },
  { id: "color-3", hex: "#84cc16", selected: false },
  { id: "color-4", hex: "#8b5cf6", selected: true },
  { id: "color-5", hex: "#ec4899", selected: false },
  { id: "color-6", hex: "#3b82f6", selected: false },
  { id: "color-7", hex: "#d946ef", selected: true },
  { id: "color-8", hex: "#06b6d4", selected: false },
  { id: "color-9", hex: "#10b981", selected: false },
  { id: "color-10", hex: "#a855f7", selected: false },
]

const DividentsList = () => {
  const [showModal, setShowModal] = useState(false)
  const {dividents, addDivident} = useDividents()

  const [dividentName, setDividentName] = useState("")
  const [dividentColor, setDividentColor] = useState("#a3a3a3")

  const {t} = useLocale()

  useEffect(() => {
    if (showModal) {
      document.querySelector("body").style.overflow = "hidden"
    } else {
      document.querySelector("body").style.overflow = "auto"
    }
  }, [showModal])

  const handleSubmitDivident = (e) => {
    e.preventDefault()
    addDivident(dividentName, dividentColor)
    setDividentName("")
    setDividentColor("#a3a3a3")
    setShowModal(false)
  }

  const focusModal = () => {
    setShowModal(true)
    setTimeout(() => {
      document.getElementById("dividentName").focus()
    }, 20)
  }

  return (
    <>
      <form style={{display: showModal? "flex": "none"}} className="fixed items-center justify-center top-0 left-0 bottom-0 right-0 animate-fade z-10" onSubmit={handleSubmitDivident}>
        <div className="absolute z-40 top-0 left-0 w-full h-full bg-dim-500" onClick={() => setShowModal(false)} />
        <div className="flex flex-col p-6 bg-neutral-100 dark:bg-neutral-700 transition-bg-100 rounded shadow-md z-50 min-w-[90%] sm:min-w-[25rem]">
          <div>
            <h4 className="font-bold text-lg">{t.dividents.modal.title}</h4>
          </div>
          <div className="my-2">
            <div className="flex flex-col">
              <label className="text-xs font-semibold uppercase text-indigo-500 dark:text-indigo-400" htmlFor="dividentName">{t.dividents.modal.name_label}</label>
              <input type="text" id="dividentName"
                className="py-2 mt-1 px-4 rounded shadow text-sm ring-0 outline-none transition-200 focus:shadow-lg focus:outline-none focus:ring-0 dark:bg-neutral-600"
                placeholder={t.dividents.modal.name_placeholder}
                value={dividentName}
                onChange={(e) => setDividentName(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="my-5">
            <h5 className="text-xs font-semibold uppercase text-indigo-500 dark:text-indigo-400">{t.dividents.modal.color_label}</h5>
            <div className="grid grid-cols-5 gap-1 my-2">
              {colors.map((color) => (
                <div key={color.id} className="h-10 rounded shadow transition-100 flex items-center justify-center hover:animate-jump cursor-pointer" onClick={() => setDividentColor(color.hex)} style={{backgroundColor: color.hex}}>
                  <div style={{color: color.hex, display: dividentColor === color.hex ? "inline-block" : "none"}} className="bg-lighter-600 p-2 rounded-full animate-fade">
                    <TiTick />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 transition-100 hover:bg-red-400 text-sm font-semibold text-white bg-red-500 rounded shadow" type="button" onClick={() => setShowModal(false)}>{t.dividents.modal.button_cancel}</button>
            <button className="flex-1 py-2 transition-100 hover:bg-green-400 text-sm font-semibold text-white bg-green-500 rounded shadow" type="submit">{t.dividents.modal.button_confirm}</button>
          </div>
        </div>
      </form>

      <div className="flex flex-wrap gap-1">
        {dividents.map(divident => (
          <DividentsListItem key={divident.id} divident={divident} />
        ))}
        <button className="flex items-center text-white text-xs transition-100 hover:bg-indigo-500 bg-neutral-300 dark:bg-neutral-500 dark:hover:bg-indigo-500 py-2 px-3 rounded shadow transition-bg-100" onClick={focusModal} aria-label="Add divident">
          <FaPlus />
        </button>
      </div>
    </>
  )
}

export default DividentsList