import React from "react";
import axios from "axios";
import { GetUser } from "store/auth/auth-config";
import instance from "axiosConfig/axios-config";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { format } from "date-fns";
import moment from "moment";
import MainCard from "ui-component/cards/MainCard";
import ModalAccept from "../../list-licen-adsboard/ModalAccept";
import SlideImages from "../../../utilities/SlideImages";

// STYLE BODY
const FormBodyStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
};

const FormBodyItemStyle = {
  width: "100%",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  paddingBottom: "1.25rem",
  paddingTop: "1.25rem",
  alignItems: "center",
  border: "1px solid gray",
  borderRadius: "0.25rem",
};

const FormBodyItemContentStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

const RequestEditDetail = () => {
  const navigate = useNavigate();
  const userRole = GetUser().userRole;
  const requestEdit = useLocation();
  const requestEditID = requestEdit.state?.requestEditID;
  console.log("afa: ", requestEdit.state?.requestEditID);

  //  /**
  //   * useLocation
  //   */
  //  const location = useLocation();
  //  const { state: content } = location;
  //  const id = content;

  //---------------------- Init State ----------------------

  //Request edit detail
  const [requestEditData, setRequestEditData] = useState({});
  const [requestEditBoardID, setRequestEditBoardID] = useState("");
  const [adsboardData, setAdsboardData] = useState({});

  const [requestEditLocationID, setRequestEditLocationID] = useState("");
  const [locationData, setLocationData] = useState({});

  //Modal confirm
  const [cancelId, setCancelId] = useState(null);
  const [openModalConfirmAgree, setOpenModalConfirmAgree] = useState(false);
  const [openModalConfirmDeny, setOpenModalConfirmDeny] = useState(false);

  //Showw Alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
    navigate("/utils/edit_requests");
  };
  const handleCloseFailAlert = () => {
    setShowFailAlert(false);
  };

  //---------------------- Handle ----------------------
  //Fetch request edit data
  useEffect(() => {
    const fetchEditRequestData = async () => {
      try {
        const response = await instance.get(
          `http://14.225.192.121/editRequest/${requestEditID}`,
        );
        if (response.status < 300) {
          setRequestEditData(response.data.data);

          if (response.data.data.type === "location") {
            setRequestEditLocationID(response.data.data.newInformation.id);
          } else {
            setRequestEditBoardID(response.data.data.newInformation.id);
          }
        }
      } catch (error) {
        console.error("Lỗi fetching edit request data", error.message);
      } finally {
      }
    };
    fetchEditRequestData();
  }, [requestEditID]);

  // //Fetch adsboard/ location tương ứng
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (requestEditData.type === "location") {
          const response = await axios.get(
            `http://14.225.192.121/location/${requestEditLocationID}`,
          );
          if (response.status < 300) {
            setLocationData(response.data.data);
          }
        } else if (requestEditData.type === "board") {
          const response = await axios.get(
            `http://14.225.192.121/adsboard/${requestEditBoardID}`,
          );
          if (response.status < 300) {
            setAdsboardData(response.data.data);
            console.log("ýeh board");
          }
        }
      } catch (error) {
        console.error("Lỗi fetch data", error);
      }
    };
    fetchData();
  }, [requestEditBoardID, requestEditData.type, requestEditLocationID]);

  //
  const handleAgree = async (status) => {
    if (cancelId) {
      console.log("ID nè", cancelId);
      try {
        const respone = await axios.put(
          `http://14.225.192.121/editRequest/${cancelId}`,
          {
            status: status,
          },
        );
        if (respone.status < 300) {
          navigate("/utils/edit_requests");
        }
        console.log(respone);
      } catch (error) {
        console.error("Error cancel request: ", error);
      }
      setOpenModalConfirmAgree(false);
      setOpenModalConfirmDeny(false);
    }
  };

  //Modal
  const handleOpenModelConfirmAgree = (id) => {
    setCancelId(id);
    setOpenModalConfirmAgree(true);
  };
  const handleOpenModelConfirmDeny = (id) => {
    setCancelId(id);
    setOpenModalConfirmDeny(true);
  };

  console.log("Adsboard data: ", adsboardData);

  return (
    <>
      <Grid container spacing={2}>
        {/* OLD INFORMATION */}
        <Grid item xs={12} lg={6}>
          <MainCard>
            {requestEditData.type === "location" ? (
              <Box>
                <Typography>
                  <h1>Thông tin điểm đặt cũ</h1>
                </Typography>

                <Box style={FormBodyStyle}>
                  <Box style={FormBodyItemStyle}>
                    <Box style={FormBodyItemContentStyle}>
                      <TextField
                        label="Địa chỉ"
                        value={locationData.address}
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Tên hiển thị"
                        value={locationData.display_name}
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Loại điểm đặt"
                        value={
                          locationData.location_type
                            ? locationData.location_type.label || ""
                            : ""
                        }
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Loại quảng cáo"
                        value={
                          locationData.ads_type
                            ? locationData.ads_type.label || ""
                            : ""
                        }
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Tình trạng quy hoạch"
                        value={
                          locationData.is_planned === true
                            ? "Đã quy hoạch"
                            : "Chưa quy hoạch"
                        }
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <Box display="flex" justifyContent="center" width="100%">
                        {locationData.image && locationData.image.length > 0 ? (
                          <SlideImages images={locationData.image} />
                        ) : (
                          <p>Không có hình ảnh</p>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography>
                  <h1>Thông tin bảng quảng cáo cũ</h1>
                </Typography>

                <Box style={FormBodyStyle}>
                  <Box style={FormBodyItemStyle}>
                    <Box style={FormBodyItemContentStyle}>
                      <TextField
                        label="Địa chỉ"
                        value={
                          adsboardData.location
                            ? adsboardData.location.address || ""
                            : ""
                        }
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Loại bảng quảng cáo"
                        value={
                          adsboardData.adsboard_type
                            ? adsboardData.adsboard_type.label || ""
                            : ""
                        }
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          gap: "1rem",
                        }}
                      >
                        <TextField
                          label="Chiều cao"
                          style={{ width: "50%" }}
                          value={adsboardData.height}
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />

                        <TextField
                          label="Chiều rộng"
                          style={{ width: "50%" }}
                          value={adsboardData.width}
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1rem",
                        }}
                      >
                        <TextField
                          label="Ngày bắt đầu hợp đồng"
                          value={moment(
                            adsboardData.contract_start_date,
                          ).format(
                            "DD/MM/YYYY",
                            // "YYYY-MM-DDTHH:mm:ss.SSSZ" // Sử dụng Z để bao gồm thông tin múi giờ
                          )}
                          style={{
                            width: "50%",
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          label="Ngày kết thúc hợp đồng"
                          value={moment(adsboardData.contract_end_date).format(
                            "DD/MM/YYYY",
                          )}
                          style={{
                            width: "50%",
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="center" width="100%">
                        {adsboardData.image && adsboardData.image.length > 0 ? (
                          <SlideImages images={adsboardData.image} />
                        ) : (
                          <p>Không có hình ảnh</p>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </MainCard>
        </Grid>

        {/* NEW INFORMATION */}
        <Grid item xs={12} lg={6}>
          <MainCard>
            {requestEditData.type === "location" ? (
              <Box>
                <Typography>
                  <h1>Thông tin điểm đặt cần chỉnh sửa</h1>
                </Typography>
                <Box style={FormBodyStyle}>
                  <Box style={FormBodyItemStyle}>
                    <Box style={FormBodyItemContentStyle}>
                      <TextField
                        label="Địa chỉ"
                        value={requestEditData.newInformation.address}
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Tên hiển thị"
                        value={requestEditData.newInformation.display_name}
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Loại điểm đặt"
                        value={
                          requestEditData.newInformation.location_type
                            ? requestEditData.newInformation.location_type
                                .label || ""
                            : ""
                        }
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Loại quảng cáo"
                        value={
                          requestEditData.newInformation.ads_type
                            ? requestEditData.newInformation.ads_type.label ||
                              ""
                            : ""
                        }
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Tình trạng quy hoạch"
                        value={
                          requestEditData.newInformation.is_planned === true
                            ? "Đã quy hoạch"
                            : "Chưa quy hoạch"
                        }
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Lí do chỉnh sửa"
                        value={requestEditData.reason}
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Ngày gửi yêu cầu"
                        value={format(
                          new Date(requestEditData.createdAt),
                          "dd/MM/yyyy",
                        )}
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <Box display="flex" justifyContent="center" width="100%">
                        {requestEditData.newInformation.image &&
                        requestEditData.newInformation.image.length > 0 ? (
                          <SlideImages
                            images={requestEditData.newInformation.image}
                          />
                        ) : (
                          <p>Không có hình ảnh</p>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography>
                  <h1>Thông tin bảng quảng cáo cần chỉnh sửa</h1>
                </Typography>

                <Box style={FormBodyStyle}>
                  <Box style={FormBodyItemStyle}>
                    <Box style={FormBodyItemContentStyle}>
                      <TextField
                        label="Địa chỉ"
                        value={
                          requestEditData.newInformation
                            ? requestEditData.newInformation.location.address ||
                              ""
                            : ""
                        }
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Loại bảng quảng cáo"
                        value={
                          requestEditData.newInformation
                            ? requestEditData.newInformation.adsboard_type
                                .label || ""
                            : ""
                        }
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          gap: "1rem",
                        }}
                      >
                        <TextField
                          label="Chiều cao"
                          style={{ width: "50%" }}
                          value={
                            requestEditData.newInformation
                              ? requestEditData.newInformation.height || ""
                              : ""
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />

                        <TextField
                          label="Chiều rộng"
                          style={{ width: "50%" }}
                          value={
                            requestEditData.newInformation
                              ? requestEditData.newInformation.width || ""
                              : ""
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Box>

                      <TextField
                        label="Lí do chỉnh sửa"
                        value={
                          requestEditData.newInformation
                            ? requestEditData.newInformation.reason || ""
                            : ""
                        }
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        label="Ngày gửi yêu cầu"
                        value={moment(requestEditData.createdAt).format(
                          "DD/MM/YYYY",
                        )}
                        style={{
                          width: "100%",
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <Box display="flex" justifyContent="center" width="100%">
                        {requestEditData.newInformation &&
                        requestEditData.newInformation.image.length > 0 ? (
                          <SlideImages
                            images={requestEditData.newInformation.image}
                          />
                        ) : (
                          <p>Không có hình ảnh</p>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </MainCard>
        </Grid>
      </Grid>

      {userRole === "province_officer" && (
        <>
          <Box sx={{ marginTop: "2rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span></span>

              <Box sx={{ display: "flex", gap: "1rem" }} right={0}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  startIcon={<DoneIcon />}
                  sx={{
                    fontWeight: "bold",
                  }}
                  onClick={() =>
                    handleOpenModelConfirmAgree(requestEditData._id)
                  }
                  disabled={
                    requestEditData.status === "completed" ||
                    requestEditData.status === "canceled" ||
                    requestEditData.status === "rejected"
                  }
                >
                  Duyệt
                </Button>
                <ModalAccept
                  open={openModalConfirmAgree}
                  handleDisagree={(event) => {
                    setOpenModalConfirmAgree(false);
                  }}
                  handleAgree={(event) => {
                    handleAgree("completed");
                  }}
                  title={"Xác nhận"}
                  content={"Bạn chắc chắn muốn duyệt yêu cầu cấp phép này?"}
                />

                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  startIcon={<HighlightOffIcon />}
                  sx={{
                    fontWeight: "bold",
                  }}
                  onClick={() =>
                    handleOpenModelConfirmDeny(requestEditData._id)
                  }
                  disabled={
                    requestEditData.status === "completed" ||
                    requestEditData.status === "canceled" ||
                    requestEditData.status === "rejected"
                  }
                >
                  Loại
                </Button>
                <ModalAccept
                  open={openModalConfirmDeny}
                  handleDisagree={(event) => {
                    setOpenModalConfirmDeny(false);
                  }}
                  handleAgree={(event) => {
                    handleAgree("rejected");
                  }}
                  title={"Xác nhận"}
                  content={"Bạn chắc chắn muốn loại yêu cầu cấp phép này?"}
                />
              </Box>
            </Box>
          </Box>
          <Snackbar
            open={showSuccessAlert}
            autoHideDuration={2000}
            onClose={handleCloseSuccessAlert}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Alert
              onClose={handleCloseSuccessAlert}
              severity="success"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Tạo yêu cầu cấp phép thành công
            </Alert>
          </Snackbar>
          <Snackbar
            open={showFailAlert}
            autoHideDuration={1000}
            onClose={handleCloseFailAlert}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Alert
              onClose={handleCloseFailAlert}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Tạo yêu cầu cấp phép lỗi!
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};
export default RequestEditDetail;
