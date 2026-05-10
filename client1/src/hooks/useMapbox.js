import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createMarker, initMapbox, mapboxToken } from "@/services/mapbox";

export default function useMapbox(markers = [], center = [75.8577, 22.7196]) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRefs = useRef([]);
  const isMapReadyRef = useRef(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !mapboxToken) return;
    mapRef.current = initMapbox({ container: mapContainerRef.current, center });
    if (mapRef.current) {
      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      mapRef.current.on("load", () => {
        isMapReadyRef.current = true;
      });
    }
    return () => {
      markerRefs.current.forEach((marker) => marker.remove());
      markerRefs.current = [];
      isMapReadyRef.current = false;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [center]);

  useEffect(() => {
    if (!mapRef.current || !isMapReadyRef.current) return;
    markerRefs.current.forEach((marker) => marker.remove());
    markerRefs.current = markers
      .map((item) => createMarker(mapRef.current, item))
      .filter(Boolean);
  }, [markers]);

  return { mapContainerRef, hasToken: Boolean(mapboxToken) };
}
