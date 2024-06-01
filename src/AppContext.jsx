import { createContext, useEffect, useState } from 'react';
import { readVersion, writeVersion } from './utils/firebaseUtils';
import {un} from '@firebase/database'


export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [state, setState] = useState({});

  useEffect(() => {
    readVersion((data) => {
      setState({version: data})
    });
  }, [])

  return (
    <AppContext.Provider value={{state, setState}}>
      {children}
    </AppContext.Provider>
  )
}
