import React, { useContext, useReducer, useEffect, useState } from 'react'


const AppContext = React.createContext()

const initialState = {
    navTab:"Explore"
}

const AppProvider = ({ children }) => {
    const [navTab, setNavTab] = useState("Explore")
    return (
        <AppContext.Provider
          value={{
            navTab,
            setNavTab
          }}
        >
          {children}
        </AppContext.Provider>
      )
}







export const useGlobalContext = () => {
    return useContext(AppContext)
  }
  
  export { AppContext, AppProvider }