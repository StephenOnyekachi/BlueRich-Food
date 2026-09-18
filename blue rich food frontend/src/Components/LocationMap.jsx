
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function LocationMap() {
  // Temporary coordinates.
  // Replace these with the restaurant's actual coordinates.
  const position = [5.0377, 7.9128];

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      className="h-full min-h-[400px] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          <div>
            <h3 className="font-semibold">
              Bluerich Bakery & Restaurant
            </h3>

            <p className="mt-1 text-sm">
              We are located here.
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default LocationMap;
