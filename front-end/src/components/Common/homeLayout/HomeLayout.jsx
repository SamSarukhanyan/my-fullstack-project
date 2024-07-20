import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FilterComponent from "../filter/FilterComponent.jsx";
import { useFilterContext } from "../../../context/FilterContext.js";
import Watch from "./watch/Watch.jsx";
import TopProperties from "../topProperties/TopProperties.jsx";
import { PUBLIC_URL } from "../../../config/config";
import axios from "axios";
import Marquee from "../homeLayout/marquee/Marquee.jsx"; // Импортируйте новый компонент
import "./homeLayout.css";

const HomeLayout = () => {
  document.title = "Living Invest";
  const location = useLocation();
  const shouldShowFilter = !location.pathname.includes("/properties/");
  const { setFilters } = useFilterContext();
  const [topProperties, setTopProperties] = useState([]);

  useEffect(() => {
    const fetchTopProperties = async () => {
      try {
        const response = await axios.get(`${PUBLIC_URL}/api/properties?propertyStatus=top`);
        setTopProperties(response.data.properties);
      } catch (error) {
        console.error("Error fetching top properties:", error);
      }
    };

    fetchTopProperties();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <section className="home_layout">
      
      <div className="background">
        <Watch />
        <div className="background-content">
          <h2>Living Invest</h2>
          <p>Welcome to our website</p>
          <p>Your path to your dream property.</p>
        </div>
        <div className="advertising">
          <span>Your ad can be here</span>
        </div>
      </div>
      <div className="root">
        <div className="home_container">
        <Marquee /> 
          {shouldShowFilter && (
            <FilterComponent onFilterChange={handleFilterChange} />
          )}
          <div className="content">
            <Outlet />
          </div>
          <div className="topProperties">
            <TopProperties topProperties={topProperties} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLayout;
