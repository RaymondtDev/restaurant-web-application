import { useState, type ReactNode } from "react";
import { DisplayToastContext } from "./DisplayToastContext";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import clsx from "clsx";

interface DisplayToastProviderType {
  children: ReactNode
}

export interface ToastType {
  success: boolean | null,
  message: string | null
}

export function DisplayToastProvider({ children }: DisplayToastProviderType) {
  const [display, setDisplay] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastType | null>({
    success: null,
    message: null,
  });

  const displayToast: ( success: boolean, message: string ) => void = ( success, message ) => {
    setDisplay(true)

    setToast(() => ({
      success,
      message
    }))

    setTimeout(() => {
      setDisplay(false);
      setToast(() => ({
        success: null,
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
                "outline-2 outline-green-500": toast?.success,
                "outline-2 outline-red-500": !toast?.success
              }
            )
          }
        >
          { toast?.success ? (
            <span className="p-1.5 bg-green-500 rounded-full text-white">
              <FaCheck size={10} />
            </span>
          ) : !toast?.success && (
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