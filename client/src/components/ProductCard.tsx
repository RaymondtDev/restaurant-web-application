import { FaPlus, FaStar } from "react-icons/fa6";
import { useCart } from "../hooks/UseCart";

interface ItemType {
  item: { 
    id: number,
    title: string,
    description: string,
    thumb: string,
    price: number
  }
}

function ProductCard({ item }: ItemType) {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <div className="row-span-1 md:row-span-3 md:grid md:grid-rows-subgrid bg-white overflow-hidden">
      <figure className="h-45 md:h-full md:max-h-75 overflow-hidden relative">
        <img src={item.thumb} alt="menu item thumbail" />
        <div className="absolute top-4 right-4 text-yellow-300">
          <FaStar size={20} />
        </div>
      </figure>
      <div className="px-2 pt-4">
        <h3 className="font-extrabold font-head text-xl max-w-full w-full truncate md:text-wrap">{item.title}</h3>
        <small>
          {item.description}
        </small>
      </div>
      <div className="p-2 mt-2 flex items-center justify-between">
        <span className="font-bold">R {item.price}</span>
        <button className="p-2 bg-charcoal-800 rounded-full text-white w-fit cursor-pointer transition hover:scale-110" onClick={() => addToCart(item)}>
          <FaPlus size={15} />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;