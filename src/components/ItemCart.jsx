import { useCartContext } from "../provider/CartContext"

const ItemCart = ({ product, className, cartCheckout }) => {
  const { cantidadCart, formatPrice, deleteCart } = useCartContext();
  const { id, nombre, precio, src, cantidad } = product;
  const total = precio * cantidad;

  return (
    <div className={`relative flex items-start gap-3 border-b pb-3 ${ cartCheckout ? "pb-4" : ""}`}>
      <figure className={`${className} h-full`}>
        <img
          src={src}
          alt="Producto"
          className="w-full h-full inset-0 rounded-lg shadow-md object-cover cursor-pointer"
        />
      </figure>
      <article className={`ml-1 flex-1 flex flex-col justify-between ${cartCheckout ? "h-[184px] gap-2" : "h-28"}`}>
        <div>
          <p className={`font-playfart w-[90%] ${ cartCheckout ? "text-2xl md:text-[28px]" : "text-xl"}`}>{nombre}</p>
          <p className={`${ cartCheckout ? "text-xl" : "text-base"}`}>Precio: ${formatPrice(precio)}</p>
          <p className={`${ cartCheckout ? "text-lg" : "text-base"} text-slate-700`}>Total: ${formatPrice(total)}</p>
        </div>

        <div className="flex h-max w-full items-end justify-between gap-2">
          <p className={`mt-2 ${ cartCheckout ? "text-lg" : "text-base"} text-slate-700`}>Cantidad: {cantidad}</p>
          <div className="flex gap-2">
            <button onClick={() => cantidadCart(id, +1)} className={`${ cartCheckout ? "w-10 py-1 text-2xl" : "w-9 py-1 text-lg"} flex justify-center px-3 cursor-pointer font-sans font-semibold bg-slate-100 rounded-full shadow-md hover:bg-slate-200 transition`}>
              +
            </button>
            <button onClick={() => cantidadCart(id, -1)} className={`${ cartCheckout ? "w-10 py-1 text-2xl" : "w-9 py-1 text-lg"} flex justify-center px-3 cursor-pointer font-sans font-semibold bg-slate-100 rounded-full shadow-md hover:bg-slate-200 transition`}>
              -
            </button>
          </div>
        </div>
      </article>
      <button onClick={() => deleteCart(id)} className={`cursor-pointer absolute top-1 right-0`} >
        <img src="/delete-bin-line.svg" alt="Eliminar" className={ cartCheckout ? "w-8" : "w-5"} />
      </button>
    </div>
  )
}

export default ItemCart
