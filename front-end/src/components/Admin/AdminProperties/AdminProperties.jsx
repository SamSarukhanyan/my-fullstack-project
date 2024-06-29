import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import "./adminProperties.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ADMIN_URL, PUBLIC_URL } from "../../../config/config";
import icon from '../../../assets/icons/icon.png'

// Установите путь к вашему изображению маркера
const customIcon = new L.Icon({
  iconUrl: icon,
  iconSize: [19, 27], // размер иконки маркера
  iconAnchor: [19, 27], // точка привязки иконки, соответствующая ее "основанию"
  popupAnchor: [0, -32], // точка, от которой должен открываться попап, относительно иконки
  shadowUrl: '',
  shadowSize: [19, 27], // размер тени
  shadowAnchor: [19, 27], // точка привязки тени
});

const fetchAdminProperties = async () => {
  const token = localStorage.getItem("adminToken");
  const { data } = await axios.get(`${ADMIN_URL}/properties`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const deleteProperty = async (propertyId) => {
  const token = localStorage.getItem("adminToken");
  await axios.delete(`${ADMIN_URL}/properties/${propertyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminProperties = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: properties,
    isLoading,
    isError,
  } = useQuery("propertiesList", fetchAdminProperties);

  const mutation = useMutation(deleteProperty, {
    onSuccess: () => {
      queryClient.invalidateQueries("propertiesList");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading properties</div>;

  const formatImagePath = (imagePath) => {
    return imagePath.replace(/\\/g, "/");
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  const handleDeleteProperty = (propertyId) => {
    mutation.mutate(propertyId);
  };

  const handleEditProperty = (propertyId) => {
    navigate(`/admin/edit-property/${propertyId}`);
  };

  return (
    <section className="adminHome_section">
      <h2>Admin Properties List</h2>

      <div className="content_block">
        <div className="map_container">
          <MapContainer
            center={[40.1774, 44.5134]}
            zoom={7}
            style={{
              height: "100%",
              width: "100%",
              margin: "auto",
              zIndex: "2",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {properties &&
              properties.length > 0 &&
              properties.map(
                (property) =>
                  property.lat &&
                  property.lng && (
                    <Marker
                      key={property.id}
                      position={[property.lat, property.lng]}
                      icon={customIcon} // Применяем настраиваемую иконку
                    >
                      <Popup>
                        <div>
                          <h3>{property.category}</h3>
                          <p>{property.subregion}</p>
                          {property.photos && property.photos.length > 0 && (
                            <img
                              src={`${PUBLIC_URL}/${formatImagePath(
                                property.photos[0]
                              )}`}
                              alt="Property"
                              style={{ width: "100px", borderRadius: "5px" }}
                            />
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  )
              )}
          </MapContainer>
        </div>
        <div className="products_container">
          {properties && properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.id} className="product_card">
                <div className="product_images">
                  {property.photos && property.photos.length > 0 ? (
                    <img
                      src={`${PUBLIC_URL}/${formatImagePath(
                        property.photos[0]
                      )}`}
                      alt="Property"
                      className="product_image"
                    />
                  ) : (
                    <div>No images available</div>
                  )}
                </div>
                <div className="product_title">{property.category}</div>
                <div className="product_address">{property.subregion}</div>
                <button onClick={() => handleViewDetails(property.id)}>
                  View
                </button>
                <button onClick={() => handleDeleteProperty(property.id)}>
                  Delete
                </button>
                <button onClick={() => handleEditProperty(property.id)}>
                  Edit
                </button>
              </div>
            ))
          ) : (
            <div>No properties available</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminProperties;
