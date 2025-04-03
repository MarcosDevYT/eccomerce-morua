"use client";

import { useEffect, useState, useRef } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";
import { getOrdersBySessionId, getProductById } from "../firebase";

export const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceFormated, setTotalPriceFormated] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const [isCardAndSessionReady, setIsCardAndSessionReady] = useState(false);
  const initialized = useRef(false);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [productImages, setProductImages] = useState({});

  //
  //
  // useEffect para cargar el carrito del localStorage y generar un sessionId al montar el componente
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      setIsCardAndSessionReady(false);
      console.log("Inicializando carrito desde localStorage");

      // Recuperar o crear un sessionId
      const storedSessionId = localStorage.getItem("sessionId");
      if (storedSessionId) {
        // Utilizar el sessionId almacenado
        console.log("Session ID encontrado:", storedSessionId);
        setSessionId(storedSessionId);
      } else {
        // Crear un nuevo sessionId
        const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        console.log("Nuevo Session ID creado:", newSessionId);
        setSessionId(newSessionId);
        localStorage.setItem("sessionId", newSessionId);
      }

      // Cargar el carrito desde localStorage
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        // Parsear el carrito almacenado
        const parsedCart = JSON.parse(storedCart);
        console.log("Carrito cargado:", parsedCart);

        // Validar que el carrito sea un array y tenga elementos
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCartList(parsedCart);
        }
        
      }
      setIsCardAndSessionReady(true);
    } catch (err) {
      // Manejar errores al cargar el carrito desde localStorage
      console.error("Error al inicializar desde localStorage:", err);
      localStorage.removeItem("cartItems");
      setIsCardAndSessionReady(true);
    }
  }, []);

  //
  //
  // useEffect para actualizar localStorage cuando el carrito cambie
  useEffect(() => {
    // No actualizar localStorage durante la carga inicial
    if (!initialized.current) return;

    // Guardar el carrito en localStorage
    if (cartList.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartList));
    } else if (localStorage.getItem("cartItems")) {
      localStorage.removeItem("cartItems");
    }

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

  //
  //
  // Función auxiliar para ordenar por fecha
  const sortOrdersByDate = (orders) => {
    return [...orders].sort((a, b) => {
      if (!a.Fecha) return 1;
      if (!b.Fecha) return -1;

      const dateA = a.Fecha.toDate ? a.Fecha.toDate() : new Date(a.Fecha);
      const dateB = b.Fecha.toDate ? b.Fecha.toDate() : new Date(b.Fecha);

      return dateB - dateA;
    });
  };

  //
  //
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

  //
  //
  // Funcion para vaciar el carrito
  const clearCart = () => {
    try {
      // Setear el carrito con un array vacio
      setCartList([]);
      localStorage.removeItem("cartItems");
    } catch (err) {
      console.log("Error limpiando el carrito", err)
      toast.error("Error al vaciar el carrito");
    }
  };

  //
  //
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

  //
  //
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

  //
  //
  // Función para cargar órdenes
  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      if (!sessionId) {
        setOrdersLoading(false);
        return;
      }

      // Obtener órdenes del usuario por sessionId
      const userOrders = await getOrdersBySessionId(sessionId);

      // Ordenar por fecha (más recientes primero)
      const sortedOrders = sortOrdersByDate(userOrders);
      setOrders(sortedOrders);

      // Inicializar estados de expansión
      const initialExpandedState = {};
      sortedOrders.forEach(order => {
        initialExpandedState[order.id] = false;
      });
      setExpandedOrders(initialExpandedState);

      // Cargar imágenes para la vista previa
      await loadOrderImages(sortedOrders);

      setOrdersLoading(false);
    } catch (err) {
      console.error("Error al cargar pedidos:", err);
      setOrdersError("No se pudieron cargar los pedidos. Intenta nuevamente más tarde.");
      setOrdersLoading(false);
    }
  };

  //
  //
  // Función para cargar imágenes de productos
  const loadOrderImages = async (orders) => {
    const imagesMap = {};
    for (const order of orders) {
      imagesMap[order.id] = [];
      const previewItems = order.items.slice(0, 3);
      for (const item of previewItems) {
        try {
          const productDetail = await getProductById(item.id);
          if (productDetail && productDetail.src) {
            imagesMap[order.id].push({
              id: item.id,
              src: productDetail.src,
              nombre: item.nombre
            });
          }
        } catch (error) {
          console.error("Error al cargar la imagen del producto:", error);
        }
      }
    }
    setProductImages(imagesMap);
  };

  //
  //
  // Función para alternar la expansión de una orden
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };


  //
  //
  // Valores para el contexto
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
    sessionId,
    isCardAndSessionReady,
    orders,
    ordersLoading,
    ordersError,
    expandedOrders,
    productImages,
    loadOrders,
    toggleOrderExpansion,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};