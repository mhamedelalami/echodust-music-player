import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import SearchBar from "./SearchBar";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-md flex flex-col sm:flex-row items-center justify-between px-4 py-2">
      {/* Logo */}
      <div
        className="cursor-pointer flex-shrink-0 mb-2 sm:mb-0"
        onClick={() => navigate("/")}
      >
        <img
          src={Logo}
          alt="EchoDust Logo"
          className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-h-16 object-contain"
        />
      </div>

      {/* Search Bar */}
      <div className="w-full sm:w-auto sm:flex-1 max-w-lg mb-2 sm:mb-0 sm:ml-auto">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Placeholder for future nav items */}
      <div className="flex items-center space-x-4"></div>
    </header>
  );
};

export default Header;
