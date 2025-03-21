import { useCartContext } from "../../provider/CartContext";
import ItemCart from "../ItemCart"
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const CartWidget = ({ open, toggle }) => {
  const { cartList, totalItems, totalPriceFormated, clearCart } = useCartContext();
  const navigate = useNavigate();

  const handlePushCart = () => {
    navigate("/cart");
    toggle();
  }
  
  return (
    <article>
      <div
        onClick={toggle}
        className="relative z-20 cursor-pointer p-2 rounded-full shadow-lg bg-white transition-all"
      >
        <img src="/shopping-bag-line.svg" alt="Carrito" className="w-5 md:w-6" />
        <div className="absolute -top-1 -right-1 bg-red-700 w-4 h-4 flex items-center justify-center rounded-full text-[10px] text-white font-bold">
          {totalItems}
        </div>
      </div>

      <div
        className={`
          ${open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0 pointer-events-none"}
          absolute right-3 mt-4 w-72 md:w-96 lg:w-md bg-white rounded-lg shadow-lg p-4
          transition-all duration-300 ease-in-out z-20
        `}
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-3xl font-playfart">Tu Carrito</h3>
          <button onClick={toggle} className="text-black">
            <img src="/close-large-line.svg" alt="Cerrar" className="w-5 cursor-pointer" />
          </button>
        </div>

        {cartList.length === 0 ? (
          <p className="text-center py-8 text-gray-500">Tu carrito está vacío</p>
        ) : (
          <>
            <ul className="mt-3 space-y-3 overflow-y-auto max-h-72">
                {cartList.map((item) => (
                <li className="max-h-32" key={item.id}>
                  <ItemCart className={"w-18"} product={item} />
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-playfart">Total:</span>
                <span className="text-2xl">${totalPriceFormated}</span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-2">
                <Button
                  className="w-full md:text-xl font-playfart transition text-center"
                  onClick={handlePushCart}
                  text={"Ver Carrito"}
                />
                <Button
                  onClick={clearCart}
                  className="w-full md:text-xl text-red-700 font-playfart hover:text-white hover:bg-red-700 transition"
                  text={"Vaciar"}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
};

export default CartWidget;
