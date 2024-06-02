import { createContext, useEffect, useState } from 'react';
import { readOrders } from './utils/firebaseUtils';


export const useOrderModule = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    readOrders((data) => {
      setState({orders: data})
    })
  }, [])

  return {
    orders: state.orders,
  };
}