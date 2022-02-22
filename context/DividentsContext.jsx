import React, { useEffect, useReducer } from "react"
import { useItems } from "../hooks"

export const DividentsContext = React.createContext()

const ACTIONS = {
  ADD_DIVIDENT: "ADD_DIVIDENT",
  DELETE_DIVIDENT: "DELETE_DIVIDENT"
}

const newDivident = ({ id, name, color }) => {
  return {
    id: id,
    name: name,
    color: color,
    total: 0
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_DIVIDENT:
      return [ ...state, newDivident(action.payload) ]
    case ACTIONS.DELETE_DIVIDENT:
      return state.filter(item => item.id !== action.payload.id)
    default:
      throw new Error("Action not valid")
  }
}

export const DividentsContextProvider = ({ children }) => {
  const [dividents, dispatch] = useReducer(reducer, [])
  const {items} = useItems()

  // useEffect(() => {
  //   items.forEach(item => {
      
  //   })
  // }, [items])

  const addDivident = (name, color) => {
    if (dividents.length !== 0) {
      dispatch({ type: ACTIONS.ADD_DIVIDENT, payload: { id: dividents[dividents.length-1].id + 1, name: name, color: color } })
    } else {
      dispatch({ type: ACTIONS.ADD_DIVIDENT, payload: { id: 1, name: name, color: color } })
    }
  }

  const deleteDivident = (id) => {
    dispatch({ type: ACTIONS.DELETE_DIVIDENT, payload: { id: id }})
  }

  return (
    <DividentsContext.Provider value={{dividents,addDivident,deleteDivident}}>
      {children}
    </DividentsContext.Provider>
  )
}