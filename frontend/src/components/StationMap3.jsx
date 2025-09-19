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

export default function StationMap3() {
  return (
    <MapContainer
      center={[8.48107036332157, 76.91258015735494]}
      zoom={15}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[8.48107036332157, 76.91258015735494]} icon={icon}>
        <Popup>EESL Charging Station</Popup>
      </Marker>
    </MapContainer>
  );
}
