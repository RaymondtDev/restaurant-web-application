import { Outlet } from "react-router";
import Header from "../components/Header";

function IndexPage() {
  return (
    <>
    <Header />
    <Outlet />
    </>
  );
}

export default IndexPage;