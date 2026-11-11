import { Link } from "react-router";
import { useAuth } from "../hooks/UseAuth";

function Footer() {
  const authState = useAuth();

  return (
    <footer className="bg-charcoal-800 text-white px-2 py-20 lg:py-25 md:px-12 lg:px-24">
      <div className="grid grid-rows-[auto_1fr] grid-cols-1 md:grid-cols-4 gap-y-4">
        <div className="flex flex-col items-center justify-center gap-2 row-span-2">
          <h1 className="font-logo font-bold text-4xl xl:text-8xl -rotate-5">D'Joe</h1>
          <p className="font-head uppercase text-2xl xl:text-4xl">Steakhouse</p>
        </div>

        <div className="row-span-2 grid grid-rows-subgrid text-center md:text-left">
          <h2 className="font-bold text-xl mb-1 md:mb-4">Quick Links</h2>
          <ul className="flex flex-col gap-1 md:gap-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              { authState?.isAuthenticated ? (
                <Link to="/account">Account</Link>
              ) : (
                <Link to="/login">
                  <button className="bg-white rounded-md py-2 px-4 text-black transition hover:scale-102 cursor-pointer">
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>

        <div className="row-span-2 grid grid-rows-subgrid text-center md:text-left">
          <h2 className="font-bold text-xl mb-1 md:mb-4">Explore Menu</h2>
          <ul className="flex flex-col gap-1 md:gap-2">
            <li>
              <Link to="menu">Full Menu</Link>
            </li>
            <li>
              <Link to="menu/steaks">Steaks</Link>
            </li>
            <li>
              <Link to="menu/burgers">Burgers</Link>
            </li>
            <li>
              <Link to="menu/sides">Sides</Link>
            </li>
            <li>
              <Link to="menu/drinks">Drinks</Link>
            </li>
          </ul>
        </div>

        <div className="row-span-2 grid grid-rows-subgrid text-center md:text-left">
          <h2 className="font-bold text-xl mb-1 md:mb-4">Contact</h2>
          <ul className="flex flex-col gap-1 md:gap-2">
            <li>
              <p>123 Main Street, City, Country</p>
            </li>
            <li>
              <p>Phone: (123) 456-7890</p>
            </li>
            <li>
              <p>Email: info@djoesteakhouse.com</p>
            </li>
          </ul>
        </div>
      </div>

      {/* copyright */}
      <p className="text-center mt-6">&copy; {new Date().getFullYear()} D'Joe Steakhouse Restaurant. All rights reserved.</p>
    </footer>
  );
}

export default Footer;