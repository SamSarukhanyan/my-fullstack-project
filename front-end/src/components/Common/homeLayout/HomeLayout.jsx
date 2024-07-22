import React, { useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import FilterComponent from "../filter/FilterComponent.jsx";
import { useFilterContext } from "../../../context/FilterContext.js";
import Watch from "./watch/Watch.jsx";
import TopProperties from "../topProperties/TopProperties.jsx";
import { PUBLIC_URL } from "../../../config/config";
import axios from "axios";
import Marquee from "../homeLayout/marquee/Marquee.jsx"; 
import { useDimmingContext } from "../../../context/DimmingContext"; // Import DimmingContext
import filterOptions from "./../../../data/data.json"; // Import filterOptions
import "./homeLayout.css";

const HomeLayout = () => {
  document.title = "Living Invest";
  const location = useLocation();
  const shouldShowFilter = !location.pathname.includes("/properties/");
  const { filters, setFilters } = useFilterContext(); // Destructure filters and setFilters
  const [topProperties, setTopProperties] = useState([]);
  const { isDimmed } = useDimmingContext(); // Use DimmingContext

  useEffect(() => {
    const fetchTopProperties = async () => {
      try {
        const response = await axios.get(`${PUBLIC_URL}/api/properties?propertyStatus=top`);
        setTopProperties(response.data.properties);
      } catch (error) {
        console.error("Failed to fetch top properties", error);
      }
    };
    fetchTopProperties();
  }, []);

  return (
    <div className={`home-layout ${isDimmed ? "dimmed" : ""}`}>
      <header>
        <h1>Living Invest</h1>
        {/* Other header content */}
      </header>
      <main>
        {shouldShowFilter && (
          <FilterComponent onFilterChange={(newFilters) => setFilters(newFilters)} />
        )}
        <Outlet />
        {filters.category && (
          <div className="category-links-bottom">
            {Object.keys(filterOptions.categories).map((key) => (
              <Link
                key={key}
                to={`/category/${key}`}
                onClick={() => setFilters({ ...filters, category: key })}
                className={`category-link ${
                  filters.category === key ? "active" : ""
                }`}
              >
                {filterOptions.categories[key]}
              </Link>
            ))}
          </div>
        )}
        <Watch />
        <TopProperties properties={topProperties} />
        <Marquee />
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default HomeLayout;
