import { createContext } from "react";

interface MobileStateContextType {
  displayMenu: boolean,
  handleDisplayMenu: () => void
}

export const MobileStateContext = createContext<MobileStateContextType | undefined>(undefined);
