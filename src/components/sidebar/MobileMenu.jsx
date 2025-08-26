import clsx from "clsx";
import { AlignJustify, FolderKanban, LayoutDashboard, LogOut, User, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore((state) => state);

  useEffect(() => {
    setShowMenu(false); // Hide the menu
  }, [location]); // Re-run effect whenever location changes

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMenu]);

  return (
    <>
      <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden" onClick={() => setShowMenu((showMenu) => !showMenu)}>
        <AlignJustify />
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm  p-4 "
          >
            <div className="w-full h-full flex flex-col">
              <div className="flex justify-end items-center">
                <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100" onClick={() => setShowMenu(false)}>
                  <X />
                </button>
              </div>

              <div className="flex flex-col items-stretch gap-1 mt-8 flex-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    clsx(
                      isActive ? "text-blue-600" : "text-gray-600 hover:bg-gray-100",
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
                      isActive ? "text-blue-600 " : "text-gray-600 hover:bg-gray-100",
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
                      isActive ? "text-blue-600 " : "text-gray-600 hover:bg-gray-100",
                      "px-6 py-3  text-sm  w-full rounded-lg font-medium",
                      "flex gap-2 items-center justify-start"
                    )
                  }
                >
                  <User />
                  <span>Profile</span>
                </NavLink>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base uppercase">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </div>

                  <div className="">
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <button onClick={logout}>
                  <LogOut className="inline mr-2" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
