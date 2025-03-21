import { createContext, useContext } from "react";

export const CartContext = createContext(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext debe ser usado con el CartContextProvider");
  }
  return context;
};