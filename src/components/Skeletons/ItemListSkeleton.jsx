import Container from "../Layout/Container";
import TitleSection from "../TitleSection";

const ListItemSkeleton = () => {
  return (
    <article className="relative w-56 xl:w-64 h-[400px] shadow-xl rounded-xl overflow-hidden animate-pulse">
      {/* Skeleton del área de imagen */}
      <figure className="relative h-[320px] w-full bg-slate-200"></figure>
      
      {/* Skeleton del área de información */}
      <div className="flex flex-col p-2 gap-4">
        <div className="h-6 bg-slate-200 rounded w-4/5"></div>
        <div className="h-5 bg-slate-200 rounded w-1/3"></div>
      </div>

      {/* Skeleton de las etiquetas superiores */}
      <div className="absolute top-0 w-full flex justify-between items-center px-4 py-2">
        <div className="w-16 h-6 bg-slate-300 rounded-full"></div>
        <div className="w-20 h-6 bg-slate-300 rounded-full"></div>
      </div>
    </article>
  )
}

const ItemListSkeleton = ({ title , length }) => {
  return (
    <Container className="flex flex-col gap-2 items-center">
      <TitleSection title={title} />
      
      <article>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8">
          {/* Generar los skeletons para mostrar mientras carga */}
          {Array.from({ length }, (_, index) => (
            <ListItemSkeleton key={index} />
          ))}
        </div>
      </article>
      
    </Container>
  );
};

export default ItemListSkeleton
