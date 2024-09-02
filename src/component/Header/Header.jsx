import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const isLoggedIn = localStorage.getItem("isAuthenticated");
    if (isLoggedIn) {
      navigate("/employee");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    // Remove user data from localStorage or sessionStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAuthenticated"); // If you store the token

    // Redirect to the login page or home page
    navigate("/");
  };

  const isLoggedIn = localStorage.getItem("isAuthenticated");

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 shadow-sm">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer"
          >
            <img
              src="/passer_digital_logo.jpeg"
              className="mr-3 h-6 sm:h-9 rounded-md"
              alt="Passer Digital Logo"
            />
            <span className="self-center text-xl font-bold whitespace-nowrap">
              EMD
            </span>
          </div>
          <div className="flex items-center lg:order-2">
            <Link
              to="/create"
              className="text-primary-black bg-primary-orange hover:bg-secondary-black hover:text-secondary-orange focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Add User
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-primary-black bg-primary-red hover:bg-secondary-black hover:text-secondary-orange focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 ml-2 focus:outline-none"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
