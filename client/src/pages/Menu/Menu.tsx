import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useParams } from "react-router";

const categories: string[] = ['all', 'steaks', 'burgers', 'sides', 'drinks'];

function Menu() {
  const [menuCategory, setMenuCategory] = useState<string | undefined>(undefined);
  const { category } = useParams();

  useEffect(() => {
    const handleSetCategory = () => {
      if (category) {
        setMenuCategory(category);
      } else {
        setMenuCategory('all');
      }
    };

    handleSetCategory();
  }, [category])

  return (
    <section className="px-2 py-2 md:px-12 lg:px-24 h-full bg-charcoal-100/10">
      <div className="flex items-center bg-charcoal-100/10 px-2 rounded-full w-full md:w-fit lg:w-1/2 inset-shadow-sm inset-shadow-charcoal-400/30 mb-6">
        <button className="p-2 flex items-center justify-center">
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

      <div>
        {categories.map((cat, index) => (
          cat === menuCategory && <p key={index}>{cat}</p>
        ))}
      </div>
    </section>
  );
}

export default Menu;