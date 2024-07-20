import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Select, { components } from "react-select";
import uniqueFields from "../../../data/uniqueFields.json";
import data from "../../../data/data.json";
import { customStyles} from "../../customStyles.js";
import "../../Admin/EditProperty/editProperty.css";
import './addProperty.css'
import { ADMIN_URL } from "../../../config/config";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const currencyOptions = [
  {
    value: "AMD",
    label: "֏ (AMD)",
    flag: process.env.PUBLIC_URL + "/assets/flags/AMD.png",
  },
  {
    value: "USD",
    label: "$ (USD)",
    flag: process.env.PUBLIC_URL + "/assets/flags/USD.png",
  },
  {
    value: "EUR",
    label: "€ (EUR)",
    flag: process.env.PUBLIC_URL + "/assets/flags/EUR.png",
  },
  {
    value: "RUB",
    label: "₽ (RUB)",
    flag: process.env.PUBLIC_URL + "/assets/flags/RUB.png",
  },
];

const rentalPeriodOptions = [{ value: "в месяц", label: "в месяц" }];

const statusOptions = [
  { value: "standard", label: "Стандартный" },
  { value: "top", label: "Топ" },
];

const rentalCategories = ["rent-house", "rent-apartment", "rent-commercial"];

const CustomOption = (props) => (
    <components.Option {...props}>
      <img
          src={props.data.flag}
          alt={props.data.label}
          style={{ width: 25, height: 18, marginRight: 10 }}
      />
      {props.data.label}
    </components.Option>
);

const CustomSingleValue = (props) => (
    <components.SingleValue {...props}>
      <img
          src={props.data.flag}
          alt={props.data.label}
          style={{ width: 25, height: 18, marginRight: 10 }}
      />
      {props.data.label}
    </components.SingleValue>
);

function AddProperty() {
  const { category } = useParams();
  const [formData, setFormData] = useState({
    propertyStatus: "standard", 
    region: "",
    subregion: "",
    uniqueFields: {},
    info: "",
    photos: [],
    contactInfo: "",
    propertyId: "",
    price: "",
    currency: "AMD",
    rentalPeriod: "в месяц",
    lat: null,
    lng: null,
  });
  const [tempPosition, setTempPosition] = useState(null);
  const [savedPosition, setSavedPosition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUniqueFields = () => {
      let fields = uniqueFields[category] || [];
      setFormData((prevData) => ({
        ...prevData,
        uniqueFields: fields.reduce((acc, field) => {
          acc[field.label] = field.type === "checkbox" ? [] : "";
          return acc;
        }, {}),
      }));
    };
    loadUniqueFields();
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name in prevData.uniqueFields) {
        return {
          ...prevData,
          uniqueFields: {
            ...prevData.uniqueFields,
            [name]: value,
          },
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleUniqueFieldChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prevData) => ({
      ...prevData,
      uniqueFields: {
        ...prevData.uniqueFields,
        [name]: selectedOption ? selectedOption.value : "",
      },
    }));
  };

  const handleFileChange = (e) => {
    const newPhotos = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      photos: [...prevData.photos, ...newPhotos],
    }));
  };

  const handleRemovePhoto = (index) => {
    setFormData((prevData) => {
      const newPhotos = prevData.photos.filter((_, i) => i !== index);
      return { ...prevData, photos: newPhotos };
    });
  };

  const handleMapClick = (e) => {
    const coords = e.get('coords');
    setTempPosition({ lat: coords[0], lng: coords[1] });
  };

  const handleSaveLocation = () => {
    setSavedPosition(tempPosition);
    setFormData((prevData) => ({
      ...prevData,
      lat: tempPosition.lat,
      lng: tempPosition.lng,
    }));
    setTempPosition(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "photos") {
          formData.photos.forEach((photo) => {
            dataToSend.append("photos", photo);
          });
        } else if (key === "uniqueFields") {
          dataToSend.append(
              "uniqueFields",
              JSON.stringify(formData.uniqueFields)
          );
        } else {
          dataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
          `${ADMIN_URL}/properties/${category}`,
          dataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
      );

      console.log(response.data);
      navigate("/admin/properties");
    } catch (error) {
      console.error(error);
    }
  };

  const isAreaField = (label) => {
    const areaFields = ["Площадь участка", "Площадь дома", "Общая площадь"];
    return areaFields.includes(label);
  };

  const getInputClass = (label) => {
    switch (label) {
      case "Улица":
        return "input-street";
      case "Номер дома":
        return "input-houseNumber";
      case "Общая площадь":
        return "input-totalArea";
      case "Площадь участка":
        return "input-totalArea";
      default:
        return "";
    }
  };

  return (
      <div className="ADD_ROOT">
        <form onSubmit={handleSubmit} className="new_Form">
          <h1>{data.categories[category]}</h1>
          
          <div className="form-group statusBlock">
            <label>Статус:</label>
            <Select
                name="propertyStatus"
                value={
                  formData.propertyStatus
                      ? statusOptions.find(option => option.value === formData.propertyStatus)
                      : null
                }
                onChange={(selectedOption, actionMeta) =>
                    handleSelectChange(selectedOption, actionMeta)
                }
                options={statusOptions}
                styles={customStyles}
                isSearchable={false}
            />
          </div>
          
          <div id="map" className="mapContainer">
            <YMaps
                query={{
                  apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY,
                  lang: "en_US",
                }}
            >
              <Map
                  defaultState={{
                    center: [40.1774, 44.5134],
                    zoom: 13,
                  }}
                  width="100%"
                  height="390px"
                  cursor="pointer"
                  onClick={handleMapClick}
              >
                {tempPosition && (
                    <Placemark
                        geometry={[tempPosition.lat, tempPosition.lng]}
                        options={{ iconColor: 'red' }}
                    />
                )}
                {savedPosition && (
                    <Placemark
                        geometry={[savedPosition.lat, savedPosition.lng]}
                    />
                )}
              </Map>
            </YMaps>
            {tempPosition && (
                <button
                    className="addLocation"
                    type="button"
                    onClick={handleSaveLocation}
                >
                  Save Location
                </button>
            )}
          </div>
          <div className="form-group regionBlock">
            <label>Регион:</label>
            <Select
                name="region"
                placeholder=""
                value={
                  formData.region
                      ? { value: formData.region, label: formData.region }
                      : null
                }
                onChange={(selectedOption, actionMeta) =>
                    handleSelectChange(selectedOption, actionMeta)
                }
                options={Object.keys(data.regions).map((region) => ({
                  value: region,
                  label: region,
                }))}
                styles={customStyles}
                isSearchable={false}
            />
          </div>
          {formData.region && (
              <div className="form-group subregionBlock">
                <label>Подрегион:</label>
                <Select
                    name="subregion"
                    placeholder=""
                    value={
                      formData.subregion
                          ? { value: formData.subregion, label: formData.subregion }
                          : null
                    }
                    onChange={(selectedOption, actionMeta) =>
                        handleSelectChange(selectedOption, actionMeta)
                    }
                    options={data.regions[formData.region].map((subregion) => ({
                      value: subregion,
                      label: subregion,
                    }))}
                    styles={customStyles}
                    isSearchable={false}
                />
              </div>
          )}

          <div className="select-group">
            {uniqueFields[category]?.map(
                (field, index) =>
                    field.type !== "checkbox" && (
                        <div className="form-group" key={index}>
                          <label>{field.label}:</label>
                          {field.type === "select" ? (
                              <Select
                                  placeholder=""
                                  name={field.label}
                                  value={
                                    formData.uniqueFields[field.label]
                                        ? {
                                          value: formData.uniqueFields[field.label],
                                          label: formData.uniqueFields[field.label],
                                        }
                                        : null
                                  }
                                  onChange={(selectedOption, actionMeta) =>
                                      handleUniqueFieldChange(selectedOption, actionMeta)
                                  }
                                  options={field.options.map((option) => ({
                                    value: option,
                                    label: option,
                                  }))}
                                  styles={customStyles}
                                  isSearchable={false}
                              />
                          ) : (
                              <>
                                <input
                                    type="text"
                                    name={field.label}
                                    value={formData.uniqueFields[field.label] || ""}
                                    onChange={handleChange}
                                    className={getInputClass(field.label)}
                                />
                                {isAreaField(field.label) && (
                                    <span style={{ marginLeft: "5px" }}> кв.м.</span>
                                )}
                              </>
                          )}
                        </div>
                    )
            )}
          </div>

          <div className="checkbox-group">
            {uniqueFields[category]?.map(
                (field, index) =>
                    field.type === "checkbox" && (
                        <div className="form-group" key={index}>
                  <span>
                    <label>{field.label}:</label>
                  </span>
                          <div className="checkedBlock">
                            {field.options.map((option, i) => (
                                <label
                                    className="checked"
                                    key={i}
                                    htmlFor={`checkbox-${field.label}-${i}`}
                                >
                                  <input
                                      type="checkbox"
                                      id={`checkbox-${field.label}-${i}`}
                                      name={field.label}
                                      value={option}
                                      checked={
                                          formData.uniqueFields[field.label]?.includes(
                                              option
                                          ) || false
                                      }
                                      onChange={(e) => {
                                        const { name, value, checked } = e.target;
                                        setFormData((prevData) => {
                                          let newValue = checked
                                              ? [...prevData.uniqueFields[name], value]
                                              : prevData.uniqueFields[name].filter(
                                                  (v) => v !== value
                                              );
                                          return {
                                            ...prevData,
                                            uniqueFields: {
                                              ...prevData.uniqueFields,
                                              [name]: newValue,
                                            },
                                          };
                                        });
                                      }}
                                  />
                                  {option}
                                </label>
                            ))}
                          </div>
                        </div>
                    )
            )}
          </div>

          {rentalCategories.includes(category) ? (
              <div className="price-currency-container form-group">
                <label>Арендная плата:</label>
                <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <Select
                    name="currency"
                    value={
                      formData.currency
                          ? currencyOptions.find(
                              (option) => option.value === formData.currency
                          )
                          : null
                    }
                    onChange={(selectedOption, actionMeta) =>
                        handleSelectChange(selectedOption, actionMeta)
                    }
                    options={currencyOptions}
                    components={{
                      Option: CustomOption,
                      SingleValue: CustomSingleValue,
                    }}
                    styles={customStyles}
                    isSearchable={false}
                />
                <Select
                    name="rentalPeriod"
                    value={{ value: "в месяц", label: "в месяц" }}
                    options={rentalPeriodOptions}
                    isSearchable={false}
                    styles={customStyles}
                />
              </div>
          ) : (
              <div className="price-currency-container form-group">
                <label>Цена:</label>
                <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <Select
                    name="currency"
                    value={
                      formData.currency
                          ? currencyOptions.find(
                              (option) => option.value === formData.currency
                          )
                          : null
                    }
                    onChange={(selectedOption, actionMeta) =>
                        handleSelectChange(selectedOption, actionMeta)
                    }
                    options={currencyOptions}
                    components={{
                      Option: CustomOption,
                      SingleValue: CustomSingleValue,
                    }}
                    styles={customStyles}
                    isSearchable={false}
                />
              </div>
          )}

          <div className="form-group description">
            <label>Описание:</label>
            <textarea name="info" value={formData.info} onChange={handleChange} />
          </div>

          <div className="form-group imagesBlock">
            <label>Фотографии:</label>
            <label className="custom-file-upload">
              Выбрать файлы
              <input
                  id="file-upload"
                  type="file"
                  name="photos"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}

              />
            </label>
            <div className="selected-images">
              {formData.photos.map((photo, index) => (
                  <div key={index} className="image-container">
                    <img
                        src={URL.createObjectURL(photo)}
                        alt={`selected ${index}`}
                        className="thumbnail"
                    />
                    <button
                        type="button"
                        className="remove-image"
                        onClick={() => handleRemovePhoto(index)}
                    >
                      &times;
                    </button>
                  </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Контактная информация:</label>
            <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>ID Недвижимости:</label>
            <input
                type="text"
                name="propertyId"
                value={formData.propertyId}
                onChange={handleChange}
            />
          </div>

          <button type="submit">Добавить</button>
        </form>
      </div>
  );
}

export default AddProperty;