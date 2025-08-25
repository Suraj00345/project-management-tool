import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/headers/Navbar";
import clsx from "clsx";
import { FolderKanban, LayoutDashboard, User } from "lucide-react";

const HomeLayout = ({ children }) => {
  return (
    <main className="">
      <Navbar />

      <div className="flex h-[calc(100vh-4rem)]">
        <div className="hidden lg:block lg:w-[200px] xl:w-[240px] 2xl:w-xs border-r border-gray-50 h-full">
          <nav className="mt-4 mx-auto w-11/12">
            <div className="flex flex-col items-stretch gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  clsx(
                    isActive ? "text-blue-600 bg-blue-100" : "text-gray-600 hover:bg-gray-100",
                    "px-6 py-3  text-sm  w-full rounded-lg font-medium",
                    "flex gap-2 items-center justify-start"
                  )
                }
              >
                <LayoutDashboard />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  clsx(
                    isActive ? "text-blue-600 bg-blue-100" : "text-gray-600 hover:bg-gray-100",
                    "px-6 py-3  text-sm  w-full rounded-lg font-medium",
                    "flex gap-2 items-center justify-start"
                  )
                }
              >
                <FolderKanban />
                <span>Projects</span>
              </NavLink>

              <NavLink
                to="/my-account"
                className={({ isActive }) =>
                  clsx(
                    isActive ? "text-blue-600 bg-blue-100" : "text-gray-600 hover:bg-gray-100",
                    "px-6 py-3  text-sm  w-full rounded-lg font-medium",
                    "flex gap-2 items-center justify-start"
                  )
                }
              >
                <User />
                <span>Profile</span>
              </NavLink>
            </div>
          </nav>
        </div>

        <div className="flex-1">{children ? children : <Outlet />}</div>
      </div>
    </main>
  );
};

export default HomeLayout;
