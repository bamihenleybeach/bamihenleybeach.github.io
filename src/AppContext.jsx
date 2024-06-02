import { createContext, useEffect, useState } from 'react';
import { readOrders, readVersion, writeVersion } from './utils/firebaseUtils';


export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [state, setState] = useState({});

  useEffect(() => {
    readOrders((data) => {
      setState({...state, orders: data})
    })
  }, [])

  return (
    <AppContext.Provider value={{state, setState}}>
      {children}
    </AppContext.Provider>
  )
}
