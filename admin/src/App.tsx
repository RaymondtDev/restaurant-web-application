import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import DisplayStateProvider from "./context/DisplayStateProvider";
import { DisplayToastProvider } from "./context/DisplayToastProvider";

function App() {
  return (
    <DisplayToastProvider>
    <DisplayStateProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </DisplayStateProvider>
    </DisplayToastProvider>
  );
}

export default App;