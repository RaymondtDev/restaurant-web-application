import { FiShoppingBag } from "react-icons/fi";
import Hamburger from "./Hamburger";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../hooks/UseAuth";

function Header() {
  const authState = useAuth();

  return (  
    <header className="bg-gray-50 sticky top-0 z-10">
      <div className="flex items-center justify-between relative py-2 md:py-0 px-4 md:px-12 lg:px-24">
        <Hamburger />
        <Link to={'/'}>
          <h1 className="flex items-center justify-center font-logo font-bold text-4xl -rotate-5">D'Joe</h1>
        </Link>
        <nav className="hidden md:flex items-center font-head text-xl">
          <Link to={'/'} className="py-4 px-3 transition hover:-translate-y-0.5">Home</Link>
          <Link to={'menu'} className="py-4 px-3 transition hover:-translate-y-0.5">Menu</Link>
          <Link to={'contact'} className="py-4 px-3 transition hover:-translate-y-0.5">Contact</Link>

          <div className="flex items-center justify-center gap-6 ml-8">
            <Link to={authState?.isAuthenticated ? "account" : "login"}
              className="cursor-pointer transition hover:scale-110"
            >
              <FaRegUser size={17} />
            </Link>
            <Link to={'cart'} className="cursor-pointer transition hover:scale-110">
              <FiShoppingBag size={17} />
            </Link>
          </div>
        </nav>
        <Link to={'cart'} className="flex items-center justify-center md:hidden cursor-pointer">
          <FiShoppingBag size={25} />
        </Link>

        <MobileMenu />
      </div>
    </header>
  );
}

export default Header;