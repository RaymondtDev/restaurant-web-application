import { useContext } from "react";
import { DisplayToastContext } from "../context/DisplayToastContext";

export function useToast() {
  return useContext(DisplayToastContext)
}