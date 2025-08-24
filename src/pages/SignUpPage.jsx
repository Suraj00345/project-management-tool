import React, { useState } from "react";
import logo from "../assets/logo.png";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
      {/* Background Illustrations */}
      {/* Left side illustrations */}
      <div className="absolute left-4 lg:left-12 bottom-8 lg:bottom-16 hidden sm:block">
        {/* Person with laptop */}
        <div className="relative">
          <div className="w-16 h-20 bg-gradient-to-b from-orange-300 to-orange-400 rounded-t-full rounded-b-lg relative">
            <div className="w-12 h-3 bg-orange-200 rounded-full absolute top-2 left-2"></div>
          </div>
          {/* Laptop */}
          <div className="w-20 h-12 bg-gray-700 rounded-lg mt-2 relative">
            <div className="w-16 h-8 bg-blue-400 rounded-sm absolute top-1 left-2"></div>
          </div>
        </div>

        {/* Chart/Graph */}
        <div className="absolute -top-12 left-20 w-16 h-12 bg-white rounded-lg shadow-lg p-2">
          <div className="flex items-end justify-between h-full">
            <div className="w-2 h-4 bg-blue-400 rounded-sm"></div>
            <div className="w-2 h-6 bg-green-400 rounded-sm"></div>
            <div className="w-2 h-3 bg-purple-400 rounded-sm"></div>
            <div className="w-2 h-5 bg-pink-400 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Person with briefcase */}
      <div className="absolute left-8 lg:left-20 top-1/3 hidden md:block">
        <div className="w-12 h-16 bg-gradient-to-b from-blue-600 to-blue-700 rounded-t-full rounded-b-lg relative">
          <div className="w-8 h-2 bg-blue-300 rounded-full absolute top-1 left-2"></div>
          {/* Briefcase */}
          <div className="w-10 h-6 bg-gray-600 rounded-sm mt-1 relative">
            <div className="w-2 h-1 bg-gray-400 rounded-full absolute top-1 left-4"></div>
          </div>
        </div>
      </div>

      {/* Right side illustrations */}
      <div className="absolute right-4 lg:right-12 bottom-8 lg:bottom-16 hidden sm:block">
        {/* Person with documents */}
        <div className="relative">
          <div className="w-14 h-18 bg-gradient-to-b from-pink-400 to-pink-500 rounded-t-full rounded-b-lg relative">
            <div className="w-10 h-2 bg-pink-200 rounded-full absolute top-2 left-2"></div>
          </div>
          {/* Documents */}
          <div className="absolute -left-4 top-4">
            <div className="w-12 h-16 bg-white rounded-lg shadow-lg p-1">
              <div className="space-y-1">
                <div className="w-full h-1 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-1 bg-gray-300 rounded"></div>
                <div className="w-full h-1 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-1 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Person with presentation */}
      <div className="absolute right-8 lg:right-24 top-1/4 hidden lg:block">
        <div className="relative">
          <div className="w-12 h-16 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-full rounded-b-lg relative">
            <div className="w-8 h-2 bg-gray-400 rounded-full absolute top-1 left-2"></div>
          </div>
          {/* Presentation board */}
          <div className="absolute -left-8 -top-2 w-16 h-12 bg-white rounded-lg shadow-lg p-2">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-1/4 w-8 h-8 bg-yellow-300 rounded-full opacity-60 hidden lg:block animate-pulse"></div>
      <div className="absolute top-32 right-1/3 w-6 h-6 bg-purple-400 rounded-full opacity-50 hidden lg:block animate-pulse"></div>
      <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-pink-400 rounded-full opacity-60 hidden md:block animate-pulse"></div>

      {/* Main SignUp page start from here*/}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-5 mb-4">
            <div className="h-11">
              <img src={`${logo}`} alt="company logo" />
            </div>
            <span className="text-2xl font-bold text-gray-800">ORGANIVO</span>
          </div>
        </div>

        {/*Main Form */}
        <div className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder=""
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder=""
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder=""
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder=""
            />
          </div>
          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder=""
            />
          </div>
          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </div>
        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
