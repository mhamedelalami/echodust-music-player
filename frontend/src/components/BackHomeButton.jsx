import React from "react";
import { useNavigate } from "react-router-dom";

const BackHomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center text-pink-500 font-bold hover:underline"
    >
      ← Back Home
    </button>
  );
};

export default BackHomeButton;
