import React from "react";
import { NavLink } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
  document.title = "Not-Found";
  return (
    <section className="Not-Found">
      <h1>Page Not found</h1>

      <NavLink to="/">Go to home page</NavLink>
    </section>
  );
};

export default NotFound;
