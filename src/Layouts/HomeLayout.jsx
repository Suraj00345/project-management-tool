import { Outlet } from "react-router-dom";
import Navbar from "../components/headers/Navbar";

import DashboardSidebar from "../components/sidebar/DashboardSidebar";

const HomeLayout = ({ children }) => {
  return (
    <main className="">
      <Navbar />
      {children ? children : <Outlet />}
    </main>
  );
};

export default HomeLayout;
