import { Link, useParams } from "react-router-dom";
import ItemListContainer from "../containers/ItemListContainer";
import TitleSection from "../components/TitleSection";

const Category = () => {
  // Obtener el id de la categoría desde la URL
  const { categoryId } = useParams();

  const categories = [
    "Sillas",
    "Lámparas",
    "Decorativo",
  ];

  return (
    <main className="max-w-[1540px] mx-auto pt-16 min-h-screen flex flex-col lg:flex-row">
      <aside className="w-full lg:pt-20 p-6 min-h-fit shadow-md lg:w-64">
        <nav>
          <TitleSection title={"Categorias"} className={"mt-1"} />

          <Link
            to="/category"
            className={`block mb-4 p-2 rounded hover:bg-slate-200 transition-colors
              ${!categoryId ? 'bg-slate-300' : ''}`}
          >
            Todas las categorías
          </Link>
          
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className={`block mb-4 p-2 rounded hover:bg-slate-200 transition-colors
                ${categoryId === category ? 'bg-slate-300' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          ))}
        </nav>
      </aside>
      {categoryId ? (
        <ItemListContainer 
          categoria={categoryId} 
        />
      ) : (
        <ItemListContainer 
          title="Productos" 
        />
      )}
    </main>
  )
}

export default Category