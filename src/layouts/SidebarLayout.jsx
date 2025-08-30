import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/sidebar/DashboardSidebar";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex h-full">
      <DashboardSidebar />
      <div className="flex-1 h-full max-h-full overflow-auto no-scrollbar">{children ? children : <Outlet />}</div>
    </div>
  );
};

export default SidebarLayout;
