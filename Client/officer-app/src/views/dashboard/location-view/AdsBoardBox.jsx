import { Divider, Grid, Typography,Box } from '@mui/material';
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
          <Typography variant='h3'>{props.data.type}</Typography>
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
          <Typography variant='h4'>
            Công ty TNHH Không chịu trách nhiệm
          </Typography>
          <Typography>
            Địa chỉ:{' '}
            <span
              style={{
                fontWeight: 'bold',
              }}
            >
              123 Nguyễn Tất Thành, Phường 1, Quận 4
            </span>
          </Typography>
          <Typography>
            Ngày đăng ký:{' '}
            <span
              style={{
                fontWeight: 'bold',
              }}
            >
              {moment.utc(props.data.contract_start_date).format('DD/MM/YYYY')}
            </span>
          </Typography>
          <Typography>
            Ngày hết hợp đồng:{' '}
            <span
              style={{
                fontWeight: 'bold',
              }}
            >
              {moment.utc(props.data.contract_end_date).format('DD/MM/YYYY')}
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
