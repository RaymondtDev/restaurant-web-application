import clsx from "clsx";
import { UseCartDisplayState } from "../hooks/UseCartDisplayState";
import { useEffect, useRef } from "react";

function CartModal() {
  const cartState = UseCartDisplayState();
  const cartElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartElement.current && !cartElement.current.contains(event.target as Node)) {
        cartState?.setIsCartOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartState]);

  return (
    <div ref={cartElement} className={clsx(
      "mx-4 bg-white shadow-md rounded-md p-3 absolute top-full right-0 mt-2 w-1/2 md:w-1/3",
      {
        "flex flex-col" : cartState?.isCartOpen,
        "hidden" : !cartState?.isCartOpen
      }
    )}>
      <h1>Cart</h1>
      <ul>
        <li>Cart Item</li>
        <li>Cart Item</li>
        <li>Cart Item</li>
        <li>Cart Item</li>
        <li>Cart Item</li>
      </ul>
    </div>
  );
}

export default CartModal;