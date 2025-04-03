import Container from "../components/Layout/Container";
import OrderProduct from "../components/OrderProduct";
import TitleSection from "../components/TitleSection";


const OrderContainer = ({ values }) => {
  const { orders, expandedOrders, productImages, toggleOrderExpansion, formatDate } = values;

  return (
    <Container className="min-h-screen py-12">
      <TitleSection title="Mis Pedidos" className="mb-8" />
      
      <article className="space-y-6">
        {orders.map(order => (
          <section key={order.id} className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
            {/* Cabecera */}
            <article 
              className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 cursor-pointer"
              onClick={() => toggleOrderExpansion(order.id)}
            >
              {/* Imágenes */}
              <div className="flex -space-x-4 flex-shrink-0">
                {productImages[order.id]?.map((product, idx) => (
                  <figure
                    key={product.id} 
                    className="w-10 h-14 md:w-12 md:h-16 border-2 rounded-md border-slate-100 overflow-hidden"
                    style={{ zIndex: 30 - idx }}
                  >
                    <img 
                      src={product.src} 
                      alt={product.nombre} 
                      className="w-full h-full object-cover"
                    />
                  </figure>
                ))}
                {order.items.length > 3 && (
                  <div 
                    className="w-10 h-14 md:w-12 md:h-16 border-2 rounded-md border-white bg-slate-200 flex items-center justify-center text-gray-500 font-medium"
                    style={{ zIndex: 1 }}
                  >
                    +{order.items.length - 3}
                  </div>
                )}
              </div>
              
              {/* Información */}
              <div className="flex-grow flex flex-col md:flex-row md:justify-between items-start md:items-center w-full gap-2 md:gap-4">
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium">Pedido #{order.id.slice(-6)}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.Fecha)}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <p className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Pagado
                  </p>
                  
                  <p className="text-2xl whitespace-nowrap">
                    ${order.total.toLocaleString('es-AR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                  
                  <button 
                    className="cursor-pointer ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOrderExpansion(order.id);
                    }}
                  >
                    <img 
                      src="/arrow-down.png" 
                      alt="Expandir/Colapsar" 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        expandedOrders[order.id] ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </article>
            
            {/* Contenido */}
            {expandedOrders[order.id] && (
              <div className="border-t border-gray-200 p-4 md:p-6">
                
                {/* Lista de productos */}
                <h4 className="text-2xl mb-3 text-gray-800">Productos:</h4>
                <section>
                  {order.items.map((item, index) => (
                    <OrderProduct key={index} item={item} />
                  ))}
                </section>
                
                {/* Resumen de precios */}
                <aside className="border-t pt-4">
                  <h4 className="text-lg font-medium mb-3">Resumen de compra:</h4>
                  
                  <div className="space-y-2">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600">Subtotal productos:</p>
                      <p>${order.subtotal.toLocaleString('es-AR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</p>
                    </div>
                    
                    {/* Costo de envío si aplica */}
                    {order.deliveryType === 'delivery' && (
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Costo de envío:</p>
                        <p>${(order.total - order.subtotal).toLocaleString('es-AR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}</p>
                      </div>
                    )}
                    
                    {/* Método de entrega */}
                    <div className="pt-2 border-t">
                      <p className="text-gray-600">
                        Método de entrega: 
                        <span className="ml-1 font-medium text-black">
                          {order.deliveryType === 'pickup' ? 'Retiro en local' : 'Envío a domicilio'}
                        </span>
                      </p>
                      
                      {order.deliveryType === 'delivery' && (
                        <p className="text-gray-600 mt-1">
                          Dirección: <span className="text-black">{order.address || order.Direccion}</span>
                        </p>
                      )}
                    </div>
                    
                    {/* Total final */}
                    <div className="flex justify-between items-center pt-3 border-t mt-2">
                      <p className="text-2xl font-medium">Total:</p>
                      <p className="text-3xl">${order.total.toLocaleString('es-AR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</p>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </section>
        ))}
      </article>
    </Container>
  )
}

export default OrderContainer
