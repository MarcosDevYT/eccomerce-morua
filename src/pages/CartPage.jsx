import { useCartContext } from "../provider/CartContext";
import CartLayout from "../components/Layout/CartLayout";
import CartSkeleton from "../components/Skeletons/CartSkeleton";

export const CartPage = () => {
  const { isCardAndSessionReady } = useCartContext();

  return (
    <main className="px-6 pt-4 min-h-screen md:px-16 lg:px-28">
      {!isCardAndSessionReady ? <CartSkeleton /> : <CartLayout />}
    </main>
  );
};
