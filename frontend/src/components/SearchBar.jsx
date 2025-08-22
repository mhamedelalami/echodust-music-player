import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const inputWidth = screenWidth < 500 ? "90%" : screenWidth < 900 ? "400px" : "500px";

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: "600px",   // prevents stretching too much on large screens
        display: "flex",
        justifyContent: "center",
        padding: "0 16px",  // space from screen edges
      }}
    >
      <div style={{ position: "relative", width: inputWidth }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for tracks, artists..."
          style={{
            width: "100%",
            padding: "12px 36px 12px 18px", // reduced right padding for icon
            borderRadius: "9999px",
            border: `1px solid ${isFocused ? "#D0BCFF" : "#ccc"}`,
            backgroundColor: "#f5f5f5",
            outline: "none",
            transition: "border 0.2s ease-in-out",
            fontSize: "14px",
            color: "#888",
          }}
        />
        <button
          type="submit"
          style={{
            position: "absolute",
            right: "8px",        // icon closer to border
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "#D0BCFF",    // purple color
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FiSearch size={20} />
        </button>
      </div>
    </form>
  );
}
