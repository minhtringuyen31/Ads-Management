import PropTypes from "prop-types";
import { Box, Fade, Popper } from "@mui/material";
import NotificationItem from "./NotificationItem";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../provider/SocketProvider";

const NotificationPopper = ({
  //   openPopper,
  //   closePopper,
  isPopperOpen,
  anchorRef,
}) => {
  console.log("Popper open: ", isPopperOpen);
  const id = isPopperOpen ? "simple-popper" : undefined;
  const socket = useContext(SocketContext);

  // useEffect(() => {
  //   socket.on("notification", (notificationData) => {
  //     console.log("Notification: ", notificationData);
  //   });
  // }, [socket]);

  return (
    <Popper
      id={id}
      open={isPopperOpen}
      anchorEl={anchorRef.current}
      transition
      sx={{ zIndex: 1001 }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Box
            sx={{
              borderRadius: 2,
              bgcolor: "background.paper",
              marginBottom: 1,
              width: "400px",
            }}
          >
            <NotificationItem />
            <NotificationItem />
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

export default NotificationPopper;

NotificationPopper.propTypes = {
  //   openPopper: PropTypes.func.isRequired,
  //   closePopper: PropTypes.func.isRequired,
  isPopperOpen: PropTypes.bool.isRequired,
  anchorRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
};
