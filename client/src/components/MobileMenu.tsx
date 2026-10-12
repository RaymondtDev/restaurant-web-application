import { Link } from "react-router";
import { useMobileState } from "../hooks/UseMobileState";
import { BiFoodMenu } from "react-icons/bi";
import clsx from "clsx";
import { IoHomeOutline, IoMailOutline } from "react-icons/io5";
import { useAuth } from "../hooks/UseAuth";
import { FaRegUser } from "react-icons/fa6";
import { MdLogin } from "react-icons/md";
import { useEffect, useRef } from "react";

function MobileMenu() {
  const mobileState = useMobileState();
  const authState = useAuth();
  const menuElement = useRef<HTMLDivElement>(null);

  const handleLinkClick = () => {
    mobileState?.setDisplayMenu(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuElement.current && !menuElement.current.contains(event.target as Node)) {
        mobileState?.setDisplayMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileState]);

  return (
    <div ref={menuElement} className={
      clsx(
        "absolute bg-white shadow-md p-2 rounded-lg top-full mt-2 font-head text-xl pl-4 w-3/4",
        {
          "flex flex-col": mobileState?.displayMenu,
          "hidden": !mobileState?.displayMenu
        }
      )
    }>
      <Link to={'/'} onClick={handleLinkClick}>
        <div  className="flex items-center gap-4 py-3">
          <IoHomeOutline />
          <p>Home</p>
        </div>
      </Link>
      <Link to={'menu'} onClick={handleLinkClick}>
        <div className="flex items-center gap-4 py-3">
          <BiFoodMenu />
          <p>Menu</p>
        </div>
      </Link>
      <Link to={'contact'} onClick={handleLinkClick}>
        <div className="flex items-center gap-4 py-3">
          <IoMailOutline />
          <p>Contact</p>
        </div>
      </Link>
      { authState?.isAuthenticated ? (
        <Link to={'acount'} onClick={handleLinkClick}>
          <div className="flex items-center gap-4 py-3">
            <FaRegUser />
            <p>Account</p>
          </div>
        </Link>
      ) : (
        <Link to={'login'} onClick={handleLinkClick}>
          <div className="flex items-center gap-4 py-3">
            <MdLogin />
            <p>Login</p>
          </div>
        </Link>
      )}
    </div>
  );
}

export default MobileMenu;