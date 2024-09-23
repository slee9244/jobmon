import { useCallback, useEffect, useState } from "react";
import personIcon from "../assets/person.png";
import { Link } from "react-router-dom";
import useAuth from "../context/AuthContext";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  // Toggle menu visibility
  const handleButtonClick = useCallback((e) => {
    e.stopPropagation(); // Prevent clicks from closing the menu
    setIsOpen((prev) => !prev); // Toggle menu open/close
  }, []);

  // Close menu if clicking outside
  useEffect(() => {
    if (!isOpen) return; // Only add listener if menu is open

    const handleClickOutside = () => setIsOpen(false); // Function to close menu
    window.addEventListener("click", handleClickOutside); // Add listener

    // Cleanup listener when component unmounts or menu closes
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        className="bg-transparent border-none cursor-pointer p-0"
        onClick={handleButtonClick}
      >
        <img src={personIcon} alt="User Menu" className="w-8 h-8" />
      </button>
      {isOpen && (
        <ul className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden flex flex-col">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
            <Link to="/login" className="text-red-700" onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
