import { useContext } from "react";
import { CartDisplayStateContext } from "../contexts/CartDisplayStateContext";

export function UseCartDisplayState() {
  return useContext(CartDisplayStateContext);
}