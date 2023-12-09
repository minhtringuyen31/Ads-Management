import { useState, useCallback, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataBoardAds } from "data/fakeDataBoard";
import MainCard from "ui-component/cards/MainCard";

import './styles.scss';
import Modal from "./Modal";

const BoardManagement = ( {locationID} ) => {

  const [openModal, setOpenModal] = useState(null); //đóng mở modal
  const [selectedRow, setSelectedRow] = useState(null); //lưu data của row đc select
  const [filteredData, setFilteredData] = useState([]); //lưu data đã được filter

  const title = useRef("Board Management");

  const handleRowClick = useCallback((params) => {
    setSelectedRow(params.row); //lưu data của row đc chọn
    setOpenModal(true);
  }, []);
 
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.25,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "location_id",
      headerName: "Location ID",
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "adsBoard_type",
      headerName: "Ads Board Type",
      flex: 0.75,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "size",
      headerName: "Size",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return `Height: ${params.row.height}; Width: ${params.row.width}`;
      },
    },
    {
      field: "contract_start_date",
      headerName: "Start date",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "contract_end_date",
      headerName: "End date",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
  ];

  useEffect(() => {
    if (locationID) {
      title.current = `Các bảng quảng cáo tại điểm đặt ${locationID}`;
      const filtered = mockDataBoardAds.filter(
        (item) => item.location_id === locationID
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(mockDataBoardAds);
    }
  }, [locationID]);

  return (
    <MainCard title={title.current}>
      <Box m="0 0 0 0" height="70vh" className="data-grid-container">
        <DataGrid
          rows={filteredData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={handleRowClick}
        />
      </Box>
      {selectedRow && ( //check row đc select & mở modal
        <Modal
          handleOpen={openModal}
          handleClose={() => setOpenModal(false)}
          rowData={selectedRow}
        />
      )}
    </MainCard>
  );
};

export default BoardManagement;