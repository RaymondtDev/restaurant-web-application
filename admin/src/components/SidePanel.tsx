import clsx from "clsx";
import { FaCalendarDay, FaUsers } from "react-icons/fa6";
import { MdDashboard, MdRestaurantMenu } from "react-icons/md";
import { Link, useLocation } from "react-router";

function SidePanel() {
  const location = useLocation();

  const paths = [
    { to: '/', path: 'Dashboard', icon: <MdDashboard /> },
    { to: 'menu', path: 'Menu', icon: <MdRestaurantMenu /> },
    { to: 'reservations', path: 'Reservations', icon: <FaCalendarDay /> },
    { to: 'users', path: 'Users', icon: <FaUsers /> }
  ]

  return (
    <div>
      <h1 className="text-4xl font-logo font-extrabold -rotate-5 py-4 px-6">D'Joe</h1>
      <nav className="font-head">
        { paths.map(path => (
          <Link to={path.to}>
            <div className={
              clsx(
                "text-xl flex items-center gap-4 p-4 transition hover:bg-charcoal-600",
                {
                  "bg-charcoal-600": location.pathname === path.to
                }
              )
            }>
              {path.icon}
              <p>{path.path}</p>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default SidePanel;