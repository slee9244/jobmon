import React from "react";
import { useAlert } from "../context/AlertContext"; // Adjust the import path as necessary
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const Alert = () => {
  const { state } = useAlert();
  const { message, type } = state;

  if (!message) return null;

  let alertClasses = "px-4 py-2 rounded-lg mb-4 text-center flex items-center ";
  let icon = null;

  if (type === "success") {
    alertClasses += "bg-green-100 text-green-700";
    icon = <FaCheckCircle className="text-green-500 mr-2" />;
  } else if (type === "error") {
    alertClasses += "bg-red-100 text-red-700";
    icon = <FaExclamationCircle className="text-red-500 mr-2" />;
  } else if (type === "warning") {
    alertClasses += "bg-yellow-100 text-yellow-700";
    icon = <FaExclamationTriangle className="text-yellow-500 mr-2" />;
  } else {
    alertClasses += "bg-blue-100 text-blue-700"; // Default to info
    icon = <FaInfoCircle className="text-blue-500 mr-2" />;
  }

  return (
    <div className={alertClasses}>
      {icon}
      <p>{message}</p>
    </div>
  );
};

export default Alert;
