import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
      {/* Error Message */}
      <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg md:text-2xl text-gray-600 mb-4 md:mb-8 text-center">
        Page Not Found
      </p>
      <p className="text-sm md:text-lg text-gray-500 mb-8 md:mb-12 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Back Home Button */}
      <button
        onClick={handleGoHome}
        className="button-primary border-black border-2"
      >
        <FaArrowLeft className="mr-2" />
        Back to Home
      </button>
    </div>
  );
};

export default Error;
