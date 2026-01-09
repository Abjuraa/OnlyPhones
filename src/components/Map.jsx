import { useState } from "react";
import { Map, MapControls, MapMarker, MarkerContent } from "../components/ui/map";
import { MapPin } from "lucide-react";

export function MyMap() {

    const [draggableMarker, setDraggableMarker] = useState({
        lng: -74.08085,
        lat: 4.60420,
    })
    return (
        <Map center={[-74.08086, 4.60421]} zoom={15}
            styles={{
                light: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
            }}
        >
            <MapMarker
                draggable
                longitude={draggableMarker.lng}
                latitude={draggableMarker.lat}
                onDragEnd={(lngLat) => {
                    setDraggableMarker({
                        lng: lngLat.lng,
                        lat: lngLat.lat
                    })
                }}
            >
                <MarkerContent>
                    <div className="cursor-move">
                        <MapPin
                            className="fill-black stroke-white dark:fill-white"
                            size={28}
                        />
                    </div>
                </MarkerContent>

                <MapControls
                    position="top-left"
                    showZoom
                    showCompass
                    showLocate
                    showFullscreen
                ></MapControls>
            </MapMarker>
        </Map>
    );
}