"use client";

import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";

export const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceFormated, setTotalPriceFormated] = useState(0);

  // useEffect para vigilar el carrito cada vez que se actualice
  useEffect(() => {
    // Actualizar el total de items y el precio total del carrito
    const newTotalItems = cartList.reduce((total, item) => total + item.cantidad, 0);
    const newTotalPrice = cartList.reduce((total, item) => total + item.precio * item.cantidad, 0);

    // Setear los valores
    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
    setTotalPriceFormated(formatPrice(newTotalPrice));

  }, [cartList]);

  // Formateador de precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };


  // Funcion para agregar al carrito
  const addToCart = (producto, id) => {
    try {
      // Validar que el producto no esté agregado ya en el carrito
      const existingItem = cartList.find(item => item.id === id);

      if (existingItem) {
        // Si el producto existe, actualizamos la cantidad
        setCartList(prevCart => prevCart.map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        ));
      } else {
        // Si el producto no existe, lo agregamos
        setCartList(prevCart => [...prevCart, { ...producto, id, cantidad: 1 }]);
        toast.success(`${producto.nombre} se agregó al carrito!`);
      }
      
    } catch (err) {
      console.error("Error agregando producto al carrito:", err);
      toast.error("Hubo un error al agregar el producto al carrito.");
    }
  };

  // Funcion para vaciar el carrito
  const clearCart = () => {
    try {
      // Setear el carrito con un array vacio
      setCartList([]);
      toast.success("Carrito vaciado.");
    } catch (err) {
      console.log("Error limpiando el carrito", err)
      toast.error("Error al vaciar el carrito");
    }
  };

  // Funcion para eliminar un producto del carrito
  const deleteCart = (id) => {
    try {
      // Encontrar el producto del carrito
      const productoAEliminar = cartList.find(item => item.id === id);

      // Si el producto no existe, no hacemos nada
      if (!productoAEliminar) return;

      // Eliminar el producto del carrito y filtrar los demás productos
      setCartList(prevCart => prevCart.filter(item => item.id !== id));
      toast.success("Producto eliminado del carrito.");
    } catch (err) {
      console.error("Error eliminando producto del carrito:", err);
      toast.error("Hubo un error al eliminar el producto.");
    }
  };

  // Funcion para modificar la cantidad del producto pasandole un valor por los parametros
  const cantidadCart = (id, cantidad) => {
    try {
      // Filtrar los productos que no tienen la misma ID que el producto a modificar y que no tienen una cantidad menor a 0
      // Si encuentra el producto modificar la cantidad segun el parametro que se le pase
      // Si la cantidad es menor o igual a cero filtramos y devolvemos el array sin ese producto
      const updatedCart = cartList.map(item => item.id === id
        ? { ...item, cantidad: Math.max(0, item.cantidad + cantidad) }
        : item).filter(item => item.cantidad > 0);
      

      // Actualizar el carrito con el nuevo array de productos
      setCartList(updatedCart);
    } catch (err) {
      console.error("Error modificando cantidad:", err);
      toast.error("Hubo un error al modificar la cantidad.");
    }
  };

  const value = {
    cartList,
    addToCart,
    deleteCart,
    clearCart,
    cantidadCart,
    totalItems,
    formatPrice,
    totalPrice,
    totalPriceFormated,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};