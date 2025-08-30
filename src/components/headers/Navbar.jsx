import { useState } from "react";
import { LogOut, User } from "lucide-react";
import HeaderLogo from "./HeaderLogo";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import MobileMenu from "../sidebar/MobileMenu";

const Navbar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-50 sticky top-0 z-10 h-16">
      <div className="w-11/12 lg:w-full lg:px-8 mx-auto">
        <div className="flex justify-between md:justify-between items-center h-16 relative">
          <HeaderLogo />

          <div className="hidden md:flex md:items-center space-x-6 lg:space-x-8">
            <div className="relative">
              <button onClick={toggleProfileDropdown} className="cursor-pointer flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base uppercase">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-auto bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <Link
                    onClick={toggleProfileDropdown}
                    to="/my-account"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User size={16} className="mr-3" />
                    Manage Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full cursor-pointer border-t border-gray-100"
                  >
                    <LogOut size={16} className="mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
