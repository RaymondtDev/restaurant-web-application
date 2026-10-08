import { Link } from "react-router";
import { useMobileState } from "../hooks/UseMobileState";
import { BiFoodMenu } from "react-icons/bi";
import clsx from "clsx";
import { IoHomeOutline, IoMailOutline } from "react-icons/io5";
import { useAuth } from "../hooks/UseAuth";
import { FaRegUser } from "react-icons/fa6";
import { MdLogin } from "react-icons/md";

function MobileMenu() {
  const mobileState = useMobileState();
  const authState = useAuth();

  return (
    <div className={
      clsx(
        "absolute bg-white shadow-md p-2 rounded-lg top-full mt-2 font-head text-xl pl-4 w-3/4",
        {
          "flex flex-col": mobileState?.displayMenu,
          "hidden": !mobileState?.displayMenu
        }
      )
    }>
      <Link to={'/'}>
        <div  className="flex items-center gap-4 py-3">
          <IoHomeOutline />
          <p>Home</p>
        </div>
      </Link>
      <Link to={'menu'}>
        <div className="flex items-center gap-4 py-3">
          <BiFoodMenu />
          <p>Menu</p>
        </div>
      </Link>
      <Link to={'contact'}>
        <div className="flex items-center gap-4 py-3">
          <IoMailOutline />
          <p>Contact</p>
        </div>
      </Link>
      { authState?.isAuthenticated ? (
        <Link to={'acount'}>
          <div className="flex items-center gap-4 py-3">
            <FaRegUser />
            <p>Account</p>
          </div>
        </Link>
      ) : (
        <Link to={'login'}>
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