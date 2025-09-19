import L from "leaflet";

// Create a Google Maps style "current location" dot
const userIcon = L.divIcon({
  className: "custom-user-icon",
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: rgba(66, 133, 244, 0.4); /* blue circle with transparency */
      border: 2px solid #f44242ff;           /* Google Maps blue border */
      border-radius: 50%;
      position: relative;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background: #f44242ff; /* solid blue dot in center */
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "></div>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10], // center the circle
  popupAnchor: [0, -10],
});

export default userIcon;
