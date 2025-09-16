// ThiruvananthapuramMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../utils/leafletIcon";

const THIRUVANANTHAPURAM = { lat: 8.5241, lng: 76.9366 };

// Example charging stations (replace with real ones if you have coords)
const chargingStations = [
  { id: 1, name: "chargeMOD Charging Station", lat:8.510904048093858, lng: 76.90502267116464 },
  { id: 2, name: "KSEB Charging Station", lat: 8.45411335129897, lng: 77.00404275767067 },   
  { id: 3, name: "EESL Charging Station", lat: 8.48107036332157, lng: 76.91258015735494}, 
 
];

export default function Map() {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
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

        {chargingStations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={icon}
          >
            <Popup>
              <strong>{station.name}</strong>
              <br />
              Lat: {station.lat}, Lng: {station.lng}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
