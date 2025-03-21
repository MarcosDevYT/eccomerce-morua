import { useState } from "react";
import { useCartContext } from "../../provider/CartContext";
import { toast } from "react-toastify";

import TitleSection from "../TitleSection";
import Container from "./Container";
import ItemCart from "../ItemCart";
import Button from "../Button";

const DELIVERY_COST = 15000;

const CartLayout = () => {
  const { cartList, totalItems, totalPriceFormated, clearCart } = useCartContext();
  const [deliveryType, setDeliveryType] = useState('pickup'); 
  const [address, setAddress] = useState('');

  // Calcular el total final
  const finalTotal = deliveryType === 'delivery' 
    ? parseFloat(totalPriceFormated.replace('.', '').replace(',', '.')) + DELIVERY_COST 
    : parseFloat(totalPriceFormated.replace('.', '').replace(',', '.'));

  const handleDeliveryChange = (e) => {
    setDeliveryType(e.target.value);
    if (e.target.value === 'pickup') {
      setAddress('');
    }
  };

  if (cartList.length === 0) {
    return (
      <Container className="min-h-screen flex flex-col items-center justify-center">
        <TitleSection title="Carrito de Compras" className="mb-8" />

          <h2 className="text-2xl mb-8">Tu carrito está vacío</h2>
          <Button href="/category" text="Ver Productos" />
      </Container>
    );
  }

  return (
    <Container className="flex flex-col-reverse md:flex-row gap-8 items-center md:items-start">
      <article className="w-full md:w-2/3 xl:w-8/12 grid shadow-lg bg-slate-50 p-6">
        <TitleSection title="Carrito de Compras" className="border-b pb-4 mb-8" />
        <ul className="flex flex-col gap-6">
          {cartList.map((item) => (
            <li className="max-h-48" key={item.id}>
              <ItemCart className={"w-28"} cartCheckout={true} product={item} />
            </li>
          ))}
        </ul>
        <Button
          onClick={clearCart}
          className="w-52 md:w-72 mt-12 text-2xl md:text-3xl text-red-700 font-playfart hover:text-white hover:bg-red-700 transition"
          text={"Vaciar"}
        />
      </article>
      <article className="shadow-lg bg-slate-50 p-6 w-full md:w-1/3 xl:w-5/12 flex flex-col gap-6">
        <TitleSection title="Resumen" className="border-b pb-4" />
        
        <div className="space-y-4">
          <p className="text-xl flex justify-between text-gray-600">Productos: <span>{totalItems} items</span></p>
          
          <div className="pt-4">
            <p className="font-semibold mb-3">Método de entrega:</p>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="deliveryType"
                  value="pickup"
                  checked={deliveryType === 'pickup'}
                  onChange={handleDeliveryChange}
                  className="accent-black"
                />
                <span>Retirar en local</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="deliveryType"
                  value="delivery"
                  checked={deliveryType === 'delivery'}
                  onChange={handleDeliveryChange}
                  className="accent-black"
                />
                <span>Envío a domicilio (+$15.000)</span>
              </label>
            </div>
          </div>

          {deliveryType === 'delivery' && (
            <div className="pt-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Dirección de envío
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ingresa tu dirección completa"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          )}

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal:</p>
              <p>${totalPriceFormated}</p>
            </div>
            
            {deliveryType === 'delivery' && (
              <div className="flex justify-between">
                <p className="text-gray-600">Costo de envío:</p>
                <p>$15.000,00</p>
              </div>
            )}
            
            <div className="flex justify-between text-3xl pt-2 border-t">
              <p>Precio Final:</p>
              <p>${finalTotal.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => {
            if (deliveryType === 'delivery' && !address) {
              toast.error('Por favor ingresa una dirección de envío');
              return;
            }
            toast.success('¡Compra realizada con éxito!');
          }}
          className="w-full text-2xl md:text-3xl font-playfart transition text-center mt-4"
          text="Comprar"
        />
      </article>
    </Container>
  );
};

export default CartLayout;