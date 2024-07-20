// src/components/Common/propertyCard/PropertyCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_URL } from "../../../config/config.js";
import "./propertyCard.css";

const PropertyCard = ({ property, isGridView }) => {
  const navigate = useNavigate();

  const formatImagePath = (imagePath) => {
    return imagePath.replace(/\\/g, "/");
  };

  const cleanDateString = (dateString) => {
    return dateString.replace('T', ' ').replace('.000Z', '').replace(/-/g, '/');
  };

  const handleViewDetails = () => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <div
      className={`product_card ${isGridView ? "grid_view" : "list_view"}`}
      onClick={handleViewDetails}
    >
      <div className="product_images">
        {property.photos && property.photos.length > 0 ? (
          <img
            src={`${PUBLIC_URL}/${formatImagePath(property.photos[0])}`}
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
        <div className="product_title">
          Date: {cleanDateString(property.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;