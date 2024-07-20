import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import './searchComponent.css';

const SearchComponent = ({ searchTerm, setSearchTerm, onSearch, onClear, onFocus, disableDimming }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const [showClearButton, setShowClearButton] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      setShowClearButton(true);
    } else {
      setShowClearButton(false);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(inputValue);
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
    onClear();
  };

  const handleFocus = () => {
    onFocus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
        onKeyPress={handleKeyPress}
        placeholder="Search by ID, region, or subregion"
      />
       {showClearButton && (
        <button className="clear" onClick={handleClear}>
          <FaTimes/>
        </button>
      )}
      <button onClick={handleSearch}>
        <FaSearch  />
      </button>
     
    </div>
  );
};

export default SearchComponent;
