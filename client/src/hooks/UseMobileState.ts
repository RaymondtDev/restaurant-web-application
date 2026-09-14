import { useContext } from "react";
import { MobileStateContext } from "../contexts/MobileStateContext";

export function useMobileState() {
  return useContext(MobileStateContext);
}