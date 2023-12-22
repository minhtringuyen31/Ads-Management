import React from "react";
import { SwipeableDrawer } from "@mui/material";
import LocationInformation from "../LocationInformation/LocationInformation";
import AdsList from "../AdsInformation/AdsList";
import ReportList from "../Report/ReportList";
import PropTypes from "prop-types";

export default function Drawer({
  shape,
  content,
  openDrawer,
  closeDrawer,
  isDrawerOpen,
}) {
  const anchor = "left";

  const renderShapeEditor = () => {
    switch (shape) {
      case 1:
        return <LocationInformation content={content} />;
      case 2:
        return <ReportList content={content} />;
      case 3:
        return <AdsList content={content} />;
      default:
        return <div>Not found area</div>;
    }
  };
  return (
    <div>
      <React.Fragment key={anchor}>
        <SwipeableDrawer
          anchor={anchor}
          open={isDrawerOpen}
          onClose={closeDrawer}
          onOpen={openDrawer}
          BackdropProps={{
            invisible: true,
          }}
          PaperProps={{
            style: { width: 400 }, // Set the width you desire
          }}
        >
          {renderShapeEditor()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

Drawer.propTypes = {
  shape: PropTypes.number.isRequired,
  content: PropTypes.object.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
};
