// src/components/Common/topProperties/TopProperties.jsx

import React, { useEffect, useRef } from "react";
import moment from "moment-timezone";
import "./topProperties.css";
import { PUBLIC_URL } from "../../../config/config.js";
import { useNavigate } from "react-router-dom";

const TopProperties = ({ topProperties }) => {
  const navigate = useNavigate();
  const topPropertiesRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      if (topPropertiesRef.current && topPropertiesRef.current.contains(event.target)) {
        event.stopPropagation();
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchmove", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  if (!topProperties || topProperties.length === 0) {
    return <div>No top properties available</div>;
  }

  const formatImagePath = (imagePath) => {
    return imagePath.replace(/\\/g, "/");
  };

  const formatDateString = (dateString) => {
    return moment(dateString).tz('Asia/Yerevan').format('YYYY-MM-DD HH:mm:ss');
  };

  const handleViewDetails = (id) => {
    navigate(`/properties/${id}`);
  };

  return (
    <div className="top-properties" ref={topPropertiesRef}>
      <h2>Top Properties</h2>
      <div className="top-properties-list">
        {topProperties.map((property) => (
          <div
            onClick={() => handleViewDetails(property.id)}
            key={property.id}
            className="top_product_card"
          >
            <div className="top_product_images">
              {property.photos && property.photos.length > 0 ? (
                <img
                  src={`${PUBLIC_URL}/${formatImagePath(property.photos[0])}`}
                  alt="Property"
                  className="top_product_image"
                />
              ) : (
                <div>No images available</div>
              )}
            </div>
            <div className="top_bottom_content">
              <div className="top_product_price">
                {property.price} {property.currency}
              </div>
              <div className="top_product_title">
                Category: {property.category}
              </div>
              <div className="product_title">
                Property ID: {property.propertyId}
              </div>
              <div className="product_title">Region: {property.region}</div>
              <div className="product_title">
                Subregion: {property.subregion}
              </div>
              <div className="product_title">
                Date: {formatDateString(property.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProperties;
