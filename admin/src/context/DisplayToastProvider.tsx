import { useState, type ReactNode } from "react";
import { DisplayToastContext } from "./DisplayToastContext";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import clsx from "clsx";

interface DisplayToastProviderType {
  children: ReactNode
}

export interface ToastType {
  type: 'success' | 'error' | null,
  message: string | null
}

export function DisplayToastProvider({ children }: DisplayToastProviderType) {
  const [display, setDisplay] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastType | null>({
    type: null,
    message: null
  });

  const displayToast: ( type: 'success' | 'error', message: string ) => void = ( type, message ) => {
    setDisplay(true)

    setToast(() => ({
      type,
      message
    }))

    setTimeout(() => {
      setDisplay(false);
      setToast(() => ({
        type: null,
        message: null
      }))
    }, 3000)
  }

  return (
    <DisplayToastContext.Provider
      value={{
        toast,
        setToast,
        displayToast
      }}
    >
      { children }
      
      { display && (
        <div
          className={
            clsx(
              "fixed flex items-center gap-4 top-0 right-0 m-8 bg-white py-4 px-6 shadow-md rounded-md",
              {
                "outline-2 outline-green-500": toast?.type === 'success',
                "outline-2 outline-red-500": toast?.type === 'error'
              }
            )
          }
        >
          { toast?.type === 'success' ? (
            <span className="p-1.5 bg-green-500 rounded-full text-white">
              <FaCheck size={10} />
            </span>
          ) : toast?.type === 'error' && (
            <span className="p-1.5 bg-red-500 rounded-full text-white">
              <ImCross size={10} />
            </span>
          ) }
          { toast?.message }
        </div>
      ) }
    </DisplayToastContext.Provider>
  )
}