import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useFilterContext } from "../../../context/FilterContext.js";
import { usePropertyContext } from "../../../context/PropertyContext.js";
import { useDimmingContext } from "../../../context/DimmingContext.js";
import { PUBLIC_URL } from "../../../config/config.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaTh, FaThList } from "react-icons/fa";
import SearchComponent from "../search/SearchComponent.jsx";

const fetchPropertiesList = async (filters, search, page, limit) => {
  const queryObject = { page, limit };

  if (search) {
    queryObject.search = search;
  } else {
    if (
      filters.priceRange &&
      filters.priceRange.from !== "" &&
      filters.priceRange.to !== ""
    ) {
      queryObject.priceRange = JSON.stringify(filters.priceRange); 
    }

    if (filters.searchFields && Object.keys(filters.searchFields).length > 0) {
      queryObject.searchFields = JSON.stringify(filters.searchFields); 
    }

    if (filters.region) {
      queryObject.region = filters.region;
    }

    if (filters.subregion) {
      queryObject.subregion = filters.subregion;
    }

    if (filters.currency) {
      queryObject.currency = filters.currency;
    }

    if (filters.propertyId) {
      queryObject.propertyId = filters.propertyId;
    }
  }

  const queryString = new URLSearchParams(queryObject).toString();

  const { data } = await axios.get(
    `${PUBLIC_URL}/api/properties?${queryString}`
  );
  return data;
};

const itemsPerPage = 9;

const PropertiesList = () => {
  const { filters, setFilters } = useFilterContext();
  const { properties, setProperties } = usePropertyContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDimmed, enableDimming, disableDimming } = useDimmingContext();
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [skeletonCount, setSkeletonCount] = useState(itemsPerPage);
  const [showSkeletons, setShowSkeletons] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set("search", searchTerm);
    }

    Object.keys(filters).forEach((key) => {
      if (
        filters[key] &&
        (typeof filters[key] === "string"
          ? filters[key]
          : Object.keys(filters[key]).length > 0)
      ) {
        if (typeof filters[key] === "object") {
          params.set(key, JSON.stringify(filters[key]));
        } else {
          params.set(key, filters[key]);
        }
      }
    });

    params.set("page", currentPage);

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [filters, searchTerm, currentPage, navigate, location.pathname]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const filtersFromParams = {};
    for (let [key, value] of params.entries()) {
      try {
        filtersFromParams[key] = JSON.parse(value);
      } catch (e) {
        filtersFromParams[key] = value;
      }
    }

    if (filtersFromParams.search) {
      setSearchTerm(filtersFromParams.search);
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      ...filtersFromParams,
    }));
    setCurrentPage(
      filtersFromParams.page ? parseInt(filtersFromParams.page, 10) : 1
    );
  }, [location.search, setFilters]);

  useEffect(() => {
    if (isFiltersApplied) {
      updateUrlParams();
    }
  }, [filters, searchTerm, currentPage, updateUrlParams, isFiltersApplied]);

  const { data, isLoading, isError, refetch } = useQuery(
    ["propertiesList", filters, searchTerm, currentPage],
    () => fetchPropertiesList(filters, searchTerm, currentPage, itemsPerPage),
    {
      keepPreviousData: true,
      onError: (err) => {
        setError(
          err.response ? err.response.data.message : "Error loading properties"
        );
      },
    }
  );

  useEffect(() => {
    if (data) {
      setShowSkeletons(true);
      setSkeletonCount(itemsPerPage);
      const timeoutId = setTimeout(() => {
        setSkeletonCount(data.totalCount);
        setShowSkeletons(false);
        setProperties(data.properties);
        setError(null);
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [data, setProperties]);

  const formatImagePath = (imagePath) => {
    return imagePath.replace(/\\/g, "/");
  };

  const handleViewDetails = (id) => {
    navigate(`/properties/${id}`);
  };

  const handlePageChange = (page, event) => {
    event.preventDefault();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    refetch();
    setCurrentPage(1);
    disableDimming();
    setIsFiltersApplied(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    disableDimming();
    setCurrentPage(1);
    refetch();
    setIsFiltersApplied(true);
  };

  const handleFocus = () => {
    enableDimming();
  };

  const totalPages = data ? Math.ceil(data.totalCount / itemsPerPage) : 1;

  const renderSkeletons = (count) => {
    return Array(count)
      .fill()
      .map((_, index) => (
        <div key={index} className="product_card">
          <div className="product_images">
            <Skeleton
              className="skeleton"
              height={200}
              baseColor="#D3D3D3"
              highlightColor="#F6F6F6"
            />
          </div>
          <div className="product_title">
            <Skeleton
              className="skeleton"
              width="80%"
              baseColor="#D3D3D3"
              highlightColor="#f5f5f5"
            />
          </div>
          <div>
            <Skeleton
              className="skeleton"
              width="50%"
              baseColor="#D3D3D3"
              highlightColor="#f5f5f5"
            />
          </div>
          <div className="product_price">
            <Skeleton
              className="skeleton"
              width="45%"
              baseColor="#D3D3D3"
              highlightColor="#f5f5f5"
            />
          </div>
          <div>
            <Skeleton
              className="skeleton"
              width="48%"
              baseColor="#D3D3D3"
              highlightColor="#f5f5f5"
            />
          </div>
          <div className="product_details">
            <Skeleton
              className="skeleton"
              width="60px"
              height="35px"
              baseColor="#D3D3D3"
              highlightColor="#f5f5f5"
            />
          </div>
        </div>
      ));
  };

  const showResultsMessage =
    searchTerm !== "" ||
    filters.priceRange?.from !== "" ||
    filters.priceRange?.to !== "" ||
    filters.region ||
    filters.subregion ||
    filters.currency ||
    filters.propertyId ||
    Object.keys(filters.searchFields).length > 0;

  return (
    <section className="root">
    
      <div className={`products_block ${isDimmed ? "dimmed" : ""}`}>
        <h2>Все Недвижимости</h2>
        <SearchComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          onClear={handleClearSearch}
          onFocus={handleFocus}
          disableDimming={disableDimming}
        />
        {showResultsMessage && (
          <div className="results_message">
            <span>
              По вашему запросу найдено {data ? data.totalCount : 0}{" "}
              результат(ов)
            </span>
          </div>
        )}
        <div className="view_toggle">
          <FaTh
            className={`view_icon ${isGridView ? "active" : ""}`}
            onClick={() => setIsGridView(true)}
          />
          <FaThList
            className={`view_icon ${!isGridView ? "active" : ""}`}
            onClick={() => setIsGridView(false)}
          />
        </div>
        {isLoading || showSkeletons ? (
          <div className="products_container">
            {renderSkeletons(skeletonCount)}
          </div>
        ) : isError ? (
          <div className="error_message">{error}</div>
        ) : (
          <div
            className={`products_container ${
              isGridView ? "grid_view" : "list_view"
            }`}
          >
            {properties && properties.length > 0 ? (
              properties.map((property) => (
                <div
                  key={property.id}
                  className="product_card"
                  onClick={() => handleViewDetails(property.id)}
                >
                  <div className="product_images">
                    {property.photos && property.photos.length > 0 ? (
                      <img
                        src={`${PUBLIC_URL}/${formatImagePath(
                          property.photos[0]
                        )}`}
                        alt="Property"
                        className="product_image"
                      />
                    ) : (
                      <div>No images available</div>
                    )}
                  </div>
                  <div className="bottom_content">
                    <div className="product_price">
                      {property.price} {property.currency}
                    </div>
                    <div className="product_title">
                      Category: {property.category}
                    </div>
                    <div className="product_title">
                      Property ID: {property.propertyId}
                    </div>
                    <div className="product_title">
                      Region: {property.region}
                    </div>
                    <div className="product_title">
                      Subregion: {property.subregion}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no_results_message">
                Не найдено никакой информации, соответствующей Вашему запросу.
                <br />
                Убедитесь, что слова написаны без ошибок
                <br />
                Попробуйте использовать другие ключевые слова
                <br />
                Попробуйте использовать более популярные ключевые слова
              </div>
            )}
          </div>
        )}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={(e) => handlePageChange(Math.max(currentPage - 1, 1), e)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={(e) => handlePageChange(index + 1, e)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={(e) =>
                handlePageChange(Math.min(currentPage + 1, totalPages), e)
              }
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesList;
