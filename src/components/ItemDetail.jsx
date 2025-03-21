import { useCartContext } from "../provider/CartContext";
import Button from "./Button";
import Container from "./Layout/Container";


const ItemDetail = ({ producto }) => {
  const { addToCart, formatPrice } = useCartContext();

  const { id, nombre, precio, descripcion, src, categoria, estilo, stock } = producto;

  // Agregar un producto al carrito
  const handleCart = () => {
    addToCart(producto, id);
  }

  return (
    <Container className="flex flex-col-reverse md:flex-row gap-16 items-center md:items-start">
      <article className=" md:w-2/4 grid place-items-center ">
        <img src={src} alt={nombre} className="h-[500px] object-contain rounded-lg" />
      </article>
      <article className=" w-full md:w-3/4 mt-2 flex flex-col gap-4">
        <h2 className="text-3xl font-bold flex justify-between">{nombre} <span className="font-normal text-xl">ID: {id}</span></h2>
        <p className="text-xl">${formatPrice(precio)}</p>
        <p className="text-gray-600 text-lg mb-2">{descripcion}</p>
        <div className="flex gap-2 text-sm">
          <span className="border-black border-1 px-3 py-1 rounded-full bg-black text-sm text-white">{categoria}</span>
          <span className="border-black border-1 px-3 py-1 rounded-full bg-[#DBB98E] text-sm text-black">{estilo}</span>
        </div>
        <p className="text-sm mb-auto">Stock disponible: {stock}</p>

        <Button onClick={handleCart} text={"Agregar al carrito"} className="mt-12 w-max md:px-14" />
      </article>
    </Container>
  );
};

export default ItemDetail
