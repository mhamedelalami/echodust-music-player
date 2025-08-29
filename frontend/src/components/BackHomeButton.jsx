// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiArrowLeft } from "react-icons/fi";

// const BackHomeButton = () => {
//   const navigate = useNavigate();
//   const [isHovered, setIsHovered] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);

//   const baseButtonStyle = {
//     display: "flex",
//     alignItems: "center",
//     gap: "6px",
//     padding: "8px 12px",
//     background: "linear-gradient(135deg, rgba(208, 188, 255, 0.2) 0%, rgba(208, 188, 255, 0.3) 100%)",
//     color: "#D0BCFF",
//     fontWeight: "400",
//     fontSize: "12px",
//     borderRadius: "20px",
//     border: "1px solid #D0BCFF",
//     cursor: "pointer",
//     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease",
//     boxShadow: "0 2px 8px rgba(91, 33, 182, 0.2)",
//     outline: "none",
//     position: "relative",
//     overflow: "hidden",
//   };

//   const hoverButtonStyle = {
//     background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)",
//     color: "#ffffff",
//     transform: "scale(1.05)",
//     boxShadow: "0 4px 12px rgba(91, 33, 182, 0.4)",
//     animation: "bounce 0.3s ease",
//   };

//   const focusButtonStyle = {
//     background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)",
//     color: "#ffffff",
//     boxShadow: "0 0 0 3px rgba(208, 188, 255, 0.4), 0 4px 12px rgba(91, 33, 182, 0.4)",
//     transform: "scale(1.05)",
//     animation: "bounce 0.3s ease",
//   };

//   const baseIconStyle = {
//     transition: "transform 0.3s ease",
//   };

//   const hoverIconStyle = {
//     transform: "translateX(-2px)",
//   };

//   const buttonStyle = {
//     ...baseButtonStyle,
//     ...(isHovered ? hoverButtonStyle : {}),
//     ...(isFocused ? focusButtonStyle : {}),
//   };

//   const iconStyle = {
//     ...baseIconStyle,
//     ...(isHovered || isFocused ? hoverIconStyle : {}),
//   };

//   const keyframes = `
//     @keyframes bounce {
//       0% { transform: scale(1); }
//       50% { transform: scale(1.1); }
//       100% { transform: scale(1.05); }
//     }
//   `;

//   return (
//     <>
//       <style>{keyframes}</style>
//       <button
//         onClick={() => {
//           console.log("BackHomeButton: Navigating to home");
//           navigate("/");
//         }}
//         style={buttonStyle}
//         onMouseEnter={() => {
//           console.log("BackHomeButton: Hover started");
//           setIsHovered(true);
//         }}
//         onMouseLeave={() => {
//           console.log("BackHomeButton: Hover ended");
//           setIsHovered(false);
//         }}
//         onFocus={() => {
//           console.log("BackHomeButton: Focus started");
//           setIsFocused(true);
//         }}
//         onBlur={() => {
//           console.log("BackHomeButton: Focus ended");
//           setIsFocused(false);
//         }}
//       >
//         <span style={iconStyle}>
//           <FiArrowLeft size={16} />
//         </span>
//         Back
//       </button>
//     </>
//   );
// };

// export default BackHomeButton;












import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackHomeButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Get the origin page from location.state, default to "/"
  const origin = location.state?.origin || "/";

  const baseButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    background: "linear-gradient(135deg, rgba(208, 188, 255, 0.2) 0%, rgba(208, 188, 255, 0.3) 100%)",
    color: "#D0BCFF",
    fontWeight: "400",
    fontSize: "12px",
    borderRadius: "20px",
    border: "1px solid #D0BCFF",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease",
    boxShadow: "0 2px 8px rgba(91, 33, 182, 0.2)",
    outline: "none",
    position: "relative",
    overflow: "hidden",
  };

  const hoverButtonStyle = {
    background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)",
    color: "#ffffff",
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(91, 33, 182, 0.4)",
    animation: "bounce 0.3s ease",
  };

  const focusButtonStyle = {
    background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)",
    color: "#ffffff",
    boxShadow: "0 0 0 3px rgba(208, 188, 255, 0.4), 0 4px 12px rgba(91, 33, 182, 0.4)",
    transform: "scale(1.05)",
    animation: "bounce 0.3s ease",
  };

  const baseIconStyle = {
    transition: "transform 0.3s ease",
  };

  const hoverIconStyle = {
    transform: "translateX(-2px)",
  };

  const buttonStyle = {
    ...baseButtonStyle,
    ...(isHovered ? hoverButtonStyle : {}),
    ...(isFocused ? focusButtonStyle : {}),
  };

  const iconStyle = {
    ...baseIconStyle,
    ...(isHovered || isFocused ? hoverIconStyle : {}),
  };

  const keyframes = `
    @keyframes bounce {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1.05); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <button
        onClick={() => {
          console.log("BackHomeButton: Navigating to", origin);
          navigate(origin);
        }}
        style={buttonStyle}
        onMouseEnter={() => {
          console.log("BackHomeButton: Hover started");
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          console.log("BackHomeButton: Hover ended");
          setIsHovered(false);
        }}
        onFocus={() => {
          console.log("BackHomeButton: Focus started");
          setIsFocused(true);
        }}
        onBlur={() => {
          console.log("BackHomeButton: Focus ended");
          setIsFocused(false);
        }}
      >
        <span style={iconStyle}>
          <FiArrowLeft size={16} />
        </span>
        Back
      </button>
    </>
  );
};

export default BackHomeButton;