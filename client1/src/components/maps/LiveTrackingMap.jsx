import { useMemo } from "react";
import useMapbox from "@/hooks/useMapbox";
import MapControls from "@/components/maps/MapControls";

export default function LiveTrackingMap({ markers = [] }) {
  const normalizedMarkers = useMemo(
    () =>
      markers.map((marker) => ({
        lat: marker.lat,
        lng: marker.lng,
        popupHtml: `<div style="padding:8px"><strong>${marker.title}</strong><p>${marker.subtitle || ""}</p></div>`,
      })),
    [markers]
  );

  const { mapContainerRef, hasToken } = useMapbox(normalizedMarkers);

  return (
    <div className="relative h-72 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
      <MapControls onRefresh={() => window.location.reload()} />
      {hasToken ? (
        <div ref={mapContainerRef} className="h-full w-full" />
      ) : (
        <div className="grid h-full place-items-center bg-slate-100 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
          Add `VITE_MAPBOX_TOKEN` to enable live tracking map.
        </div>
      )}
    </div>
  );
}
