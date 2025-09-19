import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../utils/leafletIcon";
const stationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

export default function StationMap2() {
  return (
    <MapContainer
      center={[8.45411335129897, 77.00404275767067]}
      zoom={15}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[8.45411335129897, 77.00404275767067]} icon={icon}>
        <Popup>KSEB Charging Station</Popup>
      </Marker>
    </MapContainer>
  );
}
