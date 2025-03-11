import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationSection = () => {
  const position = [6.5244, 3.3792];

  return (
    <section>
      <h2 className="text-center font-sf-pro-rounded text-3xl text-[orange]">
        Our <span className="font-courgette text-[purple]">location</span>
      </h2>
      <div style={{ height: "400px", width: "100%" }}
        className="mt-14 shadow-2xl"
      >
        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
          <>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
              <Popup>We are here!</Popup>
            </Marker>
          </>
        </MapContainer>
      </div>
    </section>
  );
};

export default LocationSection;
