import React, { useState } from "react";
import { SwipeableDrawer } from "@mui/material";
import LocationInformation from "../LocationInformation/LocationInformation";
import Report from "../Report/Report";
import AdsList from "../AdsInformation/AdsList";

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
        return <Report content={content} />;
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
        >
          {renderShapeEditor()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
