import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

export const initMapbox = ({ container, center = [75.8577, 22.7196], zoom = 11 }) => {
  if (!mapboxToken) return null;
  mapboxgl.accessToken = mapboxToken;
  return new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/light-v11",
    center,
    zoom,
  });
};

export const createMarker = (map, { lat, lng, popupHtml }) => {
  if (!map) return null;
  const marker = new mapboxgl.Marker({ color: "#f97316" })
    .setLngLat([lng, lat])
    .addTo(map);
  if (popupHtml) {
    marker.setPopup(
      new mapboxgl.Popup({ offset: 18, className: "rounded-xl" }).setHTML(popupHtml)
    );
  }
  return marker;
};
