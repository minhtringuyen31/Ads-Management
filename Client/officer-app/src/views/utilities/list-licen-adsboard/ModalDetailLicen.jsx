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

const ModalDetailLicen = ({ open, handleClose, licenDetail }) => {
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
        height="65%"
      >
        <Box display="flex" flexDirection="row" width="100%" round="24px">
          {licenDetail && (
            <>
              <Box display="flex" justifyContent="center" width="50%">
                <SlideImages
                  images={licenDetail.new_ads_board.image}
                  height={350}
                  width={500}
                />
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
                    {licenDetail.new_ads_board.adsboard_type.label}
                  </Typography>
                </Box>
                <Box marginY="5px">
                  <Typography fontSize="16px" color="#70757a">
                    {licenDetail.new_ads_board.location.address}
                  </Typography>
                </Box>
                <Box
                  marginY="5px"
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  <Typography style={{ marginRight: "8px" }}>
                    Kích thước: {licenDetail.new_ads_board.width}m x{" "}
                    {licenDetail.new_ads_board.height}m
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
                      {licenDetail.new_ads_board.location.ads_type.label}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <Typography style={{ marginRight: "8px" }}>
                      Phân loại:
                    </Typography>
                    <Typography fontWeight="bold" display="inline">
                      {licenDetail.new_ads_board.location.location_type.label}
                    </Typography>
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Typography style={{ marginRight: "8px" }}>
                      Thời hạn hợp đồng:
                    </Typography>
                    <Typography display="inline">
                      {licenDetail.contract_start_date} -{" "}
                      {licenDetail.contract_end_date}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  marginY="5px"
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <Typography style={{ marginRight: "8px" }}>
                      Công ty:
                    </Typography>
                    <Typography fontWeight="bold" display="inline">
                      {licenDetail.new_ads_board.name}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <Typography style={{ marginRight: "8px" }}>
                      Địa chỉ công ty:
                    </Typography>
                    <Typography display="inline">
                      {licenDetail.new_ads_board.address}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <Typography style={{ marginRight: "8px" }}>
                      Email:
                    </Typography>
                    <Typography display="inline">
                      {licenDetail.new_ads_board.email}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <Typography style={{ marginRight: "8px" }}>
                      Thông tin liên lạc:
                    </Typography>
                    <Typography display="inline">
                      {licenDetail.new_ads_board.contact_name_person} -{" "}
                      {licenDetail.new_ads_board.phone}
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

export default ModalDetailLicen;
