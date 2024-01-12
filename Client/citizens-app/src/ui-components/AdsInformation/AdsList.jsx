import { List, Box, Typography } from "@mui/material";
import AdsItem from "./AdsItem";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axiosClient from "../../axiosConfig/axiosClient";

const AdsList = ({ content }) => {
  /**
   * useState
   */
  const [adsList, setAdsList] = useState([]);
  // const [locationInfo, setLocationInfo] = useState({});

  /**
   * useEffect
   * Load Ads Board List at Location
   */
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Location: ", content.locationId);
        const response = await axiosClient.get(
          `location/${content.locationId}`,
        );
        if (response.status == 200) {
          console.log("LocationDetail: ", response.data);
          // setLocationInfo(response.data.data);
          setAdsList(response.data.data.adsboards);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        height="50px"
        display="flex"
        alignItems="center"
        margin="15px 15px 0px 15px"
      >
        <Typography color="#70757a" fontSize="14px">
          {adsList.length} bảng quảng cáo
        </Typography>
      </Box>
      <Box bgcolor="white" height="100%">
        <List>
          {adsList.map((item) => (
            <AdsItem key={item._id} item={item} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default AdsList;

AdsList.propTypes = {
  content: PropTypes.object.isRequired,
};
