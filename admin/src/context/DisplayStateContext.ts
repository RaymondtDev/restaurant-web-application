import { createContext, type Dispatch, type SetStateAction } from 'react';

interface DisplayStateContextType {
  display: boolean,
  setDisplay: Dispatch<SetStateAction<boolean>>
  handleDisplay: () => void
}

export const DisplayStateContext = createContext<DisplayStateContextType | undefined>(undefined)