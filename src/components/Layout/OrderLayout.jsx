import { useCartContext } from "../../provider/CartContext";
import OrderContainer from "../../containers/OrderContainer";
import Button from "../Button";
import OrderSkeleton from "../Skeletons/OrderSkeleton";
import TitleSection from "../TitleSection";
import Container from "./Container";

const OrderLayout = ({ orderValues }) => {
  const { toggleOrderExpansion } = useCartContext();
  const { orders, loading, error, expandedOrders, productImages } = orderValues;

  // Formato de fecha para mostrar
  const formatDate = (timestamp) => {
    if (!timestamp) return "Fecha pendiente";
    
    try {
      const date = timestamp.toDate();
      return new Intl.DateTimeFormat('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (err) {
      console.error("Error al formatear la fecha:", err);
      return "Fecha inválida";
    }
  };

  const values = {
    orders, // Ya no usamos ordersSorted
    expandedOrders, 
    productImages, 
    toggleOrderExpansion, 
    formatDate
  }

  // Mostrar la carga de las ordenes
  if (loading) {
    return (
      <OrderSkeleton />
    );
  }

  // Si hay un error, mostrar mensaje de error y botón para reintentar
  if (error) {
    return (
      <Container className="min-h-screen py-12">
        <TitleSection title="Mis Pedidos" className="mb-8" />
        <article className="flex flex-col items-center justify-center h-40">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} text="Reintentar" />
        </article>
      </Container>
    );
  }

  // Verificación de si no hay órdenes
  if (orders.length === 0) {
    return (
      <Container className="min-h-screen py-12">
        <TitleSection title="Mis Pedidos" className="mb-8" />
        <article className="flex flex-col items-center justify-center py-20">
          <img 
            src="/shopping-bag-line.svg" 
            alt="No hay pedidos" 
            className="w-40 h-40 mb-6"
          />
          <h2 className="text-2xl font-medium mb-4">No has realizado ningún pedido</h2>
          <p className="text-gray-500 mb-8 text-center max-w-md">
            Parece que aún no has realizado ninguna compra. ¡Explora nuestros productos y encuentra algo que te guste!
          </p>
          <Button 
            href="/category" 
            text="Ver Productos" 
            className="px-8 py-3 text-lg"
          />
        </article>
      </Container>
    );
  }

  return (
    <OrderContainer values={values} />
  );
};

export default OrderLayout;