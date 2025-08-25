import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/sidebar/DashboardSidebar";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <DashboardSidebar />
      <div className="flex-1">{children ? children : <Outlet />}</div>
    </div>
  );
};

export default SidebarLayout;
