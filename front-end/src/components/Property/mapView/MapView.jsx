import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './mapView.css'

// Устанавливаем иконку маркера
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapClickHandler = ({ handleMapClick }) => {
  useMapEvents({
    click(e) {
      handleMapClick(e);
    }
  });
  return null;
};

const MapView = ({ properties, handleMapClick, savedMarkerPosition, tempPosition }) => {
  return (
    <MapContainer center={[40.0691, 45.0382]} zoom={7} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {properties.map((property) => (
        property.lat && property.lng && (
          <Marker key={property.id} position={[property.lat, property.lng]}>
            <Popup>
              <div>
                <h3>{property.category}</h3>
                <p>{property.subregion}</p>
                {property.photos && property.photos.length > 0 && (
                  <img src={`${process.env.PUBLIC_URL}/${property.photos[0]}`} alt="Property" style={{ width: '100px' }} />
                )}
              </div>
            </Popup>
          </Marker>
        )
      ))}
      <MapClickHandler handleMapClick={handleMapClick} />
      {tempPosition && (
        <Marker position={tempPosition} opacity={0.6}>
          <Popup>
            <div>Temporary marker. Click "Save Location" to finalize.</div>
          </Popup>
        </Marker>
      )}
      {savedMarkerPosition && (
        <Marker position={savedMarkerPosition} opacity={1}>
          <Popup>
            <div>Saved marker position.</div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapView;
