import React, { useReducer } from "react"

export const ItemsContext = React.createContext()

const ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  DELETE_ITEM: "DELETE_ITEM"
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      return [ ...state, newItem(action.payload) ]
    case ACTIONS.DELETE_ITEM:
      return state.filter(item => item.id !== action.payload.id)
    default:
      throw new Error("Action not valid")
  }
}

const newItem = ({ id, name, price }) => {
  return {
    id: id,
    name: name,
    price: price,
    dividents: []
  }
}

export const ItemsContextProvider = ({ children }) => {
  const [items, dispatch] = useReducer(reducer, [])

  const addNewItem = (name, price) => {
    if (items.length !== 0) {
      dispatch({ type: ACTIONS.ADD_ITEM, payload: { id: items[items.length - 1].id + 1, name: name, price: price, } })
    } else {
      dispatch({ type: ACTIONS.ADD_ITEM, payload: { id: 1, name: name, price: price, } })
    }
  }

  const deleteItem = (id) => {
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: { id: id }})
  }

  const sumTotal = () => {
    if (items.length > 0) {
      let total = 0
      items.forEach(item => total += item.price)
      return Math.round((total + Number.EPSILON) * 100) / 100
    } else {
      return 0
    }
  }

  return (
    <ItemsContext.Provider value={{items, addNewItem, deleteItem, sumTotal}}>
      {children}
    </ItemsContext.Provider>
  )
}