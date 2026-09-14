import { type ReactNode, useState } from "react";
import { MobileStateContext } from "./MobileStateContext";

interface MobileStateProviderProps {
  children: ReactNode
}

export function MobileStateProvider({children}: MobileStateProviderProps) {
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  const handleDisplayMenu: () => void = () => {
    setDisplayMenu(!displayMenu);
  }

  return (
    <MobileStateContext.Provider
      value={{
        displayMenu,
        handleDisplayMenu
      }}
    >
      {children}
    </MobileStateContext.Provider>
  )
}