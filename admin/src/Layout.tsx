import { Outlet } from "react-router";
import SidePanel from "./components/SidePanel";

function Layout() {
  return (
    <div className="h-screen w-screen flex">
      <aside className="w-58 bg-charcoal-800 text-white">
        <SidePanel />
      </aside>
      <main className="bg-white p-4 h-screen w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;