import React, { useReducer, useEffect } from "react"
import { useLocalStorage } from "../hooks"

export const DividentsContext = React.createContext()

const ACTIONS = {
  SET_DIVIDENTS: "SET_DIVIDENTS",
  ADD_DIVIDENT: "ADD_DIVIDENT",
  DELETE_DIVIDENT: "DELETE_DIVIDENT",
  UPDATE_TOTALS: "UPDATE_TOTALS",
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
    case ACTIONS.SET_DIVIDENTS:
      return action.payload
    case ACTIONS.ADD_DIVIDENT:
      return [ ...state, newDivident(action.payload) ]
    case ACTIONS.DELETE_DIVIDENT:
      return state.filter(item => item.id !== action.payload.id)
    case ACTIONS.UPDATE_TOTALS:
      let affectedDividents = []
      action.payload.items.forEach(item => {
        item.dividents.forEach(divId => {
          let dividedPrice = item.price / item.dividents.length
          let dividentInQuestion = state.find(divident => divident.id === divId)
          let newDivident = {...dividentInQuestion, total: dividedPrice}
          if (affectedDividents.find(div => div.id === newDivident.id)) {
            affectedDividents.find(div => div.id === newDivident.id).total += newDivident.total
          } else {
            affectedDividents =  [...affectedDividents, {...newDivident}]
          }
        })
      })
      
      let filteredState = [...state].filter(divident => !(affectedDividents.find(div => div.id === divident.id)))
      filteredState = filteredState.map(div => ({ ...div, total: 0 }))
      let newState = [ ...filteredState, ...affectedDividents].sort((a,b) => a.id - b.id)

      return newState
    default:
      throw new Error("Action not valid")
  }
}

export const DividentsContextProvider = ({ children }) => {
  const [dividents, dispatch] = useReducer(reducer, [])

  const [localStorageDividents, setLocalStorageDividents] = useLocalStorage("divider_dividents", [])

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_DIVIDENTS, payload: localStorageDividents })
  }, [])

  useEffect(() => {
    setLocalStorageDividents(dividents)
  }, [dividents])

  const addDivident = (name, color) => {
    if (dividents.length !== 0) {
      dispatch({ type: ACTIONS.ADD_DIVIDENT, payload: { id: dividents[dividents.length-1].id + 1, name, color } })
    } else {
      dispatch({ type: ACTIONS.ADD_DIVIDENT, payload: { id: 1, name, color } })
    }
  }

  const deleteDivident = (id) => {
    dispatch({ type: ACTIONS.DELETE_DIVIDENT, payload: { id }})
  }

  const updateTotals = (items) => {
    dispatch({ type: ACTIONS.UPDATE_TOTALS, payload: { items }})
  }

  const countTotals = (items) => {
    updateTotals(items)
  }

  return (
    <DividentsContext.Provider value={{dividents,addDivident,deleteDivident,countTotals}}>
      {children}
    </DividentsContext.Provider>
  )
}