import { useEffect } from "react";
import CartItem from "../../components/CartItem";
import { useCart } from "../../hooks/UseCart";

function Cart() {
  const cartState = useCart((state) => state);
  const cart = cartState.cart;
  const totalPrice = cartState.totalPrice + (cartState.totalPrice * 0.15);
  const VAT = cartState.totalPrice * 0.15;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="w-full bg-gray-50 py-2 px-2 md:px-12 lg:px-24 flex flex-col lg:flex-row md:gap-4 lg:gap-8">
      {/* cart items */}
      <div className="flex-1">
        <div className="flex justify-between">
          <h2 className="font-bold text-3xl">Cart</h2>
          <button
            className="cursor-pointer text-red-500"
            onClick={() => cartState.clearCart()}
          >
            Clear
          </button>
        </div>
        {cart.length > 0 ? (
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-y-2 py-2">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p>Cart Empty</p>
        )}
      </div>

      {/* cart summary */}
      <aside className="h-fit lg:w-80 xl:w-104 px-4 py-2 bg-gray-200/50 rounded-md">
        <div className="py-2">
          <h3 className="font-bold text-sm pb-3 border-b border-charcoal-500/30 mb-2">Order Summary</h3>
          <div>
            <div className="flex justify-between items-center py-2">
              <p className="text-charcoal-400">Items</p>
              <p className="font-bold">{cartState.totalItems}</p>
            </div>
            <div className="flex justify-between items-center py-2">
              <p className="text-charcoal-400">Sub Total</p>
              <p className="font-bold">R {cartState.totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center py-2 pb-6">
              <p className="text-charcoal-400">Tax (VAT - 15%)</p>
              <p className="font-bold">R {VAT.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center py-6 border-t border-charcoal-500/30">
              <p className="text-charcoal-400">Total</p>
              <p className="font-bold">R {totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <button className="bg-charcoal-800 w-full text-white font-bold border-none rounded-sm py-2 cursor-pointer transition hover:scale-102">
          Chekout
        </button>
      </aside>
    </div>
  );
}

export default Cart;
