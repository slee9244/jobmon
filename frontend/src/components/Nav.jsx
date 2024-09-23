import React from "react";
import { Link } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import MenuItem from "../components/MenuItem";
import navLogo from "../assets/navLogo.svg";
import HamburgerIcon from "../assets/hamburgerIcon.svg";
import useAuth from "../context/AuthContext";

const Nav = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative z-10">
      <div className="py-4 bg-white shadow-md">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={navLogo}
              alt="Jobmon navLogo"
              className="w-40 md:w-48 lg:w-56 h-auto"
            />
          </Link>

          {/* Hamburger Menu Button (Visible on sm and smaller screens) */}
          <button className="md:hidden p-2" onClick={toggleMenu}>
            <img src={HamburgerIcon} alt="Menu" className="w-8 h-8" />
          </button>

          {/* Regular Navigation Links (Visible on md and larger screens) */}
          <ul className="hidden md:flex md:items-center md:space-x-8 list-none p-0 m-0">
            <MenuItem to="/">Job Stats</MenuItem>
            <MenuItem to="/jobs">All Jobs</MenuItem>
            <MenuItem to="/jobs/add">Add Job</MenuItem>
            <UserMenu />
          </ul>

          {/* Mobile Menu (Visible on sm and smaller screens) */}
          <ul
            className={`container md:hidden flex flex-col items-end list-none px-16 m-0 absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-md ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <MenuItem to="/" onClick={closeMenu}>
              Job Stats
            </MenuItem>
            <MenuItem to="/jobs" onClick={closeMenu}>
              All Jobs
            </MenuItem>
            <MenuItem to="/jobs/add" onClick={closeMenu}>
              Add Job
            </MenuItem>
            <MenuItem to="/profile" onClick={closeMenu}>
              Profile
            </MenuItem>
            <MenuItem to="/login" onClick={logout} className="text-red-700">
              Logout
            </MenuItem>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
