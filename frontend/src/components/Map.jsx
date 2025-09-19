// src/components/Map.jsx
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../utils/leafletIcon";
import userIcon from "../utils/leafletUserIcon";

const DEFAULT_CENTER = { lat: 8.5241, lng: 76.9366 }; // Thiruvananthapuram

function FlyTo({ lat, lng, zoom = 14 }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.flyTo([lat, lng], zoom, { duration: 1.5 });
  }, [lat, lng, zoom, map]);
  return null;
}

/**
 * Map — fills its parent (100% width/height). Parent controls height.
 * Props:
 * - center?: {lat, lng}
 * - stations?: [{id, name, lat, lng}]
 * - selectedStation?: {lat, lng}
 * - onSelectStation?: (station) => void
 * - showUserLocation?: boolean (default: true)
 * - className?: string (extra classes on outer wrapper)
 */
export default function Map({
  center = DEFAULT_CENTER,
  stations = [
    { id: 1, name: "chargeMOD Charging Station", lat: 8.510904048093858, lng: 76.90502267116464 },
    { id: 2, name: "KSEB Charging Station",      lat: 8.45411335129897,  lng: 77.00404275767067 },
    { id: 3, name: "EESL Charging Station",      lat: 8.48107036332157,  lng: 76.91258015735494 },
  ],
  selectedStation,
  onSelectStation,
  showUserLocation = true,
  className = "",
}) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!showUserLocation) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => console.warn("User denied location access")
      );
    }
  }, [showUserLocation]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Stations */}
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onSelectStation?.(station),
            }}
          >
            <Popup>
              <strong>{station.name}</strong>
              <br />
              Lat: {station.lat.toFixed(4)}, Lng: {station.lng.toFixed(4)}
              <br />
              <button
                onClick={() => alert(`Navigating to ${station.name}`)}
                className="mt-2 px-2 py-1 text-xs bg-amber-600 text-white rounded hover:bg-amber-700"
              >
                Navigate
              </button>
            </Popup>
          </Marker>
        ))}

        {/* User */}
        {showUserLocation && userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Fly when selection changes */}
        {selectedStation && (
          <FlyTo lat={selectedStation.lat} lng={selectedStation.lng} />
        )}
      </MapContainer>
    </div>
  );
}
