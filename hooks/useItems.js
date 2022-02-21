import { useContext } from "react"
import { ItemsContext } from "../context/ItemsContext"

const useItems = () => {
  return useContext(ItemsContext)
}

export default useItems