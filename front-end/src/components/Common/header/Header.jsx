import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthContext.js";
import "./header.css";

const Header = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const navLinks = [
    { path: "/admin/properties", text: "Your Properties" },
    {
      path: "/admin/add-property",
      text: "Add Property",
      className: "add-property-link",
    },
    { path: "/login", text: "Exit", onClick: handleLogout },
  ];

  return (
    <nav className="nav_root">
      <NavLink className="logo_root" to="/">
        <div className="logo">Living Invest</div>
      </NavLink>
      <ul>
        <li>
          {/* <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav__active" : "")}
          >
            Home
          </NavLink> */}
        </li>
        {isLoggedIn &&
          navLinks.map((link, index) => (
            <li key={index}>
              {link.onClick ? (
                <button onClick={link.onClick}>{link.text}</button>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `${isActive ? "nav__active" : ""} ${link.className || ""}`
                  }
                >
                  {link.text}
                </NavLink>
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Header;
