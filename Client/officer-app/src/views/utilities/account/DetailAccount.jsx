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
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router";

const AssignRole = () => {
  const account = {
    role: "ward_officer",
    assign_areaid: "",
  };
  const navigate = useNavigate();
  const handleAssignBtnClicked = () => {
    navigate("/utils/assign_role");
  };
  /**
   * useeEffect
   */
  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const response = await axios.get("http://14.225.192.121/districts");
  //         if (response.status === 200) {
  //           console.log("District List: ", response.data);
  //           setDistrictList(response.data.data);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     fetchData();
  //   }, []);

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
                    onClick={() => handleAssignBtnClicked()}
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
      </MainCard>
    </>
  );
};

export default AssignRole;
