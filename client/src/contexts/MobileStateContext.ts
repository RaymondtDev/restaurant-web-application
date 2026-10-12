import { createContext, type Dispatch, type SetStateAction } from "react";

interface MobileStateContextType {
  displayMenu: boolean,
  handleDisplayMenu: () => void
  setDisplayMenu: Dispatch<SetStateAction<boolean>>
}

export const MobileStateContext = createContext<MobileStateContextType | undefined>(undefined);
