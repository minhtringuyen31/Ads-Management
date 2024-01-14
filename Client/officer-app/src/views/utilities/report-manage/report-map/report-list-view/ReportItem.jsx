import { Box, Button, Grid, Typography } from '@mui/material';
import moment from 'moment';

import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReportContext from 'store/report/report-context';
import MainCard from 'ui-component/cards/MainCard';

const ReportItem = (props) => {
  const reportCtx = useContext(ReportContext);
  const handleDetailReport = () => {
    reportCtx.setReportDetail(props.data._id);
  };

  return (
    <MainCard
      style={{
        width: '100%',
        borderColor: 'lightgray',
        marginBottom: '10px',
      }}
    >
      <Grid container spacing={0}>
        <Grid container item xs={6} lg={12}>
          <Grid item xs={6} lg={6}>
            <h3>{props.data.report_form.label}</h3>
          </Grid>
          <Grid item xs={6} lg={6} display='flex' justifyContent='flex-end'>
            <Link to='/utils/report/detail'>
              <Button
                variant='outlined'
                color='primary'
                onClick={handleDetailReport}
              >
                <Typography variant='subtitle1' color='primary'>
                  Xem chi tiết
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={6} lg={12}>
          <Box>
            <Typography variant='h6' color='primary' gutterBottom>
              Thông tin người gửi
            </Typography>
            <Typography variant='subtitle1'>
              Họ tên: {props.data.username}
            </Typography>
            <Typography variant='subtitle1'>
              Email: {props.data.email}
            </Typography>
            <Typography variant='subtitle1'>
              Điện thoại: {props.data.phone_number}
            </Typography>
            <Typography variant='h6' color='primary' gutterBottom>
              Thông tin báo cáo
            </Typography>
            <Typography variant='subtitle1'>
              Hình thức:{' '}
              {props.data.type === 'location' ? 'Địa điểm' : 'Bảng quảng cáo'}
            </Typography>
            <Typography variant='subtitle1'>
              Địa chỉ:{' '}
              {props.data.type === 'location'
                ? props.data.location.address
                : props.data.board.location.address}
            </Typography>
            <Typography variant='subtitle1'>
              Ngày gửi:{' '}
              {moment(props.data.createdAt).format('DD/MM/YYYY HH:mm')}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
};

ReportItem.propTypes = {
  data: PropTypes.object,
};

export default ReportItem;
