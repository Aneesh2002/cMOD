// ThiruvananthapuramMap.jsx
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

const THIRUVANANTHAPURAM = { lat: 8.5241, lng: 76.9366 };

// Example charging stations (replace with real ones if you have coords)
const chargingStations = [
  {
    id: 1,
    name: "chargeMOD Charging Station",
    lat: 8.510904048093858,
    lng: 76.90502267116464,
  },
  {
    id: 2,
    name: "KSEB Charging Station",
    lat: 8.45411335129897,
    lng: 77.00404275767067,
  },
  {
    id: 3,
    name: "EESL Charging Station",
    lat: 8.48107036332157,
    lng: 76.91258015735494,
  },
];

// Helper to move map when user selects a station
function FlyTo({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 14, { duration: 1.5 });
    }
  }, [lat, lng, map]);
  return null;
}

export default function Map() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Get user current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          console.warn("User denied location access");
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative">
      <MapContainer
        center={[THIRUVANANTHAPURAM.lat, THIRUVANANTHAPURAM.lng]}
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

        {/* Charging Stations */}
        {chargingStations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={icon}
            eventHandlers={{
              click: () => setSelectedStation(station),
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

        {/* User Location */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* FlyTo when a station is selected */}
        {selectedStation && (
          <FlyTo lat={selectedStation.lat} lng={selectedStation.lng} />
        )}
      </MapContainer>

      {/* Station List Overlay (optional UI) */}
      <div className="absolute top-2 left-2 bg-white rounded-lg shadow-md p-3 space-y-2 max-h-[90%] overflow-y-auto w-56">
        <h3 className="font-bold text-gray-700 mb-2 text-sm">
          Charging Stations
        </h3>
        {chargingStations.map((station) => (
          <button
            key={station.id}
            onClick={() => setSelectedStation(station)}
            className="block w-full text-left px-2 py-1 rounded hover:bg-amber-100 text-sm text-gray-800"
          >
            {station.name}
          </button>
        ))}
      </div>
    </div>
  );
}
