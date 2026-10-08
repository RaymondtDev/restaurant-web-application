import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import DisplayStateProvider from "./context/DisplayStateProvider";
import { DisplayToastProvider } from "./context/DisplayToastProvider";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Page404 from "./pages/Page404";

function App() {
  return (
    <DisplayToastProvider>
    <AuthProvider>
    <DisplayStateProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path="menu" element={<Menu />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
        <Route path="login" element={<div>Login</div>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
    </DisplayStateProvider>
    </AuthProvider>
    </DisplayToastProvider>
  );
}

export default App;