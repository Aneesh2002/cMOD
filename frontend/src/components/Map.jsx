import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../utils/leafletIcon";
import userIcon from "../utils/leafletUserIcon";

const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjY3MjliZDE2NTU4ODQ0ZjM4YWNkZjIyNjZiODRiZGU1IiwiaCI6Im11cm11cjY0In0="; // Or switch to OSRM

const THIRUVANANTHAPURAM = { lat: 8.5241, lng: 76.9366 };

const chargingStations = [
  { id: 1, name: "chargeMOD Charging Station", lat: 8.5109, lng: 76.9050 },
  { id: 2, name: "KSEB Charging Station", lat: 8.4541, lng: 77.0040 },
  { id: 3, name: "EESL Charging Station", lat: 8.4810, lng: 76.9126 },
];

// 🔹 Component to fly map when station changes
function FlyTo({ station }) {
  const map = useMap();
  useEffect(() => {
    if (station) {
      map.flyTo([station.lat, station.lng], 14, { duration: 1.5 });
    }
  }, [station, map]);
  return null;
}

export default function Map() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [route, setRoute] = useState(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => console.warn("User denied location access")
      );
    }
  }, []);

  // Fetch route when station changes
  // heynow
  useEffect(() => {
    if (selectedStation && userLocation) {
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${userLocation.lng},${userLocation.lat}&end=${selectedStation.lng},${selectedStation.lat}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const coords = data.features[0].geometry.coordinates.map((c) => [
            c[1],
            c[0],
          ]);
          setRoute(coords);
        })
        .catch((err) => console.error("Route error:", err));
    }
  }, [selectedStation, userLocation]);

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative">
      <MapContainer
        center={[THIRUVANANTHAPURAM.lat, THIRUVANANTHAPURAM.lng]}
        zoom={12}
        scrollWheelZoom
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Charging Stations */}
        {chargingStations.map((station) => (
          <Marker key={station.id} position={[station.lat, station.lng]} icon={icon}>
            <Popup>
              <strong>{station.name}</strong>
              <br />
              <button
                onClick={() => setSelectedStation(station)} // ✅ sets + triggers FlyTo + route
                className="mt-2 px-2 py-1 text-xs bg-amber-600 text-white rounded"
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

        {/* Route Polyline */}
        {route && <Polyline positions={route} color="blue" />}

        {/* Fly to selected station */}
        {selectedStation && <FlyTo station={selectedStation} />}
      </MapContainer>
    </div>
  );
}
