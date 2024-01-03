import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import LocationDetailCard from "./LocationDetailCard";
import LocationDetailAdsboard from "./LocationDetailAdsboard";

const LocationDetail = () => {
  const { locationID } = useParams();
  const [locationDetailData, setLocationDetailData] = useState(null);
  const [adsboards, setAdboards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const respone = await axios.get(
          `http://14.225.192.121/location/${locationID}`
        );
        setLocationDetailData(respone.data.data);
        setAdboards(respone.data.data.adsboards);
      } catch (error) {
        console.error("Lỗi khi gọi API detail location:", error);
      }
    }
    fetchData();
  }, [locationID]);

  console.log("Detail location: ", locationDetailData);

  return (
    <>
      <LocationDetailCard locationDetailData={locationDetailData} />
      <LocationDetailAdsboard listAdsboard={adsboards} />
    </>
  );
};

export default LocationDetail;
