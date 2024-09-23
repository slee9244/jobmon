// src/components/MenuItem.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = ({ to, onClick, children, className = "" }) => (
  <NavLink
    to={to}
    end
    onClick={onClick}
    className={`block px-4 py-2 text-right underline-offset-4 ${className}`}
    style={({ isActive }) => ({
      textDecoration: isActive ? "underline" : "none",
    })}
  >
    {children}
  </NavLink>
);

export default MenuItem;
