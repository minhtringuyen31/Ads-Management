// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Field, useFormik, FormikProvider } from "formik";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   CircularProgress,
//   Autocomplete,
//   TextareaAutosize,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// import MapNew from "../map/MapNew";
// import ImageUpload from "../../ImageUpload";

// // STYLE CONTAINER
// const ContainerStyle = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   width: "100%",
//   gap: "2rem",
//   paddingTop: "1.5rem",
//   paddingBottom: "1.5rem",
//   backgroundColor: "#fff",
//   boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//   borderRadius: "0.75rem",
// };

// // STYLE BODY
// const FormBodyStyle = {
//   width: "70%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   gap: "2rem",
// };

// const FormBodyItemStyle = {
//   width: "100%",
//   paddingLeft: "3.5rem",
//   paddingRight: "3.5rem",
//   paddingBottom: "1.25rem",
//   paddingTop: "1.25rem",
//   alignItems: "center",
//   border: "1px solid gray",
//   borderRadius: "0.25rem",
// };

// const FormBodyItemContentStyle = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
// };

// // STYLE FOOTER
// const FormFooterStyle = {
//   display: "flex",
//   justifyContent: "flex-end",
//   width: "70%",
// };

// const calculateCenter = (locations) => {
//   let totalLat = 0;
//   let totalLng = 0;

//   locations.forEach((location) => {
//     totalLat += location.coordinate.lat;
//     totalLng += location.coordinate.lng;
//   });

//   return {
//     lat: totalLat / locations.length,
//     lng: totalLng / locations.length,
//   };
// };

// const AddLocationProvince = () => {
//   const navigate = useNavigate();

//   //------------- State init -------------
//   //Location
//   const [locationInfoList, setlocationInfoList] = useState([]);
//   const [locationInfoClick, setLocationInfoClick] = useState({});
//   const [mapCenter, setMapCenter] = useState(null);
//   const [isMapModalOpen, setIsMapModalOpen] = useState(false);

//   //Loading, Alert
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
//   const [showFailAlert, setShowFailAlert] = useState(false);

//   //-------------Handle -------------
//   //Location
//   const openMapModal = () => {
//     setIsMapModalOpen(true);
//   };
//   const closeMapModal = () => {
//     setIsMapModalOpen(false);
//   };
//   useEffect(() => {
//     const fetchDataLocation = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get("http://14.225.192.121/locations");
//         if (response.status < 300) {
//           setlocationInfoList(response.data.data);
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching location list", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDataLocation();
//   }, []);
//   useEffect(() => {
//     if (locationInfoList.length > 0) {
//       const center = calculateCenter(locationInfoList);
//       setMapCenter(center);
//     }
//   }, [locationInfoList]);

//   const formik = useFormik({
//     initialValues: {},
//     onSubmit: async (values) => {},
//   });

//   return (
//     <>
//       {isLoading && (
//         <Box
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             bottom: 0,
//             right: 0,
//             width: "100vw",
//             height: "100vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             zIndex: 1500,
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       )}
//       <FormikProvider value={formik}>
//         <form
//           style={ContainerStyle}
//           //   onSubmit={formik.handleSubmit}
//           encType="multipart/form-data"
//         >
//           {/* Begin: HEADER */}
//           <Typography>
//             <h2>Thêm điểm đặt mới</h2>
//           </Typography>
//           {/* End: HEADER */}

//           {/* Begin: BODY */}
//           <Box style={FormBodyStyle}>
//             <Box style={FormBodyItemStyle}>
//               <Box style={FormBodyItemContentStyle}>
//                 <Field
//                   component={TextField}
//                   required
//                   name="address"
//                   label="Điểm đặt (click here)"
//                   value={locationInfoClick.display_name}
//                   defaultValue=""
//                   style={{
//                     width: "100%",
//                     marginRight: "1rem",
//                   }}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   onClick={openMapModal}
//                 />
//                 {mapCenter && (
//                   <MapNew
//                     isOpen={isMapModalOpen}
//                     onOpen={openMapModal}
//                     onClose={closeMapModal}
//                     center={mapCenter}
//                     zoom={15}
//                     locations={locationInfoList}
//                     locationInfoClick={setLocationInfoClick}
//                   />
//                 )}
//               </Box>
//             </Box>
//           </Box>
//           {/* End: BODY */}
//         </form>
//       </FormikProvider>
//     </>
//   );
// };
// export default AddLocationProvince;
