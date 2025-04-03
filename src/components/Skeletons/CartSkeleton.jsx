import Container from "../Layout/Container";
import TitleSection from "../TitleSection";

const CartSkeleton = () => {
  // Skeleton de la lista de productos
  const skeletonItems = [1, 2, 3];

  return (
    <Container className="flex flex-col-reverse md:flex-row gap-8 items-center md:items-start">
      {/* Skeleton de la lista de productos */}
      <article className="w-full md:w-2/3 xl:w-8/12 grid shadow-lg bg-slate-50 p-6 animate-pulse">
        <TitleSection title="Carrito de Compras" className="border-b pb-4 mb-8" />
        
        {/* Skeleton de los productos en el carrito */}
        <ul className="flex flex-col gap-6">
          {skeletonItems.map((item) => (
            <li key={item} className="flex items-center gap-4 border-b pb-4">
              {/* Imagen */}
              <div className="w-28 h-28 bg-slate-200 rounded"></div>
              
              {/* Información */}
              <div className="flex-1">
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 rounded"></div>
                  <div className="w-8 h-6 bg-slate-200 rounded"></div>
                  <div className="w-6 h-6 bg-slate-200 rounded"></div>
                </div>
              </div>
              
              {/* Precio */}
              <div className="w-20 h-6 bg-slate-200 rounded"></div>
            </li>
          ))}
        </ul>
        
        {/* Botón de vaciar */}
        <div className="w-52 md:w-72 h-12 bg-slate-200 rounded mt-12 self-start"></div>
      </article>
      
      {/* Skeleton del resumen */}
      <article className="shadow-lg bg-slate-50 p-6 w-full md:w-1/3 xl:w-5/12 flex flex-col gap-6 animate-pulse">
        <TitleSection title="Resumen" className="border-b pb-4" />
        
        <section className="space-y-4">
          {/* Cantidad de productos */}
          <div className="flex justify-between">
            <div className="h-6 bg-slate-200 rounded w-20"></div>
            <div className="h-6 bg-slate-200 rounded w-16"></div>
          </div>
          
          {/* Métodos de entrega */}
          <div className="pt-4 space-y-3">
            <div className="h-6 bg-slate-200 rounded w-40 mb-3"></div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 rounded-full"></div>
              <div className="h-5 bg-slate-200 rounded w-28"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 rounded-full"></div>
              <div className="h-5 bg-slate-200 rounded w-40"></div>
            </div>
          </div>
          
          {/* Dirección */}
          <div className="pt-2">
            <div className="h-5 bg-slate-200 rounded w-32 mb-2"></div>
            <div className="h-10 bg-slate-200 rounded w-full"></div>
          </div>
          
          {/* Resumen de precios */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <div className="h-5 bg-slate-200 rounded w-16"></div>
              <div className="h-5 bg-slate-200 rounded w-24"></div>
            </div>
            
            <div className="flex justify-between">
              <div className="h-5 bg-slate-200 rounded w-28"></div>
              <div className="h-5 bg-slate-200 rounded w-24"></div>
            </div>
            
            <div className="flex justify-between pt-2 border-t">
              <div className="h-7 bg-slate-200 rounded w-24"></div>
              <div className="h-7 bg-slate-200 rounded w-32"></div>
            </div>
          </div>
        </section>
        
        {/* Botón de comprar */}
        <div className="h-12 bg-slate-800 rounded w-full mt-4"></div>
      </article>
    </Container>
  );
};

export default CartSkeleton;