import { useState, type ReactNode } from "react";
import { DisplayToastContext } from "./DisplayToastContext";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { ImCross } from "react-icons/im";

interface DisplayToastProviderType {
  children: ReactNode
}

export interface ToastType {
  code: number | null,
  success: boolean | null,
  message: string | null
}

export function DisplayToastProvider({ children }: DisplayToastProviderType) {
  const [display, setDisplay] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastType | null>({
    code: null,
    success: null,
    message: null,
  });

  const displayToast: ( code: number, success: boolean, message: string ) => void = ( code, success, message ) => {
    setDisplay(true)

    setToast(() => ({
      code,
      success,
      message
    }))

    setTimeout(() => {
      setDisplay(false);
      setToast(() => ({
        code: null,
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
        <div className="fixed flex items-center gap-4 top-0 right-0 m-12 bg-white px-4 py-4 md:px-6 shadow-md rounded-md z-100">
          { toast?.code === 200 ? (
            <span className="p-1.5 bg-green-500 rounded-full text-white">
              <FaCheck size={10} />
            </span>
          ) : toast?.code === 400 ? (
            <span className="p-1.5 bg-red-500 rounded-full text-white">
              <ImCross size={10} />
            </span>
          ) : toast?.code === 500 && (
            <span className="p-1.5 bg-yellow-500 rounded-full text-white">
              <FaExclamation size={10} />
            </span>
          )}
          { toast?.message }
        </div>
      ) }
    </DisplayToastContext.Provider>
  )
}