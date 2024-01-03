import { Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import "../styles.scss";
import MapView from "./MapView";

const MapModal = ({ open, onClose, lat, lng }) => {
  return (
    <Fragment>
      <Dialog
        onClose={onClose}
        open={open}
        aria-labelledby="customized-dialog-title"
        className="dialog"
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          className="dialog__title"
          id="customized-dialog-title"
        >
          View in Map
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          className="dialog__close-button"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className="dialog__content">
          <MapView lat={lat} lng={lng} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default MapModal;
