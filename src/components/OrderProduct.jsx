import { useState, useEffect } from 'react';
import { getProductById } from '../firebase';

const OrderProduct = ({ item }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await getProductById(item.id);
        setProductDetails(product);
      } catch (error) {
        console.error("Error al cargar detalles del producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [item.id]);

  // Función para calcular el subtotal del item
  const subtotal = parseFloat(item.precio * item.cantidad).toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <article className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b">
      {/* Imagen del producto */}
      <aside className="w-16 h-24 border-2 rounded-md border-slate-100 flex-shrink-0">
        {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
        ) : (
          productDetails?.src ? (
            <img 
              src={productDetails.src} 
              alt={item.nombre} 
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
              <span className="text-gray-400 text-xs">Sin imagen</span>
            </div>
          )
        )}
      </aside>

      {/* Detalles del producto */}
      <div className="flex-grow">
        <h4 className="font-medium">{item.nombre}</h4>
        <div className="flex flex-col sm:flex-row sm:justify-between text-base text-gray-600">
          Precio unitario: ${parseFloat(item.precio).toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
        
        {!loading && productDetails?.categoria && (
          <div className="mt-1">
            <span className="text-xs px-2 py-0.5 bg-black text-white rounded-full">
              {productDetails.categoria}
            </span>
            {productDetails.estilo && (
              <span className="text-xs px-2 py-0.5 bg-[#DBB98E] text-black rounded-full ml-1">
                {productDetails.estilo}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Precio total del producto */}
      <div className="text-right font-medium">
        <p>Cantidad: {item.cantidad}</p>
        <p>${subtotal}</p>
      </div>
    </article>
  );
};

export default OrderProduct;
