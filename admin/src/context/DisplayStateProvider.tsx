import { useState, type ReactNode } from "react";
import { DisplayStateContext } from "./DisplayStateContext";

interface DisplayStateProviderType {
  children: ReactNode
}

export function DisplayStateProvider({ children }: DisplayStateProviderType) {
  const [display, setDisplay] = useState<boolean>(false)

  const handleDisplay: () => void = () => {
    setDisplay(!display)
  }

  return (
    <DisplayStateContext.Provider
      value={{
        display,
        setDisplay,
        handleDisplay
      }}
    >
      { children }
    </DisplayStateContext.Provider>
  );
}

export default DisplayStateProvider;