import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "./adminProperties.css";
import { ADMIN_URL, PUBLIC_URL } from "../../../config/config";

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
          <YMaps
            query={{
              apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY,
              lang: "en_US",
            }}
          >
            <Map
              defaultState={{
                center: [40.1774, 44.5134],
                zoom: 7,
              }}
              width="100%"
              height="100%"
            >
              {properties &&
                properties.length > 0 &&
                properties.map(
                  (property) =>
                    property.lat &&
                    property.lng && (
                      <Placemark
                        key={property.id}
                        geometry={[property.lat, property.lng]}
                        properties={{
                          balloonContent: `
                            <div>
                              <h3>${property.category}</h3>
                              <p>${property.subregion}</p>
                              ${
                                property.photos && property.photos.length > 0
                                  ? `<img src="${PUBLIC_URL}/${formatImagePath(
                                      property.photos[0]
                                    )}" alt="Property" style="width: 100px; border-radius: 5px;" />`
                                  : ""
                              }
                            </div>
                          `,
                        }}
                      />
                    )
                )}
            </Map>
          </YMaps>
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
