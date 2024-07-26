// src/components/Common/header/Header.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import SearchComponent from "../search/SearchComponent";
import { useSearchContext } from "../../../context/SearchContext";
import { useDimmingContext } from "../../../context/DimmingContext";
import "./header.css";

const Header = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const { searchTerm, handleSearch, handleClearSearch } = useSearchContext();
  const { enableDimming, disableDimming } = useDimmingContext();

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
      <div className="nav_search">
        <SearchComponent
          searchTerm={searchTerm}
          setSearchTerm={handleSearch}
          onSearch={handleSearch}
          onClear={handleClearSearch}
          onFocus={enableDimming}
          disableDimming={disableDimming}
        />
      </div>
      <ul>
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
