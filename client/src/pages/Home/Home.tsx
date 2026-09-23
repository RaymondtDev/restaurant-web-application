import { useState } from "react";
import ReservationForm from "../../components/ReservationForm";
import { IoIosArrowRoundForward } from "react-icons/io";
import MenuCard from "../../components/MenuCard";
import { menu } from "../../utils/MOCK_DATA";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa6";

function Home() {
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const hideForm: () => void = () => {
    setDisplayForm(false);
  }

  return (
    <div className="bg-white snap-y snap-proximity">
      <section className="flex px-2 py-20 lg:py-25 md:px-12 lg:px-24 bg-gray-400 bg-[url('/hero-bg-mobile.png')] md:bg-[url('/hero-bg.png')] bg-cover bg-no-repeat">
        <div className="md:flex-2/3 lg:flex-1/2">
          <h1 className="text-7xl scale-y-125 my-8 font-head font-extralight uppercase text-white">
            grilled meats and tasty eats
          </h1>
          <p className="capitalize text-white mb-10 md:w-7/10 text-pretty">
            we aim to satisy all your flame grilled meat cravings. all the flame grilled chicken, burgers, sausages, and steaks you can eat.
          </p>
          <div className="flex items-center gap-4">
            <Link to="menu">
              <button  className="flex items-center gap-2 py-4 px-6 bg-white rounded-md cursor-pointer transition hover:scale-105">
                View Our Menu
              </button>
            </Link>
            <button className="text-white flex items-center gap-2 py-3.5 px-6 border-2 border-white rounded-md cursor-pointer transition hover:scale-105" onClick={() => setDisplayForm(true)}>
              Reserve A Table
              <IoIosArrowRoundForward size={25} />
            </button>
          </div>
        </div>
        <div className="hidden md:block md:flex-1/3 lg:flex-1/2"></div>
      </section>

      <section className="bg-white px-2 py-10 md:px-12 lg:px-24">
        <h2 className="uppercase font-head text-4xl text-center mb-4">our menu categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:grid-rows-[300px_1fr] gap-2">
          <MenuCard category="steaks" route="menu/steaks" thumb="steak-thumb.jpg" />
          <MenuCard category="burgers" route="menu/burgers" thumb="burger-thumb.jpg" />
          <MenuCard category="sides" route="menu/sides" thumb="sides-thumb.jpg" />
          <MenuCard category="drinks" route="menu/drinks" thumb="drinks-thumb.jpg" />
        </div>
      </section>

      <section className="bg-charcoal-800 px-2 py-10 md:px-12 lg:px-24">
        <p className="uppercase text-white text-sm mb-4">our menu</p>
        <div className="flex items-center justify-between">
          <h2 className="uppercase font-head text-2xl mb-4 bg-white w-fit py-2 pl-6 pr-16 [clip-path:polygon(0_0,100%_0,calc(100%-30px)_100%,0_100%)]">Popular Dishes</h2>
          <Link to="menu">
            <div className="text-white flex items-center gap-2">
              <p>View Full Menu</p>
              <FaArrowRight />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 grid-rows-1 md:grid-rows-[auto,300px_1fr_1fr] md:grid-cols-2 xl:grid-cols-4 gap-y-2 xl:gap-y-0 md:gap-x-2">
          { menu.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      { displayForm && (
        <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center z-50">
          <ReservationForm displayFunc={hideForm} />
        </div>
      )}
    </div>
  );
}

export default Home;