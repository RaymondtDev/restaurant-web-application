import { FaStar } from "react-icons/fa6";

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
  return (
    <div className="row-span-1 md:row-span-3 md:grid md:grid-rows-subgrid bg-white overflow-hidden rounded-md">
      <figure className="h-85 md:h-full md:max-h-75 overflow-hidden rounded-bl-4xl relative">
        <img src={item.thumb} alt="menu item thumbail" />
        <div className="absolute top-4 right-4 text-yellow-300">
          <FaStar size={20} />
        </div>
      </figure>
      <div className="px-2 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold font-head text-xl">{item.title}</h3>
          <span className="font-bold">R {item.price}</span>
        </div>
        <small>
          {item.description}
        </small>
      </div>
      <div className="p-2 mt-2">
        <button className="px-6 py-2 bg-charcoal-800 rounded-md text-white md:float-right w-full md:w-fit">Buy</button>
      </div>
    </div>
  );
}

export default ProductCard;