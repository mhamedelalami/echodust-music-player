import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackHomeButton = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    backgroundColor: "#D0BCFF",
    color: "#ffffff",
    fontWeight: "500",
    fontSize: "14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 12px rgba(208, 188, 255, 0.4)",
  };

  const hoverStyle = {
    backgroundColor: "#5B21B6",
    transform: "scale(1.05)",
    boxShadow: "0 6px 16px rgba(91, 33, 182, 0.5)",
  };

  return (
    <button
      onClick={() => navigate("/")}
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
        e.currentTarget.style.transform = hoverStyle.transform;
        e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = buttonStyle.boxShadow;
      }}
    >
      <FiArrowLeft size={18} />
      Back to Home
    </button>
  );
};

export default BackHomeButton;