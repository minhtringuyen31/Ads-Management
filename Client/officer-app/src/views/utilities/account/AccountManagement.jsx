import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
// import Button from "@mui/material/Button/";
import React from "react";
import MainCard from "ui-component/cards/MainCard";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
// import { Button, TablePagination } from "@mui/base";
import { useEffect } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

const role = {
  province_officer: "Cán bộ cấp Tỉnh",
  district_officer: "Cán bộ cấp Quận/Huyện",
  ward_officer: "Cán bộ cấp Phường/Xã",
};

const AccountManagement = () => {
  const theme = useTheme();
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  };

  const handleCreateNewBtnClick = () => {
    navigate("/utils/create_account");
  };

  const handleRowAccountClicked = (account) => {
    navigate("/utils/account_detail", { state: account._id });
  };

  const renderOfficerRole = (userRole) => {
    return userRole === "" ? "Chưa phân cấp" : role[userRole];
  };

  const renderAssignedArea = (area) => {
    // return area.assigned_areaid && area.assigned_areaid !== undefined
    //   ? area.assigned_areaid.label
    //   : "Chưa phân khu vực";

    if (area.assigned_areaid && area.assigned_areaid !== undefined) {
      switch (area.userRole) {
        case "ward_officer":
          return `${area.assigned_areaid.label}/${area.assigned_areaid.district.label}`;
        case "district_officer":
          return `${area.assigned_areaid.label}`;
        case "province_officer":
          return `${area.assigned_areaid.label}`;
        default:
          return "";
      }
    } else {
      return "Chưa phân khu vực";
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://14.225.192.121/users");
        console.log("Account List: ", response.data);
        setAccounts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <MainCard title="Quản lý tài khoản cán bộ">
        {/* <Scrollbar> */}
        <Box display="flex" justifyContent="end" marginBottom={1}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddIcon />}
            onClick={() => handleCreateNewBtnClick()}
          >
            tạo Tài Khoản
          </Button>
        </Box>
        <Box className="data-grid-container">
          <Table>
            <TableHead
              sx={{
                backgroundColor: theme.palette.primary.light,
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  STT
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    width: "20%",
                  }}
                >
                  Họ và tên
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Số điện thoại
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Mật khẩu
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Phân cấp
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Khu vực quản lý
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((account, index) => (
                  <TableRow
                    key={account._id}
                    onClick={() => handleRowAccountClicked(account)}
                    hover
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{account.fullname}</TableCell>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>{account.phone}</TableCell>
                    <TableCell>{}</TableCell>
                    <TableCell>{renderOfficerRole(account.userRole)}</TableCell>
                    <TableCell>{renderAssignedArea(account)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <span />
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={accounts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={"Số hàng mỗi trang"}
            labelDisplayedRows={({ from, to, count }) => {
              return "" + from + " - " + to + " của " + count;
            }}
          />
        </Box> */}
      </MainCard>
    </>
  );
};

export default AccountManagement;
