import { Fragment } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import "./styles.scss";

import { mockDataBoardAds } from "data/fakeDataBoard";
import { mockDataLocationAds } from "data/fakeDataLocation";
import SlideImages from "./SlideImages";

export default function Modal({ handleOpen, handleClose, rowData }) {
  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        open={handleOpen}
        aria-labelledby="customized-dialog-title"
        className="dialog"
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          className="dialog__title"
          id="customized-dialog-title"
        >
          Chi tiết bảng quảng cáo
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className="dialog__close-button"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className="dialog__content">
          <SlideImages
            images={mockDataLocationAds[rowData.id - 1].image}
            height={200}
            width={250}
            
          />
          {rowData && (
            <div className="dialog__content__detail">
              <Typography
                variant="h4"
                color="text.primary"
                className="dialog__content__detail__typo"
              >
                {mockDataBoardAds[rowData.id - 1].adsBoard_type}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                className="dialog__content__detail__typo"
              >
                {(mockDataLocationAds[rowData.location_id - 1].coordinate).address}
              </Typography>
              <Typography
                color="text.primary"
                className="dialog__content__detail__typo"
              >
                Kích thước: {mockDataBoardAds[rowData.id - 1].width} x{" "}
                {mockDataBoardAds[rowData.id - 1].height}
              </Typography>
              <Typography
                color="text.primary"
                className="dialog__content__detail__typo"
              >
                Hình thức:{" "}
                {mockDataLocationAds[rowData.location_id - 1].ads_type}
              </Typography>
              <Typography
                color="text.primary"
                className="dialog__content__detail__typo"
              >
                Phân loại:{" "}
                {mockDataLocationAds[rowData.location_id - 1].location_type}
              </Typography>
              <Typography
                color="text.primary"
                className="dialog__content__detail__typo"
              >
                Ngày hết hạn:{" "}
                {mockDataBoardAds[rowData.id - 1].contract_end_date}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}