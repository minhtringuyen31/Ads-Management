import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 375,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  p: 4,
};

const ModalAccept = ({ open, handleClose, handleCancel, title }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ style: { opacity: 0.15 } }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h3" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h5">
          Bạn chắc chắn muốn hủy yêu cầu cấp phép này?
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Button variant="outlined" color="error" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="outlined" onClick={handleCancel} autoFocus>
            Đồng ý
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default ModalAccept;
