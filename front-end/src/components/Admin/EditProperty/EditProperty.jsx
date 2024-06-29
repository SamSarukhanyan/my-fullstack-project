import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Select, { components } from "react-select";
import uniqueFields from "../../../data/uniqueFields.json";
import data from "../../../data/data.json";
import { customStyles, customStylesCurrency } from "../../customStyles";
import "./editProperty.css";
import { ADMIN_URL, PUBLIC_URL } from "../../../config/config";
import MapView from "../../Property/mapView/MapView";

const currencyOptions = [
  { value: "AMD", label: "֏ (AMD)", flag: "/assets/flags/AMD.png" },
  { value: "USD", label: "$ (USD)", flag: "/assets/flags/USD.png" },
  { value: "EUR", label: "€ (EUR)", flag: "/assets/flags/EUR.png" },
  { value: "RUB", label: "₽ (RUB)", flag: "/assets/flags/RUB.png" }
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

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    region: "",
    subregion: "",
    uniqueFields: {},
    info: "",
    photos: [],
    contactInfo: "",
    propertyId: "",
    price: "",
    currency: { value: "AMD", label: "֏ (AMD)", flag: "/assets/flags/AMD.png" },
    rentalPeriod: "в месяц",
    category: "",
    lat: null,
    lng: null,
  });
  const [tempPosition, setTempPosition] = useState(null);
  const [savedPosition, setSavedPosition] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(`${ADMIN_URL}/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const selectedCurrency = currencyOptions.find(option => option.value === data.currency) || { value: "AMD", label: "֏ (AMD)", flag: "/assets/flags/AMD.png" };

      setFormData({
        ...data,
        uniqueFields: data.uniqueFields,
        photos: data.photos.map((photo) => ({
          url: `${PUBLIC_URL}/${photo}`,
          file: null,
        })),
        currency: selectedCurrency,
        rentalPeriod: data.rentalPeriod || "в месяц",
        category: data.category,
        lat: data.lat,
        lng: data.lng
      });

      setSavedPosition({ lat: data.lat, lng: data.lng });
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name in prevData.uniqueFields) {
        return {
          ...prevData,
          uniqueFields: {
            ...prevData.uniqueFields,
            [name]: value
          }
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleUniqueFieldChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prevData) => ({
      ...prevData,
      uniqueFields: {
        ...prevData.uniqueFields,
        [name]: selectedOption ? selectedOption.value : ""
      }
    }));
  };

  const handleFileChange = (e) => {
    const newPhotos = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      photos: [
        ...prevData.photos,
        ...newPhotos.map((file) => ({ url: URL.createObjectURL(file), file }))
      ]
    }));
  };

  const handleRemovePhoto = (index) => {
    setFormData((prevData) => {
      const newPhotos = prevData.photos.filter((_, i) => i !== index);
      return { ...prevData, photos: newPhotos };
    });
  };

  const handleMapClick = (e) => {
    setTempPosition(e.latlng);
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
    const dataToSend = new FormData();
    const oldPhotos = formData.photos.filter(photo => !photo.file).map(photo => photo.url.replace(`${PUBLIC_URL}/`, ''));
    const newPhotos = formData.photos.filter(photo => photo.file);

    dataToSend.append("oldPhotos", JSON.stringify(oldPhotos));

    newPhotos.forEach((photo) => {
      dataToSend.append("photos", photo.file);
    });

    Object.keys(formData).forEach((key) => {
      if (key === "photos") {
        // already handled above
      } else if (key === "uniqueFields") {
        dataToSend.append("uniqueFields", JSON.stringify(formData.uniqueFields));
      } else if (key === "currency") {
        dataToSend.append(key, formData[key].value);
      } else if (key === "rentalPeriod" && rentalCategories.includes(formData.category)) {
        dataToSend.append(key, formData[key]);
      } else if (key !== "rentalPeriod") {
        dataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.put(`${ADMIN_URL}/properties/${id}`, dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
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
        <h1>Редактировать Недвижимость</h1>
        <div className="form-group regionBlock">
          <label>Регион:</label>
          <Select
            className="region"
            name="region"
            placeholder=""
            value={formData.region ? { value: formData.region, label: formData.region } : null}
            onChange={(selectedOption) =>
              setFormData({ ...formData, region: selectedOption ? selectedOption.value : "" })
            }
            options={Object.keys(data.regions).map((region) => ({
              value: region,
              label: region
            }))}
            styles={customStyles}
            isSearchable={false}
          />
        </div>
        {formData.region && (
          <div className="form-group subregionBlock">
            <label>Подрегион:</label>
            <Select
              className="region"
              name="subregion"
              value={formData.subregion ? { value: formData.subregion, label: formData.subregion } : null}
              onChange={(selectedOption) =>
                setFormData({ ...formData, subregion: selectedOption ? selectedOption.value : "" })
              }
              options={data.regions[formData.region]?.map((subregion) => ({
                value: subregion,
                label: subregion
              }))}
              styles={customStyles}
              isSearchable={false}
            />
          </div>
        )}

        <div className="select-group">
          {uniqueFields[formData.category]?.map((field, index) => (
            field.type !== "checkbox" && (
              <div className="form-group" key={index}>
                <label>{field.label}:</label>
                {field.type === "select" ? (
                  <Select
                    classNamePrefix={
                      field.label === "Балкон" ? "balcon-select" :
                      field.label === "Ремонт" ? "repair-select" :
                      field.label === "Гараж" ? "garage-select" :
                      field.label === "Состояние" ? "status-select" :
                      field.label === "Вход" ? "entrance-select" :
                      field.label === "Расположение от улицы" ? "location-select" :
                      field.label === "Мебель" ? "furniture-select" :
                      field.label === "Тип здания" ? "buildingType-select" :
                      field.label === "Тип" ? "type-select" :
                      field.label === "Этаж" ? "special-select" :
                      field.label === "Высота потолков" ? "special-select" :
                      field.label === "Новостройка" ? "special-select" : 
                      field.label === "Лифт" ? "special-select" : 
                      field.label === "Этажей в доме" ? "special-select" : 
                      field.label === "Количество комнат" ? "special-select" :
                      field.label === "Количество санузлов" ? "special-select" :
                      "default-select"
                    }
                    placeholder=""
                    name={field.label}
                    value={formData.uniqueFields[field.label] ? { value: formData.uniqueFields[field.label], label: formData.uniqueFields[field.label] } : null}
                    onChange={(selectedOption) => handleUniqueFieldChange(selectedOption, { name: field.label })}
                    options={field.options?.map((option) => ({
                      value: option,
                      label: option
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
                    {isAreaField(field.label) && <span style={{marginLeft:"5px"}}> кв.м.</span>}
                  </>
                )}
              </div>
            )
          ))}
        </div>

        <div className="checkbox-group">
          {uniqueFields[formData.category]?.map((field, index) => (
            field.type === "checkbox" && (
              <div className="form-group" key={index}>
                <span><label>{field.label}:</label></span>
                <div className="checkedBlock">
                  {field.options?.map((option, i) => (
                    <label className="checked" key={i} htmlFor={`checkbox-${field.label}-${i}`}>
                      <input
                        type="checkbox"
                        id={`checkbox-${field.label}-${i}`}
                        name={field.label}
                        value={option}
                        checked={formData.uniqueFields[field.label]?.includes(option) || false}
                        onChange={(e) => {
                          const { name, value, checked } = e.target;
                          setFormData((prevData) => {
                            let newValue = checked
                              ? [...prevData.uniqueFields[name], value]
                              : prevData.uniqueFields[name].filter((v) => v !== value);
                            return {
                              ...prevData,
                              uniqueFields: {
                                ...prevData.uniqueFields,
                                [name]: newValue
                              }
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
          ))}
        </div>

        {rentalCategories.includes(formData.category) ? (
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
              value={formData.currency}
              onChange={(selectedOption) =>
                setFormData({ ...formData, currency: selectedOption })
              }
              options={currencyOptions}
              components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
              className="currency-selector"
              styles={customStylesCurrency}
              isSearchable={false}
            />
            <Select
              name="rentalPeriod"
              value={{ value: formData.rentalPeriod, label: formData.rentalPeriod }}
              onChange={(selectedOption) =>
                setFormData({ ...formData, rentalPeriod: selectedOption.value })
              }
              options={[{ value: "в месяц", label: "в месяц" }]}
              styles={customStyles}
              isSearchable={false}
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
              value={formData.currency}
              onChange={(selectedOption) =>
                setFormData({ ...formData, currency: selectedOption })
              }
              options={currencyOptions}
              components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
              className="currency-selector"
              styles={customStylesCurrency}
              isSearchable={false}
            />
          </div>
        )}

        <div className="form-group description">
          <label>Описание:</label>
          <textarea
            name="info"
            value={formData.info}
            onChange={handleChange}
          />
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
                {photo.file ? (
                  <img
                    src={photo.url}
                    alt={`selected ${index}`}
                    className="thumbnail"
                  />
                ) : (
                  <img
                    src={photo.url}
                    alt={`selected ${index}`}
                    className="thumbnail"
                  />
                )}
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

        <div id="map" className="mapContainer">
          <MapView
            properties={[]}
            handleMapClick={handleMapClick}
            savedMarkerPosition={savedPosition}
            tempPosition={tempPosition}
          />
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

        <button type="submit">Обновить</button>
      </form>
    </div>
  );
}

export default EditProperty;
