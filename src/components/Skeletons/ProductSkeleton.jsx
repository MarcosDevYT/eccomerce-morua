import Container from "../Layout/Container";

const ProductSkeleton = () => {
  return (
    <Container className="flex flex-col-reverse md:flex-row gap-16 items-center md:items-start animate-pulse">
      {/* Skeleton de la imagen a la izquierda */}
      <article className="md:w-2/4 grid place-items-center">
        <div className="h-[500px] w-full bg-slate-200 object-contain rounded-lg"></div>
      </article>

      {/* Skeleton de la información a la derecha */}
      <article className="w-full md:w-3/4 mt-2 flex flex-col gap-4">
        {/* Skeleton del título y ID */}
        <div className="flex justify-between">
          <div className="h-8 bg-slate-200 rounded w-2/3"></div>
          <div className="h-6 bg-slate-200 rounded w-1/5"></div>
        </div>

        {/* Skeleton del precio */}
        <div className="h-6 bg-slate-200 rounded w-24"></div>

        {/* Skeleton de la descripción (múltiples líneas) */}
        <div className="space-y-2">
          <div className="h-5 bg-slate-200 rounded w-full"></div>
          <div className="h-5 bg-slate-200 rounded w-11/12"></div>
          <div className="h-5 bg-slate-200 rounded w-4/5"></div>
          <div className="h-5 bg-slate-200 rounded w-3/4"></div>
        </div>

        {/* Skeleton de las etiquetas */}
        <div className="flex gap-2">
          <div className="h-8 bg-slate-300 rounded-full w-24"></div>
          <div className="h-8 bg-slate-200 rounded-full w-20"></div>
        </div>

        {/* Skeleton del stock */}
        <div className="h-4 bg-slate-200 rounded w-32"></div>

        {/* Skeleton del botón */}
        <div className="h-10 bg-slate-800 rounded w-40 mt-12"></div>
      </article>
    </Container>
  );
};

export default ProductSkeleton;
