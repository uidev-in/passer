import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 shadow-sm">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="/passer_digital_logo.jpeg"
              className="mr-3 h-6 sm:h-9 rounded-md"
              alt="Passer Digital Logo"
            />
            <span className="self-center text-xl font-bold whitespace-nowrap">
              EMD
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/create"
              className="text-primary-black bg-primary-orange hover:bg-secondary-black hover:text-secondary-orange focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Add User
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
