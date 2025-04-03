import Container from "../Layout/Container"
import TitleSection from "../TitleSection"


const OrderSkeleton = () => {
  const orderSkeletons = [1, 2, 3];
  const orderProductSkeletons = [1, 2];

  return (
      <Container className="min-h-screen py-12">
        <TitleSection title="Mis Pedidos" className="mb-8" />
        <div className="space-y-6">
          {/* Skeleton de las órdenes */}
          {orderSkeletons.map((skeleton) => (
            <div 
              key={skeleton} 
              className="bg-slate-50 shadow-lg rounded-lg overflow-hidden p-6 animate-pulse"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Skeleton de las imágenes */}
                <div className="flex -space-x-4 flex-shrink-0">
                  {orderSkeletons.map((img) => (
                    <div 
                      key={img}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-200"
                      style={{ zIndex: 30 - img }}
                    />
                  ))}
                </div>
                
                {/* Skeleton de la información principal */}
                <div className="flex-grow flex flex-col md:flex-row md:justify-between items-start md:items-center w-full gap-2 md:gap-4">
                  <div className="w-full md:w-1/3">
                    <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-2 md:mt-0">
                    <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                    <div className="h-7 bg-slate-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
              
              <div className="w-full h-1 bg-slate-100 my-4"></div>
              
              {/* Skeleton de productos */}
              <div className="space-y-4">
                {orderProductSkeletons.map((product) => (
                  <div key={product} className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                    </div>
                    <div className="w-16 h-5 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
  )
}

export default OrderSkeleton
