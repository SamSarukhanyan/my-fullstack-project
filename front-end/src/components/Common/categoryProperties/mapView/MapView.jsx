import React, { useState, useEffect, useRef, useCallback } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PUBLIC_URL } from '../../../../config/config.js';
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
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(10);
  const mapRef = useRef(null);
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

  return (
    <div className="fullScreenMap">
      {apiKey ? (
        <YMaps query={{ apikey: apiKey, lang: "en_US" }}>
          <Map instanceRef={mapRef} defaultState={{ center: [41.0379, 44.6869], zoom: zoom }} width="100%" height="100vh">
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
      {selectedProperty && (
        <div className="property-details">
          <div className="property-card">
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
        </div>
      )}
      <button className="closeMapButton" onClick={handleCloseMap}>✕</button>
      <button className="zoomInButton" onClick={handleZoomIn}>+</button>
      <button className="zoomOutButton" onClick={handleZoomOut}>−</button>
    </div>
  );
};

export default MapView;