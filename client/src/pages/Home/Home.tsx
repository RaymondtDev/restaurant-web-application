import { useEffect, useState } from "react";
import ReservationForm from "../../components/ReservationForm";
import { BsForkKnife } from "react-icons/bs";
import MenuCard from "../../components/MenuCard";
// import { menu } from "../../utils/MOCK_DATA";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa6";
import { GetProducts } from "../../api/API";
import MenuSectionLoader from "../../components/MenuSectionLoader";
import { FaCalendarCheck } from "react-icons/fa6";

export interface MenuItem {
  thumbnail: {
    url: string,
    publicId: string
  },
  _id: string,
  title: string,
  description: string,
  popular: boolean,
  price: number,
  category: string
}

function Home() {
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [apiMenu, setApiMenu] = useState<MenuItem[] | null>(null);
  const [menuSectionLoading, setMenuSectionLoading] = useState<boolean>(true);

  const hideForm: () => void = () => {
    setDisplayForm(false);
  }

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        const { data } = await GetProducts("all");
        setApiMenu(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setMenuSectionLoading(false);
      }
    }

    fetchProducts();
  }, [])

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
              <button  className="flex items-center gap-2 py-4 px-6 font-bold bg-white rounded-md cursor-pointer transition hover:scale-105">
                <BsForkKnife size={20} />
                Explore Menu
              </button>
            </Link>
            <button className="text-white font-bold flex items-center gap-2 py-3.5 px-6 border-2 border-white rounded-md cursor-pointer transition hover:scale-105" onClick={() => setDisplayForm(true)}>
              <FaCalendarCheck size={20} />
              Book A Table
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

      <section className="bg-charcoal-800 px-2 py-5 md:py-10 md:px-12 lg:px-24">
        <p className="uppercase text-white text-sm mb-4">our menu</p>
        <div className="flex items-center justify-between">
          <h2 className="uppercase font-head md:text-2xl mb-4 bg-white w-fit py-2 pl-6 pr-16 [clip-path:polygon(0_0,100%_0,calc(100%-30px)_100%,0_100%)]">Popular Dishes</h2>
          <Link to="menu">
            <div className="text-white flex items-center gap-2 pb-4">
              <p className="text-md md:text-md">View Full Menu</p>
              <FaArrowRight />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 grid-rows-[auto,300px_1fr_1fr] xl:grid-cols-4 gap-y-2 xl:gap-y-0 gap-x-2">
          { menuSectionLoading ? (
            <MenuSectionLoader />
          ) : (
            apiMenu?.filter(item => item.popular === true).slice(0,4).map(item => (
              <ProductCard key={item._id} item={item} />
            ))
          )}
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