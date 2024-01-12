import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import MainCard from "ui-component/cards/MainCard";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";

const labelStyle = {
  opacity: 0, // Initially hide the label
  marginLeft: "8px", // Adjust spacing as needed
  transition: "opacity 0.3s", // Add a smooth transition effect for opacity
};

const validateSchema = Yup.object().shape({
  assignArea: Yup.string().max(255).required("Yêu cầu chọn khu vực phân công"),
});

const initialValues = {
  assignArea: "",
};

const AssignRole = () => {
  const account = {
    role: "ward_officer",
    assign_areaid: "",
  };
  const [districtList, setDistrictList] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wardList, setWardList] = useState([]);

  const handleSubmitForm = async (values) => {
    const postBody = {
      accountId: 12,
      assign_areaid: values.assignArea,
    };
    console.log("Assign Role: ", postBody);

    // try {
    //   const response = await axios.post("http://14.225.192.121/user",
    //     JSON.stringify(postBody),
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     },")
    // } catch (error) {
    //   console.log(error);
    // }
  };

  /**
   * useeEffect
   */
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://14.225.192.121/districts");
        if (response.status === 200) {
          console.log("District List: ", response.data);
          setDistrictList(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Selected District: ", selectedDistrict);
        const response = await axios.get(
          `http://14.225.192.121/getWardsOfDistrict/${selectedDistrict}`,
        );
        if (response.status === 200) {
          console.log("Ward List: ", response.data);
          setWardList(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [selectedDistrict]);
  return (
    <>
      <MainCard title="Phân công khu vực quản lý">
        <Box marginBottom={4}>
          <Typography fontSize={18} fontWeight="bold" marginBottom={2}>
            {" "}
            Thông tin tài khoản
          </Typography>
          <Box marginX={5}>
            <Box display="flex" flexDirection="row" marginBottom={2}>
              <Typography fontSize={16} color="#374151" marginRight={2}>
                Họ và tên:
              </Typography>
              <Typography fontSize={16} color="#374151" fontWeight="bold">
                {" "}
                Nguyễn Văn A
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" marginBottom={2}>
              <Typography fontSize={16} color="#374151" marginRight={2}>
                Địa chỉ email:
              </Typography>
              <Typography fontSize={16} color="#374151" fontWeight="bold">
                {" "}
                nva@gmail.com
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" marginBottom={2}>
              <Typography fontSize={16} color="#374151" marginRight={2}>
                Số điện thoại
              </Typography>
              <Typography fontSize={16} color="#374151" fontWeight="bold">
                {" "}
                0131993131
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" marginBottom={2}>
              <Typography fontSize={16} color="#374151" marginRight={2}>
                Phân cấp:
              </Typography>
              <Typography fontSize={16} color="#374151" fontWeight="bold">
                {" "}
                Cán bộ Quận
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              marginBottom={2}
              alignItems="center"
            >
              <Typography fontSize={16} color="#374151" marginRight={2}>
                Khu vực quản lý:
              </Typography>
              {account.assign_areaid !== "" ? (
                <Typography fontSize={16} color="#374151" fontWeight="bold">
                  {" "}
                  hadhcankjcha
                </Typography>
              ) : (
                <>
                  <Typography
                    fontSize={16}
                    color="#dc2626"
                    fontWeight="bold"
                    fontStyle="italic"
                  >
                    {" "}
                    Chưa có khu vực quản lý
                  </Typography>
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    marginLeft={1}
                    sx={{
                      transition: "outline 0.3s",
                      "&:hover": {
                        "& .label": {
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    <CreateIcon />
                  </IconButton>
                </>
              )}
            </Box>
            <Box display="flex" flexDirection="row" marginBottom={2}>
              <Typography fontSize={16} color="#374151" marginRight={2}>
                Mật khẩu
              </Typography>
              <Input
                type="password"
                value={3225}
                readOnly
                sx={{
                  outline: "none",
                }}
              ></Input>
            </Box>
            <Box display="flex" flexDirection="row" marginBottom={2}>
              <Typography fontSize={16} color="#374151" marginRight={2}>
                Ngày tạo tại khoản:
              </Typography>
              <Typography fontSize={16} color="#374151" fontWeight="bold">
                {" "}
                11/01/2024
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box marginY={2}>
          <Typography fontSize={18} fontWeight="bold">
            Phân công khu vực quản lý
          </Typography>
          <Box marginX={5}>
            <Formik
              initialValues={initialValues}
              validationSchema={validateSchema}
              onSubmit={handleSubmitForm}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
              }) => (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {account.role === "district_officer" && (
                    <FormControl fullWidth sx={{ marginTop: "25px" }}>
                      <InputLabel htmlFor="outlined-adornment-district">
                        Quận
                      </InputLabel>
                      <Select
                        id="outlined-adornment-district"
                        value={values.assignArea}
                        name="assignArea"
                        label="Quận"
                        onChange={handleChange}
                      >
                        {districtList.map((district) => (
                          <MenuItem key={district._id} value={district._id}>
                            {district.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.assignArea && errors.assignArea && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-district"
                        >
                          {errors.assignArea}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}

                  {account.role === "ward_officer" && (
                    <>
                      <FormControl fullWidth sx={{ marginTop: "25px" }}>
                        <InputLabel htmlFor="outlined-adornment-district">
                          Quận
                        </InputLabel>
                        <Select
                          id="outlined-adornment-district"
                          value={values.district}
                          name="district"
                          label="Quận"
                          onChange={(e) => {
                            handleChange(e);
                            setSelectedDistrict(e.target.value); // Update selectedRole
                          }}
                        >
                          {districtList.map((district) => (
                            <MenuItem key={district._id} value={district._id}>
                              {district.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.district && errors.district && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-district"
                          >
                            {errors.district}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl fullWidth sx={{ marginTop: "25px" }}>
                        <InputLabel htmlFor="outlined-adornment-ward">
                          Phường
                        </InputLabel>
                        <Select
                          id="outlined-adornment-ward"
                          value={values.assignArea}
                          name="assignArea"
                          label="Phường"
                          onChange={handleChange}
                        >
                          {wardList.map((ward) => (
                            <MenuItem key={ward._id} value={ward._id}>
                              {ward.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.assignArea && errors.assignArea && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-ward"
                          >
                            {errors.assignArea}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </>
                  )}
                  <Box width="10%" margin={2}>
                    <Button
                      disableElevation
                      // disabled={isSubmitting}
                      fullWidth
                      size="medium"
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Tạo
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </MainCard>
    </>
  );
};

export default AssignRole;
