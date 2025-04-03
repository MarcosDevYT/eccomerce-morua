import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../firebase";

import ItemDetail from "../components/ItemDetail";
import ProductSkeleton from "../components/Skeletons/ProductSkeleton";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener el producto por ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const result = await getProductById(id);
        setProducto(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <main className="px-6 pt-16 min-h-screen md:px-16 lg:px-28">
      {loading && <ProductSkeleton/>}
      {!loading && producto && <ItemDetail producto={producto} />}
    </main>
  );
};

export default ItemDetailContainer;