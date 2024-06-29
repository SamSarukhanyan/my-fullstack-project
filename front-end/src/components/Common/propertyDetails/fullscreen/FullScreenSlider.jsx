import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./fullscreen.css";
import "../../../styles.css";

const FullScreenSlider = ({
  images,
  region,
  subregion,
  initialSlide,
  onClose,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    initialSlide: initialSlide,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="fullscreen_slider">
      <div className="fullscreen_header">
        <span>{region} </span>
        <span>{subregion}</span>
        <button title="close" className="close_button" onClick={onClose}>
          X
        </button>
      </div>

      <div className="top_content">
        {images && images.length > 0 ? (
          <div className="slider_root">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div className="slider_block" key={index}>
                  <div className="image_block">
                    <img src={image} alt={`Property ${index}`} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div>No images available</div>
        )}
      </div>
    </div>
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

export default FullScreenSlider;
