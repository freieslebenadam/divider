import React, { useEffect, useReducer } from "react"
import { useLocalStorage } from "../hooks"

export const ItemsContext = React.createContext()

const ACTIONS = {
  SET_ITEMS: "SET_ITEMS",
  ADD_ITEM: "ADD_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
  UPDATE_DIVIDENTS: "UPDATE_DIVIDENTS",
  PURGE_DIVIDENT: "PURGE_DIVIDENT",
  PURGE_ALL_ITEMS: "PURGE_ALL_ITEMS"
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_ITEMS:
      return action.payload
    case ACTIONS.ADD_ITEM:
      return [ ...state, newItem(action.payload) ]
    case ACTIONS.DELETE_ITEM:
      const prev = [...state]
      return prev.filter(item => item.id !== action.payload.id)
    case ACTIONS.UPDATE_DIVIDENTS:
      const prevState = [...state]
      const id = action.payload.id
      const dividents = action.payload.dividents
      return prevState.map(prev => {
        if (prev.id === id) {
          return {...prev, dividents}
        } else {
          return prev
        }
      })
    case ACTIONS.PURGE_DIVIDENT:
      return state.map(prev => {
        if (prev.dividents.includes(action.payload.dividentId)) {
          return {
            ...prev, 
            dividents: prev.dividents.filter(id => id !== action.payload.dividentId)}
        } else {
          return prev
        }
      })
    case ACTIONS.PURGE_ALL_ITEMS:
      return []
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
  
  const [localStorageItems, setLocalStorageItems] = useLocalStorage("divider_items", [])

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_ITEMS, payload: localStorageItems })
  }, [])

  useEffect(() => {
    setLocalStorageItems(items)
  }, [items])

  const addNewItem = (name, price) => {
    if (items.length !== 0) {
      dispatch({ type: ACTIONS.ADD_ITEM, payload: { id: items[items.length - 1].id + 1, name, price, } })
    } else {
      dispatch({ type: ACTIONS.ADD_ITEM, payload: { id: 1, name, price, } })
    }
  }

  const deleteItem = (id) => {
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: { id }})
  }

  const updateDividents = (id, dividents) => {
    dispatch({ 
      type: ACTIONS.UPDATE_DIVIDENTS, 
      payload: { id, dividents: dividents.sort((a,b) => a-b) }
    })
  }

  const purgeDivident = (dividentId) => {
    dispatch({ type: ACTIONS.PURGE_DIVIDENT, payload: { dividentId } })
  }

  const purgeAllItems = () => {
    dispatch({ type: ACTIONS.PURGE_ALL_ITEMS })
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
    <ItemsContext.Provider value={{items, addNewItem, deleteItem, sumTotal, updateDividents, purgeDivident, purgeAllItems}}>
      {children}
    </ItemsContext.Provider>
  )
}