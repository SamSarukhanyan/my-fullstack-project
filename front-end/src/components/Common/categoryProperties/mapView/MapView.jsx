import React, { useState, useEffect, useRef, useCallback } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_URL } from '../../../../config/config.js';
import './mapView.css';
import FilterComponent from '../../filter/FilterComponent.jsx';

const MapView = ({ category }) => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(10);
  const mapRef = useRef(null);

  const fetchProperties = useCallback(async (filters = {}) => {
    try {
      const validFilters = {};
      if (filters.region) validFilters.region = filters.region;
      if (filters.subregion) validFilters.subregion = filters.subregion;
      if (filters.priceRange) {
        validFilters.priceRange = {};
        if (filters.priceRange.from) validFilters.priceRange.from = filters.priceRange.from.trim();
        if (filters.priceRange.to) validFilters.priceRange.to = filters.priceRange.to.trim();
      }
      if (filters.currency) validFilters.currency = filters.currency;
      if (filters.searchFields && Object.keys(filters.searchFields).length > 0) {
        validFilters.searchFields = filters.searchFields;
      }

      const response = await axios.get(`${PUBLIC_URL}/api/properties/category/${category}`, { params: validFilters });
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }, [category]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleZoomIn = () => {
    if (mapRef.current) {
      const newZoom = Math.min(zoom + 1, 18);
      mapRef.current.setZoom(newZoom, { duration: 300 });
      setZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const newZoom = Math.max(zoom - 1, 1);
      mapRef.current.setZoom(newZoom, { duration: 300 });
      setZoom(newZoom);
    }
  };

  const handleCloseMap = () => {
    navigate(-1); // Возвращаемся на предыдущую страницу
  };

  const handleFilterChange = useCallback((updatedFilters) => {
    fetchProperties(updatedFilters);
  }, [fetchProperties]);

  return (
    <div className="fullScreenMap">
      <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY, lang: "en_US" }}>
        <Map instanceRef={mapRef} defaultState={{ center: [41.0379, 44.6869], zoom: zoom }} width="100%" height="100vh">
          {properties.map((property) => (
            <Placemark
              key={property.id}
              geometry={[property.lat, property.lng]}
              properties={{ balloonContent: `${property.price} ${property.currency}` }}
            />
          ))}
        </Map>
      </YMaps>
      <div className="map-view-filter">
        <FilterComponent onFilterChange={handleFilterChange} isMapView={true} />
      </div>
      <button className="closeMapButton" onClick={handleCloseMap}>✕</button>
      <button className="zoomInButton" onClick={handleZoomIn}>+</button>
      <button className="zoomOutButton" onClick={handleZoomOut}>−</button>
    </div>
  );
};

export default MapView;
