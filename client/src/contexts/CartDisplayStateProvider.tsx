import { useState, type ReactNode } from "react";
import { CartDisplayStateContext } from "./CartDisplayStateContext";

function CartDisplayStateProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const handleDisplayCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartDisplayStateContext.Provider
      value={{
        isCartOpen,
        handleDisplayCart,
        setIsCartOpen
      }}
    >
      { children }
    </CartDisplayStateContext.Provider>
  );
}

export default CartDisplayStateProvider;