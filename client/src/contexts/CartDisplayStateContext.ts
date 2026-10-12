import { createContext, type Dispatch, type SetStateAction } from 'react';

interface CartDisplayStateContextType {
  isCartOpen: boolean,
  setIsCartOpen: Dispatch<SetStateAction<boolean>>,
  handleDisplayCart: () => void,
}

export const CartDisplayStateContext = createContext<CartDisplayStateContextType | undefined>(undefined);