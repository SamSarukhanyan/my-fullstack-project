import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import FullScreenSlider from "../../Common/propertyDetails/fullscreen/FullScreenSlider";
import moment from "moment-timezone";
import "./propertyDetails.css";
import { PUBLIC_URL } from "../../../config/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as ZoomIcon } from "../../../assets/icons/zoom.svg";

const PropertyDetails = () => {
  const { id } = useParams();
  document.title = `Property - ${id}`;
  const [property, setProperty] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_URL}/api/properties/${id}`,
          {}
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке деталей продукта:", error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (oldIndex, newIndex) => setCurrentIndex(newIndex),
  };

  const images = property.photos.map((image) => `${PUBLIC_URL}/${image}`);

  const formatDateString = (dateString) => {
    return moment(dateString).tz('Asia/Yerevan').format('YYYY-MM-DD HH:mm:ss');
  };

  const renderPropertyInfo = (property) => {
    return Object.entries(property).map(([key, value]) => {
      if (value === null || typeof value === "object") {
        return null;
      }
      return (
        <div key={key} className="property-info-item">
         <span> <strong>{key}:</strong> {key === 'createdAt' || key === 'updatedAt' ? formatDateString(value) : value}</span>
        </div>
      );
    });
  };

  const renderUniqueFields = (uniqueFields) => {
    return Object.entries(uniqueFields).map(([key, value]) => {
      if (value === null) {
        return null;
      }
      return (
        <div key={key} className="property-info-item">
          <span><strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}</span>
        </div>
      );
    });
  };

  return (
    <section className="product_detail_root">
      <div className="top_content">
        <h1>Property Details Page</h1>

        {property.photos && property.photos.length > 0 ? (
          <div className="slider_root">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div className="slider_block" key={index}>
                  <div className="image_block">
                    <img src={image} alt={`Property ${index}`} />
                    <div
                      className="zoom_icon"
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsFullScreen(true);
                      }}
                    >
                      <ZoomIcon className="zoom_svg_icon" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            {isFullScreen && (
              <FullScreenSlider
                images={images}
                region={property.region}
                subregion={property.subregion}
                initialSlide={currentIndex}
                onClose={() => setIsFullScreen(false)}
              />
            )}
          </div>
        ) : (
          <div>No images available</div>
        )}
      </div>
      <div className="property_details_content">
        {renderPropertyInfo(property)}
        {property.uniqueFields && renderUniqueFields(property.uniqueFields)}
      </div>
    </section>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style }}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
      </svg>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style }}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24">
        <path d="M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6z" />
      </svg>
    </div>
  );
};

export default PropertyDetails;
