import { useCartContext } from "../provider/CartContext";
import ButtonIcon from "./ButtonIcon";
import LinkRouter from "./LinkRouter";

const Item = ({ producto }) => {
  const { addToCart, formatPrice } = useCartContext();
  const { id, nombre, precio, src, estilo, categoria } = producto;

  // Agregar un producto al carrito
  const handleCart = () => {
    addToCart(producto, id);
  }

  return (
    <article className="relative w-56 xl:w-64 h-[400px] shadow-xl rounded-xl overflow-hidden">
      <figure className="relative h-[320px] w-full">
        <img src={src} alt={nombre} className="w-full h-full object-cover" />

        <div className="opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 z-10 bg-black/20 w-full h-full flex items-center justify-center gap-8">
          <LinkRouter to={`/detalle-producto/${id}`}><ButtonIcon src={"../expand.svg"} alt={"Expandir"} /></LinkRouter>
          <ButtonIcon handleCart={handleCart} src={"../shopping-bag-line.svg"} alt={"Carrito"}/>
        </div>
      </figure>
      <div className="flex flex-col p-2 gap-4">
        <h2 className="text-xl font-bold">{nombre}</h2>
        <p className="text-base">${formatPrice(precio)}</p>
      </div>
      <div className="absolute top-0 w-full flex justify-between items-center px-4 py-2">
        <p className="border-black border-1 px-3 py-1 rounded-full bg-black text-sm text-white">{estilo}</p>
        <p className="border-black border-1 px-3 py-1 rounded-full bg-[#DBB98E] text-sm text-black">{categoria}</p>
      </div>
    </article>
  )
}

export default Item;
