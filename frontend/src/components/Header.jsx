import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import SearchBar from "./SearchBar";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [logoHeight, setLogoHeight] = useState(getLogoHeight(window.innerWidth));

  function getLogoHeight(width) {
    if (width < 640) return 80;
    if (width < 1024) return 150;
    return 150;
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setLogoHeight(getLogoHeight(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      style={{
        display: "flex",
        flexDirection: windowWidth < 640 ? "column" : "row", // column on mobile
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <div
        style={{ cursor: "pointer", flexShrink: 0, marginBottom: windowWidth < 640 ? "0.5rem" : 0 }}
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="EchoDust Logo" style={{ height: `${logoHeight}px`, width: "auto" }} />
      </div>

      {/* Search Bar */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: windowWidth < 640 ? "center" : "flex-end",
          maxWidth:
            windowWidth < 640
              ? "100%"   // mobile
              : windowWidth < 1024
              ? "600px"  // tablets
              : windowWidth < 1440
              ? "800px"  // normal desktop
              : "1000px", // large desktop
        }}
      >
        <SearchBar onSearch={onSearch} style={{ width: "100%" }} />
      </div>
    </header>
  );
};

export default Header;
