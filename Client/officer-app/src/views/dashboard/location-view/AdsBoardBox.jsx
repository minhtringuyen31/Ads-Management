import { Box, Divider, Grid, Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';

const AdsBoardBox = (props) => {
  return (
    <MainCard
      style={{
        width: '100%',
        borderColor: 'lightgray',
        marginBottom: '10px',
      }}
    >
      <Grid item xs={12} lg={12}>
        <Box
          display='flex'
          flexDirection='column'
          gap='10px'
          sx={{ cursor: 'pointer', width: '100%' }}
        >
          <Typography variant='h3'>{props.data.adsboard_type.label}</Typography>
          <Typography>
            Kích thước:{' '}
            <span
              style={{
                fontWeight: 'bold',
              }}
            >
              {props.data.height}m x {props.data.width}m
            </span>
          </Typography>
          <Typography>
            Số lượng:{' '}
            <span
              style={{
                fontWeight: 'bold',
              }}
            >
              {props.data.amount}
            </span>
          </Typography>
          <Divider
            sx={{
              width: '100%',
            }}
          />
          {props.data.company && (
            <>
              <Typography variant='h4'>{props.data.company.name}</Typography>
              <Typography>
                Địa chỉ:{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {props.data.company.address}
                </span>
              </Typography>
            </>
          )}
          <Typography>
            Ngày đăng ký:{' '}
            <span
              style={{
                fontWeight: 'bold',
              }}
            >
              {props.data.contract_start_date
                ? moment
                    .utc(props.data.contract_start_date)
                    .format('DD/MM/YYYY')
                : 'Chưa có'}
            </span>
          </Typography>
          <Typography>
            Ngày hết hợp đồng:{' '}
            <span
              style={{
                fontWeight: 'bold',
              }}
            >
              {props.data.contract_end_date
                ? moment.utc(props.data.contract_end_date).format('DD/MM/YYYY')
                : 'Chưa có'}
            </span>
          </Typography>
        </Box>
      </Grid>
    </MainCard>
  );
};

AdsBoardBox.propTypes = {
  data: PropTypes.object,
};

export default AdsBoardBox;
