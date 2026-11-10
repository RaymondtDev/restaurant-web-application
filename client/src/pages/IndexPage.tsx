import { Outlet } from "react-router";
import Header from "../components/Header";
import { DisplayToastProvider } from "../contexts/DisplayToastProvider";

function IndexPage() {
  return (
    <>
    <Header />
    <DisplayToastProvider>
      <Outlet />
    </DisplayToastProvider>
    </>
  );
}

export default IndexPage;