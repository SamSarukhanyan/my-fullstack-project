import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import "./filter.css";
import { advancedStyles, customStyles } from "./filterstyles.js";
import filterOptions from "./../../../data/data.json";
import searchFields from "./../../../data/searchFields.json";
import AMDFlag from '../../../assets/flags/AMD.png';
import USDFlag from '../../../assets/flags/USD.png';

const CheckboxOptions = ({
  filterLabel,
  filters,
  selectedCheckboxOptions,
  handleCheckboxChange,
  handleCheckboxApply,
  handleCheckboxReset,
  openedCheckboxes,
  menuPosition,
}) => {
  const checkboxRefs = useRef({});

  const animationVariants = {
    top: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    bottom: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  };

  return (
    <AnimatePresence>
      {openedCheckboxes[filterLabel] && (
        <motion.div
          ref={(el) => (checkboxRefs.current[filterLabel] = el)}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animationVariants[menuPosition]}
          transition={{ duration: 0.2 }}
          className={`checkbox-options show ${menuPosition}`}
          onClick={(e) => e.stopPropagation()}
        >
          {searchFields[filters.category].find((filter) => filter.label === filterLabel).options.map((option, idx) => (
            <div 
              className="checkbox" 
              key={idx}
              onClick={() => handleCheckboxChange(option.toString(), filterLabel)}
            >
              <div className="checkbox_children">
                <div className="checkedd">
                  <input
                    className="input_checkbox"
                    type="checkbox"
                    name={filterLabel}
                    value={option.toString()}
                    checked={
                      selectedCheckboxOptions[filterLabel]?.includes(option.toString()) || false
                    }
                    readOnly
                  />
                </div>
                <div className="checkbox-text"><span>{option}</span></div>
              </div>
            </div>
          ))}
          <div className="buttons">
            <button onClick={() => handleCheckboxApply(filterLabel)}>Выбрать</button>
            <button onClick={() => handleCheckboxReset(filterLabel)}>Отменить</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FilterComponent = ({ onFilterChange, isMapView }) => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: category || null,
    region: null,
    subregion: null,
    priceRange: { from: "", to: "" },
    currency: null,
    searchFields: {},
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSubregion, setShowSubregion] = useState(false);
  const [openedCheckboxes, setOpenedCheckboxes] = useState({});
  const [selectedCheckboxOptions, setSelectedCheckboxOptions] = useState({});
  const checkboxRefs = useRef({});
  const selectRefs = useRef({});
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  const updateUrlParams = useCallback(() => {
    if (isMapView) {
      onFilterChange(filters);
      return; 
    }

    const params = new URLSearchParams();

    Object.keys(filters).forEach(key => {
      if (filters[key] && key !== 'category') {
        if (typeof filters[key] === "object" && Object.keys(filters[key]).length > 0) {
          params.set(key, JSON.stringify(filters[key]));
        } else if (typeof filters[key] !== "object") {
          params.set(key, filters[key]);
        }
      }
    });

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [filters, navigate, location.pathname, isMapView, onFilterChange]);

  useEffect(() => {
    if (category) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category,
        region: null,
        subregion: null,
        priceRange: { from: "", to: "" },
        currency: null,
        searchFields: {},
      }));
      setShowAdvanced(false);
      setTimeout(() => setShowAdvanced(true), 100);
    }
  }, [category]);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(checkboxRefs.current).forEach((label) => {
        if (
          checkboxRefs.current[label] &&
          !checkboxRefs.current[label].contains(event.target)
        ) {
          setOpenedCheckboxes((prev) => ({
            ...prev,
            [label]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters.category]);

  useEffect(() => {
    if (location.pathname === "/") {
      setFilters({
        category: null,
        region: null,
        subregion: null,
        priceRange: { from: "", to: "" },
        currency: null,
        searchFields: {},
      });
      setShowAdvanced(false);
      navigate(`${location.pathname}`, { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleChange = useCallback((selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [name]: selectedOption ? selectedOption.value : null,
      };

      if (name === "region" && selectedOption) {
        const firstSubregion = filterOptions.regions[selectedOption.value][0];
        newFilters.subregion = firstSubregion;
        setShowSubregion(false);
        setTimeout(() => setShowSubregion(true), 100);
      }

      return newFilters;
    });
    setIsFiltersApplied(true);
  }, []);

  const handleUniqueFieldChange = useCallback((selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        searchFields: {
          ...prevFilters.searchFields,
          [name]: selectedOption ? selectedOption.value : "",
        },
      };
      return newFilters;
    });
    setIsFiltersApplied(true);
  }, []);

  const handleRangeChange = useCallback((e, fieldName) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        searchFields: {
          ...prevFilters.searchFields,
          [fieldName]: {
            ...prevFilters.searchFields[fieldName],
            [name]: value === "" ? "" : parseFloat(value),
          },
        },
      };
      return newFilters;
    });
    setIsFiltersApplied(true);
  }, []);

  const handlePriceChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        priceRange: {
          ...prevFilters.priceRange,
          [name]: value === "" ? "" : parseFloat(value),
        },
      };
      return newFilters;
    });
    setIsFiltersApplied(true);
  }, []);

  const handleCheckboxToggle = useCallback((filterLabel) => {
    setOpenedCheckboxes((prev) => {
      const newState = { ...prev, [filterLabel]: !prev[filterLabel] };

      if (!prev[filterLabel]) {
        const element = checkboxRefs.current[filterLabel];
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowCenter = windowHeight / 2;

        if (rect.top > windowCenter) {
          element.style.top = 'auto';
          element.style.bottom = '100%';
        } else {
          element.style.top = '100%';
          element.style.bottom = 'auto';
        }
      }

      return newState;
    });
  }, []);

  const handleCheckboxChange = useCallback((value, filterLabel) => {
    setSelectedCheckboxOptions((prevOptions) => {
      const isChecked = prevOptions[filterLabel]?.includes(value);

      const newOptions = isChecked
        ? (prevOptions[filterLabel] || []).filter((option) => option !== value)
        : [...(prevOptions[filterLabel] || []), value];

      return {
        ...prevOptions,
        [filterLabel]: newOptions,
      };
    });
  }, []);

  const handleCheckboxApply = useCallback((filterLabel) => {
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        searchFields: {
          ...prevFilters.searchFields,
          [filterLabel]: selectedCheckboxOptions[filterLabel] || [],
        },
      };
      return newFilters;
    });

    setOpenedCheckboxes((prev) => ({
      ...prev,
      [filterLabel]: false,
    }));
    setIsFiltersApplied(true);
  }, [selectedCheckboxOptions]);

  const handleCheckboxReset = useCallback((filterLabel) => {
    setSelectedCheckboxOptions((prevOptions) => ({
      ...prevOptions,
      [filterLabel]: [],
    }));

    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        searchFields: {
          ...prevFilters.searchFields,
          [filterLabel]: [],
        },
      };
      return newFilters;
    });
  }, []);

  const determineMenuPosition = useCallback((element) => {
    if (!element) return "bottom";

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowCenter = windowHeight / 2;

    if (rect.top > windowCenter) {
      return "top";
    } else {
      return "bottom";
    }
  }, []);

  const renderAdvancedFilters = useMemo(() => {
    const categoryFilters = filters.category
      ? searchFields[filters.category] || []
      : [];

    const truncatedPlaceholder = (str, num) => {
      const words = str.split(" ");
      if (words.length > 1) {
        const truncatedFirstWord = words[0].length > num ? words[0].slice(0, num) + '...' : words[0];
        return `${truncatedFirstWord}\n${words.slice(1).join(" ")}`;
      }
      return str.length > num ? str.slice(0, num) + '...' : str;
    };

    const truncateOptions = (options, maxLength = 15) => {
      if (options.length === 0) return null;
      const firstOption = options[0];
      const remainingLength = maxLength - firstOption.length;

      if (remainingLength >= 0) {
        if (options.length === 1) return firstOption;
        const secondOption = options[1].slice(0, remainingLength - 1);
        return `${firstOption}, ${secondOption}...`;
      }

      return `${firstOption.slice(0, maxLength - 3)}...`;
    };

    return categoryFilters.map((filter, index) => {
      const selectedOptions = filters.searchFields[filter.label] || [];

      if (filter.type === "select") {
        return (
          <div className="selectors" key={index} ref={(el) => (selectRefs.current[filter.label] = el)}>
            <Select
              placeholder={filter.label}
              name={filter.label}
              styles={advancedStyles}
              options={filter.options.map((option) => ({
                value: option,
                label: option,
              }))}
              onChange={(selectedOption) =>
                handleUniqueFieldChange(selectedOption, {
                  name: filter.label,
                })
              }
              isSearchable={false}
              isClearable={true}
              value={
                filters.searchFields[filter.label]
                  ? { value: filters.searchFields[filter.label], label: filters.searchFields[filter.label] }
                  : null
              }
              menuPlacement={determineMenuPosition(selectRefs.current[filter.label])}
            />
          </div>
        );
      } else if (filter.type === "text") {
        return (
          <label key={index} className="select__placeholder">{truncatedPlaceholder(filter.label, 7)}
            <input
              type="text"
              name={filter.label}
              placeholder={truncatedPlaceholder(filter.label, 7)}
              value={filters.searchFields[filter.label] || ""}
              onChange={(e) =>
                handleUniqueFieldChange(
                  { value: e.target.value },
                  { name: filter.label }
                )
              }
              className="select__placeholder"
            />
          </label>
        );
      } else if (filter.type === "range") {
        return (
          <div className="range-inputs" key={index}>
            <label className="range_label select__placeholder">{truncatedPlaceholder(filter.label, 7)}</label>
            <input
              className="range_input"
              type="number"
              step="any"
              name="from"
              placeholder="От"
              value={filters.searchFields[filter.label]?.from || ""}
              onChange={(e) => handleRangeChange(e, filter.label)}
            />
            <input
              className="range_input"
              type="number"
              step="any"
              name="to"
              placeholder="До"
              value={filters.searchFields[filter.label]?.to || ""}
              onChange={(e) => handleRangeChange(e, filter.label)}
            />
          </div>
        );
      } else {
        return (
          <div
            className="checkbox-select"
            onClick={() => handleCheckboxToggle(filter.label)}
            ref={(el) => (checkboxRefs.current[filter.label] = el)}
            key={index}
          >
            <div className="checkbox-select-label select__placeholder">
              {truncatedPlaceholder(filter.label, 7)}
              {selectedOptions.length > 0 && (
                <div className="selected-options">
                  {truncateOptions(selectedOptions)}
                </div>
              )}
              <span
                className={`arrow ${
                  openedCheckboxes[filter.label] ? "arrow-up" : "arrow-down"
                }`}
              ></span>
            </div>
            <CheckboxOptions
              filterLabel={filter.label}
              filters={filters}
              selectedCheckboxOptions={selectedCheckboxOptions}
              handleCheckboxChange={handleCheckboxChange}
              handleCheckboxApply={handleCheckboxApply}
              handleCheckboxReset={handleCheckboxReset}
              openedCheckboxes={openedCheckboxes}
              menuPosition={determineMenuPosition(checkboxRefs.current[filter.label])}
            />
          </div>
        );
      }
    });
  }, [
    filters,
    handleCheckboxApply,
    handleCheckboxChange,
    handleCheckboxReset,
    handleCheckboxToggle,
    handleRangeChange,
    handleUniqueFieldChange,
    determineMenuPosition,
    openedCheckboxes,
    selectedCheckboxOptions,
  ]);

  const handleResetFilters = () => {
    setFilters({
      category: filters.category,
      region: null,
      subregion: null,
      priceRange: { from: "", to: "" },
      currency: null,
      searchFields: {},
    });
    setSelectedCheckboxOptions({});
    setShowAdvanced(false);
    setTimeout(() => setShowAdvanced(true), 100);
    navigate(`${location.pathname}`, { replace: true });
    setIsFiltersApplied(false);
  };

  useEffect(() => {
    if (isFiltersApplied) {
      updateUrlParams();
      setIsFiltersApplied(false);
    }
  }, [filters, updateUrlParams, isFiltersApplied]);

  return (
    <div className={`filter-container ${isMapView ? 'map-view' : ''}`}>
      <div className="reset">
        <button onClick={handleResetFilters} className="reset-button">
          Reset filters
        </button>
      </div>
      {filterOptions.regions && (
        <div ref={(el) => (selectRefs.current["region"] = el)}>
          <Select
            className="region_select"
            name="region"
            placeholder="Регион"
            styles={customStyles}
            options={Object.keys(filterOptions.regions).map((region) => ({
              value: region,
              label: region,
            }))}
            onChange={handleChange}
            value={
              filters.region
                ? { value: filters.region, label: filters.region }
                : null
            }
            isClearable={true}
            menuPlacement={determineMenuPosition(selectRefs.current["region"])}
          />
        </div>
      )}
      {filters.region &&
        filterOptions.regions &&
        filterOptions.regions[filters.region] && (
          <div className={`subregion-select ${showSubregion ? "show" : ""}`} ref={(el) => (selectRefs.current["subregion"] = el)}>
            <Select
              className="subregion_select"
              name="subregion"
              placeholder="Подрегион"
              styles={customStyles}
              options={filterOptions.regions[filters.region].map(
                (subregion) => ({
                  value: subregion,
                  label: subregion,
                })
              )}
              onChange={handleChange}
              value={
                filters.subregion
                  ? { value: filters.subregion, label: filters.subregion }
                  : null
              }
              isClearable={true}
              menuPlacement={determineMenuPosition(selectRefs.current["subregion"])}
            />
          </div>
        )}
      <div className="price-inputs">
        <label>Цена</label>
        <input
          type="number"
          step="any"
          name="from"
          placeholder="От"
          value={filters.priceRange.from}
          onChange={handlePriceChange}
        />
        <input
          type="number"
          step="any"
          name="to"
          placeholder="До"
          value={filters.priceRange.to}
          onChange={handlePriceChange}
        />
      </div>
      <div ref={(el) => (selectRefs.current["currency"] = el)}>
        <Select
          className="currency_select"
          name="currency"
          placeholder="Валюта"
          styles={customStyles}
          options={[
            { value: "USD", label: <><img src={USDFlag} alt="USD" style={{ width: '20px', marginRight: '10px' }} />USD</> },
            { value: "AMD", label: <><img src={AMDFlag} alt="AMD" style={{ width: '20px', marginRight: '10px' }} />AMD</> }
          ]}
          onChange={handleChange}
          value={
            filters.currency
              ? { value: filters.currency, label: filters.currency === 'USD' ? <><img src={USDFlag} alt="USD" style={{ width: '20px', marginRight: '10px' }} />USD</> : <><img src={AMDFlag} alt="AMD" style={{ width: '20px', marginRight: '10px' }} />AMD</> }
              : null
          }
          isClearable={true}
          menuPlacement={determineMenuPosition(selectRefs.current["currency"])}
        />
      </div>
      {!filters.category && (
        <div className="category-links">
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
      <div className={`advanced-filters ${showAdvanced ? "show" : ""}`}>
        {renderAdvancedFilters}
      </div>
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
    </div>
  );
};

export default FilterComponent;
