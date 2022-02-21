import { useContext } from "react"
import { DividentsContext } from "../context/DividentsContext"

const useDividents = () => {
  return useContext(DividentsContext)
}

export default useDividents