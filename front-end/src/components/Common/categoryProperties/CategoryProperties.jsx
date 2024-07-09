import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useFilterContext } from "../../../context/FilterContext.js";
import { useDimmingContext } from "../../../context/DimmingContext.js";
import { PUBLIC_URL } from "../../../config/config.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaTh, FaThList } from "react-icons/fa";
import SearchComponent from "../search/SearchComponent.jsx";
import MapView from "./mapView/MapView.jsx";
import "./categoryProperties.css";
import "../propertyList/propertyList.css";

const fetchPropertiesByCategory = async (category, filters, search, page, limit) => {
  const queryObject = {
    ...filters,
    page,
    limit,
    search,
    priceRange: filters.priceRange ? JSON.stringify(filters.priceRange) : "{}", 
    searchFields: filters.searchFields ? JSON.stringify(filters.searchFields) : "{}",
  };

  const queryString = new URLSearchParams(queryObject).toString();

  const { data } = await axios.get(`${PUBLIC_URL}/api/properties/category/${category}?${queryString}`);
  return data;
};

const itemsPerPage = 9;

const CategoryProperties = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { filters, setFilters } = useFilterContext();
  const { isDimmed, enableDimming, disableDimming } = useDimmingContext();
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [skeletonCount, setSkeletonCount] = useState(itemsPerPage);
  const [showSkeletons, setShowSkeletons] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    ["categoryProperties", category, filters, searchTerm, currentPage],
    () =>
      fetchPropertiesByCategory(
        category,
        filters,
        searchTerm,
        currentPage,
        itemsPerPage
      ),
    {
      keepPreviousData: true,
      onError: (err) => {
        setError(
          err.response ? err.response.data.message : "Error loading properties"
        );
      },
    }
  );

  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set("search", searchTerm);
    }

    Object.keys(filters).forEach((key) => {
      if (filters[key] && (typeof filters[key] === 'string' ? filters[key] : Object.keys(filters[key]).length > 0)) {
        if (typeof filters[key] === "object") {
          params.set(key, JSON.stringify(filters[key]));
        } else {
          params.set(key, filters[key]);
        }
      }
    });

    params.set("page", currentPage);

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, searchTerm, navigate, location.pathname]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category,
    }));
    setCurrentPage(1);
  }, [category, setFilters]);

  useEffect(() => {
    if (isFiltersApplied) {
      updateUrlParams();
    }
  }, [filters, searchTerm, updateUrlParams, isFiltersApplied]);

  useEffect(() => {
    if (data) {
      setShowSkeletons(true);
      setSkeletonCount(itemsPerPage);
      const timeoutId = setTimeout(() => {
        setSkeletonCount(data.totalCount);
        setShowSkeletons(false);
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [data]);

  const formatImagePath = (imagePath) => {
    return imagePath.replace(/\\/g, "/");
  };

  const handlePageChange = (page) => {
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
          <div className="product_price">
            <Skeleton
              className="skeleton"
              width="40%"
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

  const urlParams = new URLSearchParams(location.search);
  const gl = urlParams.get('gl');

  return (
    <section className="category_section">
      {gl ? (
        <MapView category={category} filters={filters} />
      ) : (
        <>
          <div className="mapView" onClick={() => navigate(`${location.pathname}?gl=8`)}><span>View in Map</span></div>
          <div className={`products_block ${isDimmed ? "dimmed" : ""}`}>
            <h2>{category} объявления</h2>
            <div className="category_count">
              <span>Результаты поиска - </span>
              <p>
                {category}: {data ? data.totalCount : 0}
              </p>
            </div>
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
                По вашему запросу найдено {data ? data.totalCount : 0} результат(ов)
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
                {data && data.properties.length > 0 ? (
                  data.properties.map((property) => (
                    <div
                      key={property.id}
                      className="product_card"
                      onClick={() => navigate(`/properties/${property.id}`)}
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
                        <div className="product_title">
                          {property.price} {property.currency}{" "}
                        </div>
                        <div className="product_title">
                          Категория: {property.category}
                        </div>
                        <div className="product_title">id: {property.propertyId}</div>
                        <div className="product_title">Регион: {property.region}</div>
                        <div className="product_title">
                          Подрегион: {property.subregion}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2>{"По вашему запросу ничего не найдено"} </h2>
                )}
              </div>
            )}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default CategoryProperties;
