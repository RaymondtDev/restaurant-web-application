import { useContext } from "react";
import { DisplayStateContext } from "../context/DisplayStateContext";

export function useDisplayState() {
  return useContext(DisplayStateContext)
}