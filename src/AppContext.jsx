import { createContext, useEffect, useState } from 'react';
import { readOrders, readVersion, writeVersion } from './utils/firebaseUtils';
import {un} from '@firebase/database'


export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [state, setState] = useState({});

  useEffect(() => {
    readVersion((data) => {
      setState({...state, version: data})
    });
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
