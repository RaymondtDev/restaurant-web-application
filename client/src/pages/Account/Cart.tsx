import { useCart } from "../../hooks/UseCart";

function Cart() {
  const cart = useCart((state) => state.cart);

  return (
    <div className="w-full px-2 md:px-12 lg:px-24 flex flex-col md:flex-row">
      {/* cart items */}
      <div className="flex-1">
        {cart.length > 0 ? (
          <div>
            {cart.map(item => (
              <div key={item.id}>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No Items In Cart</p>
        )}
      </div>

      {/* cart summary */}
      <aside className="h-fit md:w-104 p-2 bg-gray-200/50 rounded-md">
        <div></div>
        <button className="bg-charcoal-800 w-full text-white font-bold border-none rounded-sm py-2 cursor-pointer transition hover:scale-102">Chekout</button>
      </aside>
    </div>
  );
}

export default Cart;