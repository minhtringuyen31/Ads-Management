import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axiosClient from "../../axiosConfig/axiosClient";
import { useMapEvents } from "react-leaflet";
import SearchBar from "../Search/SearchBar";
import PropTypes from "prop-types";
import ReportIcon from "@mui/icons-material/Report";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ReportForm from "../Report/ReportForm";
import MarkerClusterGroup from "react-leaflet-cluster";

// import dotenv from "dotenv";

// dotenv.config();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",

  boxShadow: 24,
  borderRadius: 10,
};

/**
 * Definte Marker Styled
 */

const planedMarkerIcon = new L.divIcon({
  className: "custom-svg-marker",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 150 149.999998"><defs><g/><clipPath id="69331bbfe6"><path d="M 75 0 C 33.578125 0 0 33.578125 0 75 C 0 116.421875 33.578125 150 75 150 C 116.421875 150 150 116.421875 150 75 C 150 33.578125 116.421875 0 75 0 Z M 75 0 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#69331bbfe6)"><rect x="-15" width="180" fill="#004aad" y="-15" height="179.999997" fill-opacity="1"/><path stroke-linecap="butt" transform="matrix(0.462963, 0, 0, 0.462963, 0.00000125, 0.000002)" fill="none" stroke-linejoin="miter" d="M 162.000002 -0.00000432 C 72.528749 -0.00000432 -0.0000027 72.528748 -0.0000027 162.000001 C -0.0000027 251.471253 72.528749 324.000005 162.000002 324.000005 C 251.471255 324.000005 324.000007 251.471253 324.000007 162.000001 C 324.000007 72.528748 251.471255 -0.00000432 162.000002 -0.00000432 Z M 162.000002 -0.00000432 " stroke="#ffffff" stroke-width="25.92" stroke-opacity="1" stroke-miterlimit="4"/></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(35.227616, 100.231475)"><g><path d="M 30.234375 -1.6875 C 27.691406 -0.0078125 24.648438 0.828125 21.109375 0.828125 C 15.429688 0.828125 11.03125 -1.234375 7.90625 -5.359375 C 4.78125 -9.492188 3.21875 -15.960938 3.21875 -24.765625 C 3.21875 -32.828125 4.722656 -38.953125 7.734375 -43.140625 C 10.753906 -47.328125 15.191406 -49.421875 21.046875 -49.421875 C 24.671875 -49.421875 27.78125 -48.523438 30.375 -46.734375 C 32.976562 -44.953125 34.984375 -42.195312 36.390625 -38.46875 C 37.804688 -34.75 38.515625 -30.070312 38.515625 -24.4375 C 38.515625 -15.882812 36.957031 -9.472656 33.84375 -5.203125 C 35.125 -4.015625 36.191406 -3.066406 37.046875 -2.359375 C 37.898438 -1.648438 38.703125 -1.097656 39.453125 -0.703125 L 37.03125 3.71875 C 35.96875 3.132812 34.914062 2.410156 33.875 1.546875 C 32.84375 0.691406 31.628906 -0.382812 30.234375 -1.6875 Z M 25.828125 -5.5625 C 24.117188 -6.976562 22.457031 -8.007812 20.84375 -8.65625 L 22.9375 -13.234375 C 24.90625 -12.523438 27.082031 -11.164062 29.46875 -9.15625 C 31.476562 -12.375 32.484375 -17.34375 32.484375 -24.0625 C 32.484375 -30.78125 31.503906 -35.8125 29.546875 -39.15625 C 27.597656 -42.507812 24.644531 -44.1875 20.6875 -44.1875 C 16.550781 -44.1875 13.609375 -42.460938 11.859375 -39.015625 C 10.117188 -35.566406 9.25 -30.492188 9.25 -23.796875 C 9.25 -17.128906 10.269531 -12.234375 12.3125 -9.109375 C 14.351562 -5.992188 17.222656 -4.4375 20.921875 -4.4375 C 22.816406 -4.4375 24.453125 -4.8125 25.828125 -5.5625 Z M 25.828125 -5.5625 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(76.966667, 100.231475)"><g><path d="M 34.84375 -35.203125 L 29.265625 -33.875 C 27.984375 -40.75 24.878906 -44.1875 19.953125 -44.1875 C 16.222656 -44.1875 13.503906 -42.515625 11.796875 -39.171875 C 10.097656 -35.835938 9.25 -30.703125 9.25 -23.765625 C 9.25 -10.859375 12.828125 -4.40625 19.984375 -4.40625 C 25.578125 -4.40625 28.835938 -8.550781 29.765625 -16.84375 L 35.4375 -15.375 C 34.019531 -4.570312 28.894531 0.828125 20.0625 0.828125 C 14.664062 0.828125 10.507812 -1.210938 7.59375 -5.296875 C 4.675781 -9.390625 3.21875 -15.8125 3.21875 -24.5625 C 3.21875 -32.65625 4.597656 -38.820312 7.359375 -43.0625 C 10.117188 -47.300781 14.328125 -49.421875 19.984375 -49.421875 C 28.429688 -49.421875 33.382812 -44.679688 34.84375 -35.203125 Z M 34.84375 -35.203125 "/></g></g></g></svg>`,
});
const notPlanedMarkerIcon = new L.divIcon({
  className: "custom-svg-marker",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 150 149.999998"><defs><g/><clipPath id="69331bbfe6"><path d="M 75 0 C 33.578125 0 0 33.578125 0 75 C 0 116.421875 33.578125 150 75 150 C 116.421875 150 150 116.421875 150 75 C 150 33.578125 116.421875 0 75 0 Z M 75 0 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#69331bbfe6)"><rect x="-15" width="180" fill="#ff5757" y="-15" height="179.999997" fill-opacity="1"/><path stroke-linecap="butt" transform="matrix(0.462963, 0, 0, 0.462963, 0.00000125, 0.000002)" fill="none" stroke-linejoin="miter" d="M 162.000002 -0.00000432 C 72.528749 -0.00000432 -0.0000027 72.528748 -0.0000027 162.000001 C -0.0000027 251.471253 72.528749 324.000005 162.000002 324.000005 C 251.471255 324.000005 324.000007 251.471253 324.000007 162.000001 C 324.000007 72.528748 251.471255 -0.00000432 162.000002 -0.00000432 Z M 162.000002 -0.00000432 " stroke="#ffffff" stroke-width="25.92" stroke-opacity="1" stroke-miterlimit="4"/></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(35.227616, 100.231475)"><g><path d="M 30.234375 -1.6875 C 27.691406 -0.0078125 24.648438 0.828125 21.109375 0.828125 C 15.429688 0.828125 11.03125 -1.234375 7.90625 -5.359375 C 4.78125 -9.492188 3.21875 -15.960938 3.21875 -24.765625 C 3.21875 -32.828125 4.722656 -38.953125 7.734375 -43.140625 C 10.753906 -47.328125 15.191406 -49.421875 21.046875 -49.421875 C 24.671875 -49.421875 27.78125 -48.523438 30.375 -46.734375 C 32.976562 -44.953125 34.984375 -42.195312 36.390625 -38.46875 C 37.804688 -34.75 38.515625 -30.070312 38.515625 -24.4375 C 38.515625 -15.882812 36.957031 -9.472656 33.84375 -5.203125 C 35.125 -4.015625 36.191406 -3.066406 37.046875 -2.359375 C 37.898438 -1.648438 38.703125 -1.097656 39.453125 -0.703125 L 37.03125 3.71875 C 35.96875 3.132812 34.914062 2.410156 33.875 1.546875 C 32.84375 0.691406 31.628906 -0.382812 30.234375 -1.6875 Z M 25.828125 -5.5625 C 24.117188 -6.976562 22.457031 -8.007812 20.84375 -8.65625 L 22.9375 -13.234375 C 24.90625 -12.523438 27.082031 -11.164062 29.46875 -9.15625 C 31.476562 -12.375 32.484375 -17.34375 32.484375 -24.0625 C 32.484375 -30.78125 31.503906 -35.8125 29.546875 -39.15625 C 27.597656 -42.507812 24.644531 -44.1875 20.6875 -44.1875 C 16.550781 -44.1875 13.609375 -42.460938 11.859375 -39.015625 C 10.117188 -35.566406 9.25 -30.492188 9.25 -23.796875 C 9.25 -17.128906 10.269531 -12.234375 12.3125 -9.109375 C 14.351562 -5.992188 17.222656 -4.4375 20.921875 -4.4375 C 22.816406 -4.4375 24.453125 -4.8125 25.828125 -5.5625 Z M 25.828125 -5.5625 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(76.966667, 100.231475)"><g><path d="M 34.84375 -35.203125 L 29.265625 -33.875 C 27.984375 -40.75 24.878906 -44.1875 19.953125 -44.1875 C 16.222656 -44.1875 13.503906 -42.515625 11.796875 -39.171875 C 10.097656 -35.835938 9.25 -30.703125 9.25 -23.765625 C 9.25 -10.859375 12.828125 -4.40625 19.984375 -4.40625 C 25.578125 -4.40625 28.835938 -8.550781 29.765625 -16.84375 L 35.4375 -15.375 C 34.019531 -4.570312 28.894531 0.828125 20.0625 0.828125 C 14.664062 0.828125 10.507812 -1.210938 7.59375 -5.296875 C 4.675781 -9.390625 3.21875 -15.8125 3.21875 -24.5625 C 3.21875 -32.65625 4.597656 -38.820312 7.359375 -43.0625 C 10.117188 -47.300781 14.328125 -49.421875 19.984375 -49.421875 C 28.429688 -49.421875 33.382812 -44.679688 34.84375 -35.203125 Z M 34.84375 -35.203125 "/></g></g></g></svg>`,
});

const secondaryPlanedMarkerIcon = new L.divIcon({
  className: "custom-svg-marker",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" zoomAndPan="magnify" viewBox="0 0 243.75 243.749992" height="32" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="7960f45e91"><path d="M 0.40625 0.386719 L 243.15625 0.386719 L 243.15625 243.136719 L 0.40625 243.136719 Z M 0.40625 0.386719 " clip-rule="nonzero"/></clipPath><clipPath id="356dbdc34f"><path d="M 121.78125 0.386719 C 54.746094 0.386719 0.40625 54.726562 0.40625 121.761719 C 0.40625 188.796875 54.746094 243.136719 121.78125 243.136719 C 188.8125 243.136719 243.15625 188.796875 243.15625 121.761719 C 243.15625 54.726562 188.8125 0.386719 121.78125 0.386719 Z M 121.78125 0.386719 " clip-rule="nonzero"/></clipPath><clipPath id="9bbbb91912"><path d="M 0.410156 0.386719 L 243.148438 0.386719 L 243.148438 243.125 L 0.410156 243.125 Z M 0.410156 0.386719 " clip-rule="nonzero"/></clipPath><clipPath id="50dd355aa5"><path d="M 121.78125 0.386719 C 54.75 0.386719 0.410156 54.726562 0.410156 121.757812 C 0.410156 188.785156 54.75 243.125 121.78125 243.125 C 188.8125 243.125 243.148438 188.785156 243.148438 121.757812 C 243.148438 54.726562 188.8125 0.386719 121.78125 0.386719 Z M 121.78125 0.386719 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#7960f45e91)"><g clip-path="url(#356dbdc34f)"><path fill="#004aad" d="M 0.40625 0.386719 L 243.15625 0.386719 L 243.15625 243.136719 L 0.40625 243.136719 Z M 0.40625 0.386719 " fill-opacity="1" fill-rule="nonzero"/></g></g><g clip-path="url(#9bbbb91912)"><g clip-path="url(#50dd355aa5)"><path stroke-linecap="butt" transform="matrix(0.749232, 0, 0, 0.749232, 0.410433, 0.386267)" fill="none" stroke-linejoin="miter" d="M 161.993745 0.000602662 C 72.527072 0.000602662 -0.000369785 72.528044 -0.000369785 161.994717 C -0.000369785 251.456177 72.527072 323.983618 161.993745 323.983618 C 251.460418 323.983618 323.982646 251.456177 323.982646 161.994717 C 323.982646 72.528044 251.460418 0.000602662 161.993745 0.000602662 Z M 161.993745 0.000602662 " stroke="#ffffff" stroke-width="24" stroke-opacity="1" stroke-miterlimit="4"/></g></g></svg>`,
});

const secondaryNotPlanedMarkerIcon = new L.divIcon({
  className: "custom-svg-marker",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" zoomAndPan="magnify" viewBox="0 0 243.75 243.749992" height="32" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="a034663329"><path d="M 0.40625 0.386719 L 243.15625 0.386719 L 243.15625 243.136719 L 0.40625 243.136719 Z M 0.40625 0.386719 " clip-rule="nonzero"/></clipPath><clipPath id="d7d250bc8c"><path d="M 121.78125 0.386719 C 54.746094 0.386719 0.40625 54.726562 0.40625 121.761719 C 0.40625 188.796875 54.746094 243.136719 121.78125 243.136719 C 188.8125 243.136719 243.15625 188.796875 243.15625 121.761719 C 243.15625 54.726562 188.8125 0.386719 121.78125 0.386719 Z M 121.78125 0.386719 " clip-rule="nonzero"/></clipPath><clipPath id="8473a3fc5a"><path d="M 0.410156 0.386719 L 243.148438 0.386719 L 243.148438 243.125 L 0.410156 243.125 Z M 0.410156 0.386719 " clip-rule="nonzero"/></clipPath><clipPath id="52048de01d"><path d="M 121.78125 0.386719 C 54.75 0.386719 0.410156 54.726562 0.410156 121.757812 C 0.410156 188.785156 54.75 243.125 121.78125 243.125 C 188.8125 243.125 243.148438 188.785156 243.148438 121.757812 C 243.148438 54.726562 188.8125 0.386719 121.78125 0.386719 Z M 121.78125 0.386719 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#a034663329)"><g clip-path="url(#d7d250bc8c)"><path fill="#ff5757" d="M 0.40625 0.386719 L 243.15625 0.386719 L 243.15625 243.136719 L 0.40625 243.136719 Z M 0.40625 0.386719 " fill-opacity="1" fill-rule="nonzero"/></g></g><g clip-path="url(#8473a3fc5a)"><g clip-path="url(#52048de01d)"><path stroke-linecap="butt" transform="matrix(0.749232, 0, 0, 0.749232, 0.410433, 0.386267)" fill="none" stroke-linejoin="miter" d="M 161.993745 0.000602662 C 72.527072 0.000602662 -0.000369785 72.528044 -0.000369785 161.994717 C -0.000369785 251.456177 72.527072 323.983618 161.993745 323.983618 C 251.460418 323.983618 323.982646 251.456177 323.982646 161.994717 C 323.982646 72.528044 251.460418 0.000602662 161.993745 0.000602662 Z M 161.993745 0.000602662 " stroke="#ffffff" stroke-width="24" stroke-opacity="1" stroke-miterlimit="4"/></g></g></svg>`,
});
const redMarkerIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationMarker = ({
  setLocationInfo,
  handleButtonClicked,
  searchLocation,
  currentLocation,
}) => {
  /**
   * useState
   */
  const [position, setPosition] = useState(null);
  const [type, setType] = useState("");

  /**
   * useMapEvents
   */
  const map = useMapEvents({
    click: (e) => {
      console.log(e.latlng);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom() + 1);
      handleMapClick(e);
    },

    locationfound: (e) => {
      if (type === "SEARCH") {
        console.log("Search Location", searchLocation);
        setPosition(searchLocation);
        map.flyTo(searchLocation, map.getZoom() + 3);
      } else {
        console.log("Curent Location", currentLocation);
        setPosition(currentLocation);
        map.flyTo(currentLocation, map.getZoom() + 3);
      }
    },
  });

  useEffect(() => {
    console.log("Search Location: ", searchLocation);
    if (Object.keys(searchLocation).length !== 0) {
      setType("SEARCH");
      map.locate();
    }
  }, [searchLocation]);

  useEffect(() => {
    console.log("Current Location: ", currentLocation);
    if (Object.keys(currentLocation).length !== 0) {
      setType("CURRENT");
      map.locate();
    }
  }, [currentLocation]);

  /**
   * @param {EventListenerObject} e
   */
  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    console.log("Reverse Geocoding");
    const address = await reverseGeocode(lat, lng);
    setLocationInfo(address);
    handleButtonClicked(1);
    console.log("here");
  };

  /**
   * @param {*} lat
   * @param {*} lng
   * @returns
   */
  const reverseGeocode = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=vi`,
    );
    const data = await response.json();
    return data;
  };

  return position === null ? null : (
    <Marker position={position} icon={redMarkerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

// const MyLocationMarker = ({ currentLocation }) => {
//   /**
//    * useState
//    */
//   const [position, setPosition] = useState(null);

//   /**
//    * useMapEvents
//    */
//   const map = useMapEvents({
//     locationfound: (e) => {
//       console.log("My Location", currentLocation);
//       setPosition(currentLocation);
//       map.flyTo(currentLocation, map.getZoom() + 3);
//     },
//   });

//   console.log("Cu: ", currentLocation);

//   useEffect(() => {
//     if (Object.keys(currentLocation).length !== 0) map.locate();
//   }, [currentLocation]);

//   console.log("Cu: ", currentLocation);
//   console.log("Po: ", position);

//   return position === null ? null : (
//     <Marker position={position} icon={redMarkerIcon}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// };

const Map = ({
  setShape,
  openDrawer,
  setDrawerContent,
  boardDisplayMode,
  currentLocation,
  center,
}) => {
  /**
   * useState
   */
  const [locationList, setLocationList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [searchLocation, setSearchLocation] = useState({});

  /**
   * useEffect
   */
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get("locations/citizen");
        console.log("Location List: ", response.data.data);
        setLocationList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  /**
   * @param {*} locationId
   */
  const handleDetailBtnClicked = (locationId) => {
    setDrawerContent({ locationId: locationId });
    handleButtonClicked(3);
  };

  const handleReportBtnClicked = (location) => {
    setSelectedLocation(location);
    setModalOpen(true);
  };

  useEffect(() => {
    setModalOpen(true);
  }, [selectedLocation]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  /**
   * @param {*} value
   */
  const handleButtonClicked = (value) => {
    console.log("Onclick event: ", value);
    switch (value) {
      case 1:
        setShape(1);
        openDrawer();
        break;
      case 2:
        setShape(2);
        openDrawer();
        break;
      case 3:
        setShape(3);
        openDrawer();
        break;
      default:
        break;
    }
  };

  const renderIcon = (isPlaned, isSet) => {
    if (isPlaned) {
      if (isSet) {
        return planedMarkerIcon;
      } else {
        return secondaryPlanedMarkerIcon;
      }
    } else {
      if (isSet) {
        return notPlanedMarkerIcon;
      } else {
        return secondaryNotPlanedMarkerIcon;
      }
    }
  };

  return (
    <Box>
      <Box
        position="absolute"
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup>
            {boardDisplayMode
              ? locationList.map((location) => (
                  <Marker
                    position={location.coordinate}
                    key={location._id}
                    icon={renderIcon(
                      location.is_planned,
                      location.adsBoardSize,
                    )}
                  >
                    <Popup>
                      <Typography fontWeight="bold">
                        {location.ads_type.label}
                      </Typography>
                      <Typography>{location.location_type.label}</Typography>
                      <Typography>
                        {location.address}, {location.ward.label},{" "}
                        {location.district.label}
                      </Typography>

                      <Typography fontWeight="bold" fontStyle="italic">
                        {location.is_planned
                          ? "ĐÃ QUY HOẠCH"
                          : "CHƯA QUY HOẠCH"}
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="start"
                      >
                        <Button
                          variant="outlined"
                          startIcon={<FindInPageIcon />}
                          sx={{
                            fontWeight: "bold",
                            marginRight: 2,
                          }}
                          onClick={() => handleDetailBtnClicked(location._id)}
                        >
                          Chi tiết
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<ReportIcon />}
                          color="error"
                          sx={{
                            fontWeight: "bold",
                          }}
                          onClick={() => handleReportBtnClicked(location)}
                        >
                          Báo cáo
                        </Button>
                      </Box>
                    </Popup>
                  </Marker>
                ))
              : locationList
                  .filter((location) => location.is_planned === true)
                  .map((location) => (
                    <Marker
                      position={location.coordinate}
                      key={location._id}
                      icon={
                        location.adsBoardSize
                          ? planedMarkerIcon
                          : secondaryPlanedMarkerIcon
                      }
                    >
                      <Popup>
                        <Typography fontWeight="bold">
                          {location.ads_type.label}
                        </Typography>
                        <Typography>{location.location_type.label}</Typography>
                        <Typography>
                          {location.address}, {location.ward.label},{" "}
                          {location.district.label}
                        </Typography>

                        <Typography fontWeight="bold" fontStyle="italic">
                          {location.is_planned
                            ? "ĐÃ QUY HOẠCH"
                            : "CHƯA QUY HOẠCH"}
                        </Typography>
                        <Button
                          variant="outlined"
                          onClick={() => handleDetailBtnClicked(location._id)}
                        >
                          Chi tiết
                        </Button>
                      </Popup>
                    </Marker>
                  ))}
          </MarkerClusterGroup>
          <LocationMarker
            setLocationInfo={setDrawerContent}
            handleButtonClicked={handleButtonClicked}
            searchLocation={searchLocation}
            currentLocation={currentLocation}
          />
          {/* <MyLocationMarker currentLocation={currentLocation} /> */}
        </MapContainer>
        <Box position="absolute" right="5%" top="2%" width="35%" zIndex={500}>
          <SearchBar setSearchLocation={setSearchLocation} />
        </Box>
      </Box>
      {/* <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          display="flex"
          flexDirection="column"
          style={style}
          bgcolor={"white"}
          width="40%"
          height="90%"
          padding={3}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography fontSize={20} fontWeight="bold" color="#475569">
              {selectedLocation.display_name}
            </Typography>
            <Typography fontSize={12} color="#70757a">
              {selectedLocation.address}
            </Typography>
          </Box>
          <Box>
            <ReportForm
              agent={selectedLocation._id}
              type={"location"}
              handleCloseModal={handleCloseModal}
            />
          </Box>
        </Box>
      </Modal> */}
    </Box>
  );
};

export default Map;

Map.propTypes = {
  setShape: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  setDrawerContent: PropTypes.func.isRequired,
  boardDisplayMode: PropTypes.bool.isRequired,
  currentLocation: PropTypes.object,
  center: PropTypes.object.isRequired,
};

LocationMarker.propTypes = {
  setLocationInfo: PropTypes.func.isRequired,
  handleButtonClicked: PropTypes.func.isRequired,
  searchLocation: PropTypes.object,
  currentLocation: PropTypes.object,
};

// MyLocationMarker.propTypes = {
//   currentLocation: PropTypes.object,
// };
