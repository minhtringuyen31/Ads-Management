import React from "react";
import { Box, IconButton, SwipeableDrawer } from "@mui/material";
import LocationInformation from "../LocationInformation/LocationInformation";
import AdsList from "../AdsInformation/AdsList";
import ReportList from "../Report/ReportList";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

export default function Drawer({
  shape,
  content,
  openDrawer,
  closeDrawer,
  isDrawerOpen,
}) {
  const anchor = "left";

  /**
   *
   * @returns {import("react").HtmlHTMLAttributes}
   */
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
    <Box height="100%" width="100%" display="relative'">
      <React.Fragment key={anchor}>
        <SwipeableDrawer
          anchor={anchor}
          open={isDrawerOpen}
          onClose={closeDrawer}
          onOpen={openDrawer}
          variant="persistent"
          BackdropProps={{
            invisible: true,
          }}
          PaperProps={{
            style: { width: 400 }, // Set the width you desire
          }}
        >
          <Box display="flex" justifyContent="flex-end" margin="5px">
            <IconButton
              aria-label="Close"
              size="small"
              display="absolute"
              right={0}
              onClick={() => closeDrawer()}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {renderShapeEditor()}
        </SwipeableDrawer>
      </React.Fragment>
    </Box>
  );
}

Drawer.propTypes = {
  shape: PropTypes.number.isRequired,
  content: PropTypes.object.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
};
