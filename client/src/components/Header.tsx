import { FiShoppingCart } from "react-icons/fi";
import Hamburger from "./Hamburger";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router";
import MobileMenu from "./MobileMenu";

function Header() {

  return (  
    <header className="bg-gray-50 py-2 md:py-0 px-4 md:px-12 lg:px-24 relative z-10">
      <div className="flex items-center justify-between">
        <Hamburger />
        <h1 className="flex items-center justify-center font-logo font-bold text-4xl -rotate-5">D'Joe</h1>
        <nav className="hidden md:flex items-center font-head text-xl">
          <Link to={'/'} className="py-4 px-3 transition hover:-translate-y-0.5">Home</Link>
          <Link to={'menu'} className="py-4 px-3 transition hover:-translate-y-0.5">Menu</Link>
          <Link to={'contact'} className="py-4 px-3 transition hover:-translate-y-0.5">Contact</Link>

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

      <MobileMenu />
    </header>
  );
}

export default Header;