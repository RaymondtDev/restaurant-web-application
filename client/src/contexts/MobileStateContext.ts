import { createContext } from "react";

interface MobileStateContextType {
  displayMenu: boolean,
  handleDisplayMenu: () => void
  setDisplayMenu: (value: boolean) => void
}

export const MobileStateContext = createContext<MobileStateContextType | undefined>(undefined);
