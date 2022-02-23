import React, { useReducer } from "react"

export const DividentsContext = React.createContext()

const ACTIONS = {
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
      let newState = [ ...filteredState, ...affectedDividents].sort((a,b) => a.id - b.id)

      return newState
    default:
      throw new Error("Action not valid")
  }
}

export const DividentsContextProvider = ({ children }) => {
  const [dividents, dispatch] = useReducer(reducer, [])

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
    const filteredItems = items.filter(item => item.dividents.length > 0)

    if (dividents.length > 0 && filteredItems.length > 0) {
      updateTotals(filteredItems)
    }
  }

  return (
    <DividentsContext.Provider value={{dividents,addDivident,deleteDivident,countTotals}}>
      {children}
    </DividentsContext.Provider>
  )
}