import { Map, MapControls } from "../components/ui/map";


export function MyMap() {
    return (
        <Map center={[-74.08175, 4.60971]} zoom={10}
            styles={{
                light: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
            }}
        >
            <MapControls
                position="top-left"
                showZoom
                showCompass
                showFullscreen
            />
        </Map>
    );
}