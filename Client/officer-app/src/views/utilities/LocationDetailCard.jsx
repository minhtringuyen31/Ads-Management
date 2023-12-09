import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import "./styles.scss";

import { mockDataLocationAds } from "data/fakeDataLocation";
import SlideImages from "./SlideImages";
import MapModal from "./MapModal";

const LocationDetailCard = ({ locationID }) => {

  const [openMapModal, setOpenMapModal] = useState(false);

  const handleOpenMapModal = () => {
    setOpenMapModal(true);
  };

  const handleCloseMapModal = () => {
    setOpenMapModal(false);
  };

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
              {mockDataLocationAds[locationID - 1].location_type}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              className="card__box__content__typo"
            >
              {mockDataLocationAds[locationID - 1].coordinate.address}
            </Typography>
            <Typography
              // variant="subtitle1"
              color="text.secondary"
              component="div"
              className="card__box__content__typo"
            >
              {mockDataLocationAds[locationID - 1].ads_type}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              className="card__box__content__typo"
            >
              {mockDataLocationAds[locationID - 1].is_planned}
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
          images={mockDataLocationAds[locationID - 1].image}
          height={300}
          width={400}
        />
      </Card>
      <MapModal
        open={openMapModal}
        onClose={handleCloseMapModal}
        lat={mockDataLocationAds[locationID - 1].coordinate.lat}
        lng={mockDataLocationAds[locationID - 1].coordinate.lng}
      />
    </>
  );
};

export default LocationDetailCard;