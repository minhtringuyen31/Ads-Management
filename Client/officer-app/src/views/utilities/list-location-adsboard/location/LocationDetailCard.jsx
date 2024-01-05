import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import "../styles.scss";

import SlideImages from "../../SlideImages";
import MapModal from "../map/MapModal";

const LocationDetailCard = ({ locationDetailData }) => {
  const [openMapModal, setOpenMapModal] = useState(false);

  const handleOpenMapModal = () => {
    setOpenMapModal(true);
  };

  const handleCloseMapModal = () => {
    setOpenMapModal(false);
  };

  if (!locationDetailData) {
    return <div>Loading...</div>;
  }

  console.log("Data detail: ", locationDetailData);

  return (
    <>
      <Card className="card">
        <Box className="card__box">
          <CardContent className="card__box__content">
            <Typography
              component="div"
              variant="h4"
              color="text.primary"
              className="card__box__content__typo"
            >
              {locationDetailData.location_type.label}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              className="card__box__content__typo"
            >
              {locationDetailData.address}, {locationDetailData.ward.label},{" "}
              {locationDetailData.district.label}
            </Typography>
            <Typography
              color="text.secondary"
              component="div"
              className="card__box__content__typo"
            >
              {locationDetailData.ads_type.label}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              className="card__box__content__typo"
            >
              {locationDetailData.is_planned}
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={handleOpenMapModal}
              className="card__box__content__typo"
            >
              View in map
              <MapIcon />
            </Link>
          </CardContent>
        </Box>
        <SlideImages
          images={locationDetailData.image}
          height={300}
          width={400}
        />
      </Card>
      <MapModal
        open={openMapModal}
        onClose={handleCloseMapModal}
        lat={locationDetailData.coordinate.lat}
        lng={locationDetailData.coordinate.lng}
        address={locationDetailData.address}
      />
    </>
  );
};

export default LocationDetailCard;
