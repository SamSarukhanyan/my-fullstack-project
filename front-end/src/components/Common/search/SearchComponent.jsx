import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import { useSearchContext } from "../../../context/SearchContext";
import { useDimmingContext } from "../../../context/DimmingContext";
import { useNavigate, useLocation } from "react-router-dom";
import './searchComponent.css';

const SearchComponent = () => {
  const { searchTerm, handleSearch, handleClearSearch } = useSearchContext();
  const { disableDimming, enableDimming } = useDimmingContext();
  const [inputValue, setInputValue] = useState(searchTerm);
  const [showClearButton, setShowClearButton] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowClearButton(inputValue.length > 0);
  }, [inputValue]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setInputValue(query);
    handleSearch(query);
  }, [location.search, handleSearch]);

  const updateURL = (value) => {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    navigate({ search: params.toString() });
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(inputValue);
      disableDimming();
      updateURL(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue("");
    handleClearSearch();
    disableDimming();
    updateURL("");
  };

  const handleFocus = () => {
    enableDimming();
  };

  const handleClickOutside = useCallback((e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      disableDimming();
    }
  }, [disableDimming]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="search-container" ref={inputRef}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={handleFocus}
        onKeyPress={handleSearchKeyPress}
        placeholder="Search by ID, region, or subregion"
      />
      {showClearButton && (
        <button className="clear" onClick={handleClear}>
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchComponent;
