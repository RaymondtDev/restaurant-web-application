import { useCart } from "../hooks/UseCart";
import { GoPlus } from "react-icons/go";
import { IoRemoveSharp } from "react-icons/io5";
import type { CartItemState } from "../hooks/UseCart";

interface CartItemType {
  item: CartItemState;
}

function CartItem({ item }: CartItemType) {
  const cartState = useCart((state) => state)

  return (
    <div key={item._id} className="grid col-span-4 grid-cols-subgrid p-1 shadow-sm rounded-md bg-white">
      <figure className="size-15">
        <img src={item.thumbnail.url} alt="menu item thumbnail" />
      </figure>
      <p className="px-1.5 md:px-6 truncate my-auto capitalize">{item.title}</p>
      <div className="flex items-center px-2.5 md:px-6">
        <button
          className="cursor-pointer transition hover:scale-101"
          onClick={() =>
            cartState.updateQuantity(item._id, item.quantity - 1)
          }
        >
          <IoRemoveSharp />
        </button>
        <p className="h-fit py-0.5 px-3 mx-2 rounded-sm bg-charcoal-100/20 flex items-center justify-center">{item.quantity}</p>
        <button
          className="cursor-pointer transition hover:scale-101"
          onClick={() =>
            cartState.updateQuantity(item._id, item.quantity + 1)
          }
        >
          <GoPlus />
        </button>
      </div>
      <p className="px-1.5 pl-2 md:pl-6 md:px-6 flex items-center">{item.price}</p>
    </div>
  );
}

export default CartItem;