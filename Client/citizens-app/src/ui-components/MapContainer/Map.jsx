import { useEffect, useMemo, useState } from "react";
import { styled } from '@mui/material/styles';
import { Box, Button, FormControlLabel, Typography, Switch } from "@mui/material";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axiosClient from "../../axiosConfig/axiosClient";
import { useMapEvents } from "react-leaflet";
import { CleaningServices } from "@mui/icons-material";
// import dotenv from "dotenv";

// dotenv.config();

const CustomSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const LocationMarker = ({ setLocationInfo, handleButtonClicked }) => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click: (e) => {
      console.log(e.latlng);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom() + 1);
      handleMapClick(e);
    },
  });

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    console.log("Reverse Geocoding");
    const address = await reverseGeocode(lat, lng);
    setLocationInfo(address);
    handleButtonClicked(1);
    console.log("here");
  };

  const reverseGeocode = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    return data;
  };

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const Map = ({ setShape, openDrawer, setDrawerContent }) => {
  const [locationList, setLocationList] = useState([]);
  const [reportSwitchChecked, setReportSwitchChecked] = useState(false);
  console.log('report swtich: ', reportSwitchChecked)

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
  const center = useMemo(() => ({ lat: 10.823099, lng: 106.629662 }), []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get("locations");
        console.log("Location List: ", response.data.data);
        // if (response.status == 200) {
        //   dispatch(updateTodoList(response.data));
        //   setTimeout(() => {
        //     setLoading(false);
        //   }, 2000);
        // }
        setLocationList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleDetailBtnClicked = (locationId) => {
    setDrawerContent({ locationId: locationId });
    handleButtonClicked(3);
  };

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
          {locationList.map((location) => (
            <Marker
              position={location.coordinate}
              key={location._id}
              icon={location.is_planned ? planedMarkerIcon : notPlanedMarkerIcon}
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
                  {location.is_planned ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH"}
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
          <LocationMarker
            setLocationInfo={setDrawerContent}
            handleButtonClicked={handleButtonClicked}
          />
        </MapContainer>
      </Box>
 
      <Box position='absolute' bgcolor={'rgba(255, 255, 255, 0.75)'} display="flex" flexDirection="row" width="100" margin="10px" paddingLeft="10px" bottom={0} right={0} borderRadius={2} zIndex='1000'>
        <FormControlLabel
          control={<CustomSwitch defaultChecked />}
          label="Bảng QC"
        />
        <FormControlLabel
          control={<CustomSwitch onChange={() => handleButtonClicked(3)} />}
          label="Báo cáo vi phạm"
        />
      </Box>

      <Box
        display="flex"
        justifyContent="end"
        alignItems="center"
        gap="5px"
        // width="100vw"
        // height="100vh"
        bgcolor="#e2e8f0"
        position={"absolute"}
        right={2}
      >
        <Button variant="outlined" onClick={() => handleButtonClicked(1)}>
          Location
        </Button>
        <Button variant="contained" onClick={() => handleButtonClicked(2)}>
          Report
        </Button>
        <Button variant="outlined" onClick={() => handleButtonClicked(3)}>
          Ads Panel
        </Button>
      </Box>
    </Box>
  );
};

export default Map;

Map.propTypes = {
  setShape: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  setDrawerContent: PropTypes.func.isRequired,
};

LocationMarker.propTypes = {
  setLocationInfo: PropTypes.func.isRequired,
  handleButtonClicked: PropTypes.func.isRequired,
};
