import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useParams } from "react-router";
import { type MenuItem } from "../Home/Home";
import { GetProducts } from "../../api/API";
import ProductCard from "../../components/ProductCard";
import MenuPageLoader from "../../components/MenuPageLoader";
import { useToast } from "../../hooks/useToast";

const categories: string[] = ['all', 'steaks', 'burgers', 'sides', 'drinks'];

function Menu() {
  const [menuCategory, setMenuCategory] = useState<string | undefined>(undefined);
  const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);
  const [menuLoading, setMenuLoading] = useState<boolean>(true);
  const { category } = useParams();

  const toast = useToast();

  const handleSumbitSearch: () => void = () => {
    toast?.displayToast(500, false, "Search functionality is not yet implemented.");
  }

  useEffect(() => {
    const handleSetCategory = () => {
      if (category) {
        setMenuCategory(category);
      } else {
        setMenuCategory('all');
      }
    };

    handleSetCategory();

    const fetchProducts = async () => {
      try {
        const { data } = await GetProducts(category || 'all');
        setMenuItems(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setMenuLoading(false);
      }
    };

    fetchProducts();
  }, [category])

  return (
    <section className="px-2 py-2 md:px-12 lg:px-24 h-full bg-slate-50">
      <div className="flex items-center bg-charcoal-100/10 px-2 rounded-full w-full lg:w-1/2 inset-shadow-sm inset-shadow-charcoal-400/30 mb-6">
        <button className="p-2 flex items-center justify-center cursor-pointer transition hover:scale-110" onClick={handleSumbitSearch}>
          <IoSearch size={20} />
        </button>
        <input
          type="search"
          name="search"
          id="search"
          className="focus:outline-none py-2.5 w-full"
        />
      </div>
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={
              clsx(
                "py-2 px-4 md:px-6 bg-charcoal-100/20 rounded-md shadow-sm capitalize cursor-pointer transiton hover:scale-105 text-sm md:text-md",
                {
                  "bg-charcoal-800 text-white": cat === menuCategory
                }
              )
            }
            onClick={() => setMenuCategory(cat)}
          >{cat}</button>
        ))}
      </div>

      <div className="mt-6">
        {categories.map((cat, index) => (
          cat === menuCategory && (
            <>
            { menuItems?.filter(item => item.category === cat || cat === 'all').length === 0 ? (
              <p key={index} className="text-center text-charcoal-800 text-md md:text-lg py-20 lg:py-44">No items found in this category</p>
            ) : (
              <div key={index} className="grid grid-cols-2 grid-rows-[auto,300px_1fr_1fr] xl:grid-cols-4 gap-y-2 gap-x-2">
                { menuLoading ? (
                  <MenuPageLoader />
                ) : (
                  menuItems?.filter(item => item.category === cat || cat === 'all').map((item, index) => (
                    <ProductCard key={index} item={item} />
                  ))
                )}
              </div>
            )}
            </>
          )
        ))}
      </div>
    </section>
  );
}

export default Menu;