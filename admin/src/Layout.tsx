import { Outlet } from "react-router";
import SidePanel from "./components/SidePanel";

function Layout() {
  return (
    <div className="h-screen w-screen flex relative">
      <aside className="w-58 h-screen bg-charcoal-800 text-white absolute lg:static">
        <SidePanel />
      </aside>
      <main className="bg-charcoal-100/20 h-screen w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;