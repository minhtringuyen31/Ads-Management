import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const ModalAccept = ({ open, handleClose, handleCancel, title }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      BackdropProps={{ style: { opacity: 0.15 } }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{/* Nội dung Dialog tùy bạn */}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleCancel} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalAccept;