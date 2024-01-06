import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const MapView = ({ lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA98VCnr7mnpaKlZcq0RN6JoWlz1PmdKV8", // Replace with your Google Maps API key
  });

  const center = {
    lat: parseFloat(lat), // Parse lat as a float
    lng: parseFloat(lng), // Parse lng as a float
  };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      <Marker position={center} />
    </GoogleMap>
  ) : null;
};

export default MapView;