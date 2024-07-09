import React, { useState, useEffect, useRef, useCallback } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PUBLIC_URL } from '../../../../config/config.js';
import { motion, AnimatePresence } from 'framer-motion';
import './mapView.css';
import FilterComponent from '../../filter/FilterComponent.jsx';

const fetchPropertiesByCategory = async (category, filters) => {
  const queryObject = {
    ...filters,
    priceRange: filters.priceRange ? JSON.stringify(filters.priceRange) : "{}",
    searchFields: filters.searchFields ? JSON.stringify(filters.searchFields) : "{}",
  };

  const queryString = new URLSearchParams(queryObject).toString();

  const { data } = await axios.get(`${PUBLIC_URL}/api/properties/category/${category}?${queryString}`);
  return data;
};

const MapView = () => {
  const { category } = useParams();
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapState, setMapState] = useState({ center: [41.0379, 44.6869], zoom: 10 });
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const propertyDetailsRef = useRef(null);
  const apiKey = process.env.REACT_APP_YANDEX_MAPS_API_KEY;

  const fetchProperties = useCallback(async (filters = {}) => {
    try {
      const data = await fetchPropertiesByCategory(category, filters);
      setProperties(data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }, [category]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    if (properties.length > 0) {
      const bounds = properties.reduce((acc, property) => {
        return [
          Math.min(acc[0], property.lat),
          Math.min(acc[1], property.lng),
          Math.max(acc[2], property.lat),
          Math.max(acc[3], property.lng)
        ];
      }, [properties[0].lat, properties[0].lng, properties[0].lat, properties[0].lng]);

      const center = [(bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2];
      const zoom = Math.min(18, Math.max(1, Math.log2(360 / Math.max(bounds[2] - bounds[0], bounds[3] - bounds[1]))));

      setMapState({ center, zoom });
    }
  }, [properties]);

  const handleZoomIn = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(Math.min(currentZoom + 1, 18), { duration: 300 });
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(Math.max(currentZoom - 1, 1), { duration: 300 });
    }
  };

  const handleCloseMap = () => {
    navigate(-1);
  };

  const handleFilterChange = useCallback((updatedFilters) => {
    fetchProperties(updatedFilters);
  }, [fetchProperties]);

  const handlePlacemarkClick = (property) => {
    setSelectedProperty(property);
  };

  const formatImagePath = (imagePath) => {
    return `${PUBLIC_URL}/${imagePath.replace(/\\/g, '/')}`;
  };

  const handleClosePropertyDetails = () => {
    setSelectedProperty(null);
  };

  const handleClickOutside = useCallback((event) => {
    if (propertyDetailsRef.current && !propertyDetailsRef.current.contains(event.target)) {
      handleClosePropertyDetails();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="fullScreenMap">
      {apiKey ? (
        <YMaps query={{ apikey: apiKey, lang: "en_US" }}>
          <Map
            instanceRef={mapRef}
            state={mapState}
            width="100%"
            height="100vh"
          >
            {properties.map((property) => (
              <Placemark
                key={property.id}
                geometry={[property.lat, property.lng]}
                properties={{
                  iconContent: `<div class="customPlacemark">${property.price} ${property.currency}</div>`
                }}
                options={{
                  preset: 'islands#blueStretchyIcon'
                }}
                onClick={() => handlePlacemarkClick(property)}
              />
            ))}
          </Map>
        </YMaps>
      ) : (
        <div>Yandex Maps API key is not defined</div>
      )}
      <div className="map-view-filter">
        <FilterComponent onFilterChange={handleFilterChange} isMapView={true} />
      </div>
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            className="property-details"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            ref={propertyDetailsRef}
          >
            <div className="property-card">
              <button className="closePropertyDetailsButton" onClick={handleClosePropertyDetails}>✕</button>
              <div className="property-images">
                {selectedProperty.photos && selectedProperty.photos.length > 0 ? (
                  <img src={formatImagePath(selectedProperty.photos[0])} alt="Property" />
                ) : (
                  <div>No images available</div>
                )}
              </div>
              <div className="property-info">
                <h3>{selectedProperty.price} {selectedProperty.currency}</h3>
                <p>Category: {selectedProperty.category}</p>
                <p>Region: {selectedProperty.region}</p>
                <p>Subregion: {selectedProperty.subregion}</p>
                {/* Add more property details as needed */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="closeMapButton" onClick={handleCloseMap}>✕</button>
      <button className="zoomInButton" onClick={handleZoomIn}>+</button>
      <button className="zoomOutButton" onClick={handleZoomOut}>−</button>
    </div>
  );
};

export default MapView;
