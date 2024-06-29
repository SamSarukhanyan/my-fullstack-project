import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import FilterComponent from "../filter/FilterComponent.jsx";
import { useFilterContext } from "../../../context/FilterContext.js";
import Watch from "./watch/Watch.jsx";
import "./homeLayout.css";

const HomeLayout = () => {
  document.title = 'Living Invest';
  const location = useLocation();
  const shouldShowFilter = !location.pathname.includes("/properties/");
  const { setFilters } = useFilterContext();

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <section className="home_layout">
      <div className="background">
      <Watch />
        <div className="background-content">
          <h2>Living Invest</h2>
          <p>Բարի գալուստ Մեր կայք</p>
          <p>Ձեր ուղին դեպի ձեր երազանքի սեփականություն.</p>
        </div>
      <div className="advertising">
        <span>Այստեղ կարող է լինել ձեր գովազդը</span>
      </div>
      </div>
      <div className="root">
        <div className="home_container">
          {shouldShowFilter && (
            <FilterComponent onFilterChange={handleFilterChange} />
          )}
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLayout;
