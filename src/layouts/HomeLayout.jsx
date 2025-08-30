import { Outlet } from "react-router-dom";
import Navbar from "../components/headers/Navbar";

const HomeLayout = ({ children }) => {
  return (
    <main className="">
      <Navbar />

      <main className="h-[calc(100vh-4rem)]">{children ? children : <Outlet />}</main>
    </main>
  );
};

export default HomeLayout;
