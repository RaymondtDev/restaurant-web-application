import { createContext, type Dispatch, type SetStateAction } from "react";
import type { ToastType } from "./DisplayToastProvider";

interface DisplayToastContextType {
  toast: ToastType | null,
  setToast: Dispatch<SetStateAction<ToastType | null>>,
  displayToast: ( type: 'success' | 'error', message: string) => void
}

export const DisplayToastContext = createContext<DisplayToastContextType | undefined>(undefined)