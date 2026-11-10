import { useContext } from "react";
import { DisplayToastContext } from "../contexts/DisplayToastContext";

export function useToast() {
  return useContext(DisplayToastContext)
}