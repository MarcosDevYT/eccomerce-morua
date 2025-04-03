import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../firebase";

import Item from "../components/Item"
import Container from "../components/Layout/Container";
import TitleSection from "../components/TitleSection";
import ItemListSkeleton from "../components/Skeletons/ItemListSkeleton";

const ItemListContainer = ({ categoria, title, destacado }) => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Conseguir el json de productos y setear el loading
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        setLoading(true);
        const productosObtenidos = await getProducts();
        setProductos(productosObtenidos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    obtenerProductos();
  }, []);

  // Conseguir los productos y filtrarlos
  const getProductosAMostrar = () => {
    if (destacado) {
      return productos.filter(producto => producto.destacado);
    }
    if (categoria === undefined) {
      return productos;
    }
    if (categoria) {
      return productos.filter(producto => producto.categoria === categoria);
    }
    return productos;
  }

  if (loading) {
    return <ItemListSkeleton length={3} title="Cargando productos..." />;
  }

  const productosAMostrar = getProductosAMostrar();

  // Si no hay productos despues del filtrado redirigir a /not-found
  if (productosAMostrar.length === 0) {
    navigate('/not-found');
    return null;
  }


  return (
    <Container className="flex flex-col gap-2 items-center ">
      <TitleSection title={categoria ? categoria : title}/>
      
      <article>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8">
          {productosAMostrar.map((producto) => (
            <Item key={producto.id} producto={producto} />
          ))}
        </div>
      </article>
    </Container>
  );
}

export default ItemListContainer;