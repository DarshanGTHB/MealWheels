import React from 'react'
import StoreContext from './storeContext'
import { food_list } from '../assets/frontend_assets/assets'

const StoreProvide = ({children}) => {
    let foodList = food_list; 
  return (
    <StoreContext.Provider value={{foodList}}>
        {children}
    </StoreContext.Provider>
  )
}

export default StoreProvide