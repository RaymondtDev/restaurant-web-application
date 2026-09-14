import { FiShoppingCart } from "react-icons/fi";
import { useMobileState } from "../hooks/UseMobileState";
import Hamburger from "./Hamburger";
import clsx from "clsx";
import { FaRegUser } from "react-icons/fa6";

function Header() {
  const mobileState = useMobileState();

  return (  
    <header className="bg-gray-50 py-2 px-4 md:px-12 lg:px-24 relative">
      <div className="flex items-center justify-between">
        <Hamburger />
        <h1 className="flex items-center justify-center font-logo font-bold text-4xl -rotate-5">D'Joe</h1>
        <nav className="hidden md:flex items-center gap-6 font-head text-xl">
          <p>Home</p>
          <p>Menu</p>

          <div className="flex items-center justify-center gap-6 ml-8">
            <div className="cursor-pointer transition hover:scale-110">
              <FaRegUser size={17} />
            </div>
            <div className="cursor-pointer transition hover:scale-110">
              <FiShoppingCart size={17} />
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center md:hidden cursor-pointer">
          <FiShoppingCart size={25} />
        </div>
      </div>

      <div className={
        clsx(
          "absolute bg-white shadow-md p-2 rounded-lg top-full mt-2",
          {
            "block": mobileState?.displayMenu,
            "hidden": !mobileState?.displayMenu
          }
        )
      }>
        <h4>Link</h4>
      </div>
    </header>
  );
}

export default Header;