import { useEffect, useState } from 'react';
import { readOrders } from './utils/firebaseUtils';


export const useOrderModule = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    const unsubscribe = readOrders((data) => {
      setState({orders: data})
    });
    return () => {
      console.log('Clean up the subscription.')
      unsubscribe();
    }
  }, [])

  return {
    orders: state.orders,
  };
}