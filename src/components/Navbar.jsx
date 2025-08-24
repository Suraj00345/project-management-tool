import React, { useState } from "react";
import { Menu, X, Bell, LogOut, User } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div>
                <img src={`${logo}`} alt="" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-800">
                ORGANIVO
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center space-x-6 lg:space-x-8">
              <a
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Dashboard
              </a>
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base">
                    JD
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-500">
                        john.doe@example.com
                      </p>
                    </div>
                    <a
                      href="/updateprofile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={16} className="mr-3" />
                      Manage Profile
                    </a>

                    <div className="border-t border-gray-100">
                      <a
                        href="/login"
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Mobile Profile Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>

              {/* Hamburger Menu */}
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Open menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* User Info */}
                <div className="px-3 py-3 border-b border-gray-200 mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-500">
                        john.doe@example.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <a
                  href="#"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Dashboard
                </a>
                {/* Mobile Profile Actions */}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <a
                    href="/updateprofile"
                    onClick={closeMobileMenu}
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <User size={18} className="mr-3" />
                    Manage Profile
                  </a>

                  <a
                    href="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <LogOut size={18} className="mr-3" />
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
