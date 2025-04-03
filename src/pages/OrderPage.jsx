import { useEffect } from "react";
import OrderLayout from "../components/Layout/OrderLayout";
import { useCartContext } from "../provider/CartContext";

const OrderPage = () => {
  const { loadOrders, orders, ordersLoading, ordersError, expandedOrders, setExpandedOrders, productImages } = useCartContext();

  // Cargar órdenes al montar el componente
  useEffect(() => {
    loadOrders();
  }, []);

  const orderValues = {
    orders,
    loading: ordersLoading,
    error: ordersError,
    expandedOrders,
    setExpandedOrders,
    productImages
  };

  return (
    <main className="px-6 pt-4 min-h-screen md:px-16 lg:px-28">
      <OrderLayout orderValues={orderValues} />
    </main>
  );
};

export default OrderPage;
