import { Box, Typography, Button, Modal } from "@mui/material";
import SlideImages from "../SlideImages";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: 10,
};

const ModalDetail = ({ open, handleClose, adDetail }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        style={style}
        bgcolor={"white"}
        width="60%"
        height="50%"
      >
        <Box display="flex" flexDirection="row" width="100%" round="24px">
          {adDetail && (
            <>
              <Box display="flex" justifyContent="center" width="50%">
                <SlideImages images={adDetail.image} height={250} width={500} />
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                width="50%"
                padding={2}
                justifyContent="center"
              >
                <Box>
                  <Typography fontSize="18px" fontWeight="bold">
                    {adDetail.adsboard_type.label}
                  </Typography>
                </Box>
                <Box marginY="5px">
                  <Typography fontSize="16px" color="#70757a">
                    {adDetail.location.address}
                  </Typography>
                </Box>
                <Box marginY="5px">
                  <Typography style={{ marginRight: "8px" }}>
                    Kích thước: {adDetail.width}m x {adDetail.height}m
                  </Typography>
                  <Box display="flex" flexDirection="row">
                    <Typography style={{ marginRight: "8px" }}>
                      Số lượng:
                    </Typography>
                    <Typography fontWeight="bold"> 1 trụ/bảng</Typography>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <Typography style={{ marginRight: "8px" }}>
                      Hình thức:{" "}
                    </Typography>
                    <Typography fontWeight="bold">
                      {adDetail.location.ads_type.label}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <Typography style={{ marginRight: "8px" }}>
                      Phân loại:
                    </Typography>
                    <Typography fontWeight="bold" display="inline">
                      {adDetail.location.location_type.label}
                    </Typography>
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Typography style={{ marginRight: "8px" }}>
                      Thời hạn hợp đồng:
                    </Typography>
                    <Typography fontWeight="bold" display="inline">
                      {adDetail.contract_start_date} -{" "}
                      {adDetail.contract_end_date}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="end"
          paddingRight="16px"
          alignItem="center"
          width="100%"
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{
              fontWeight: "bold",
            }}
            onClick={handleClose}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDetail;
