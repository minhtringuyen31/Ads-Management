// material-ui
import { CircleNotifications } from '@mui/icons-material';
import {
  Box,
  Divider,
  Grid,
  List,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// assets
import instance from 'axiosConfig/axios-config';
import moment from 'moment';
import 'moment/locale/vi';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { GetUser } from 'store/auth/auth-config';
import ReportContext from 'store/report/report-context';

moment.locale('vi');

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light,
  },
  '& .MuiListItem-root': {
    padding: 0,
  },
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //
const NotificationList = ({ handleToggle }) => {
  const reportCtx = useContext(ReportContext);
  const user = GetUser();
  const theme = useTheme();
  const [notificationList, setNotificationList] = useState([]);
  const navigate = useNavigate();

  const chipSX = {
    height: 24,
    padding: '0 6px',
  };
  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.orange.light,
    marginRight: '5px',
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light,
  };

  const chipSuccessSX = {
    ...chipSX,
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    height: 28,
  };

  const fetchDatas = async () => {
    try {
      const response = await instance.get('/notifications');

      if (user.userRole === 'province_officer') {
        const filterData = response.data.data.filter(
          (item) => item.type === 'edit_request'
        );
        setNotificationList(filterData);
      } else {
        const filterData = response.data.data.filter(
          (item) => item.type !== 'edit_request'
        );
        setNotificationList(filterData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleItemClicked = (id) => {
    reportCtx.setReportDetail(id);
    handleToggle();
    navigate('/utils/report/detail');
  };

  const modifierNotificationList = notificationList.toReversed();

  const send = 'Người gửi';
  const location = 'Địa điểm';
  if (modifierNotificationList.length !== 0) {
    console.log('notificationList', modifierNotificationList);
    return (
      <List
        sx={{
          width: '100%',
          maxWidth: 500,
          py: 0,
          borderRadius: '10px',
          [theme.breakpoints.down('md')]: {
            maxWidth: 500,
          },
          '& .MuiListItemSecondaryAction-root': {
            top: 22,
          },
          '& .MuiDivider-root': {
            my: 0,
          },
          '& .list-container': {
            pl: 7,
          },
        }}
      >
        {modifierNotificationList.map((notification, index) => (
          <>
            <ListItemWrapper
              key={notification._id}
              onClick={() => handleItemClicked(notification.content._id)}
            >
              {/* <MainCard> */}
              <Box>
                <Grid container spacing={2} alignItems='center'>
                  <Grid
                    item
                    xs={12}
                    lg={1.5}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <ListItemIcon>
                      <CircleNotifications fontSize='large' color='info' />
                    </ListItemIcon>
                  </Grid>
                  <Grid item xs={12} lg={10.5} container direction='column'>
                    <Grid item>
                      <Typography fontSize={14} fontWeight='bold'>
                        {notification.title}
                      </Typography>
                    </Grid>
                    <Box sx={{ height: '5px' }} />
                    <Grid item>
                      <Typography variant='h5'>
                        {notification.type === 'report' &&
                          notification.content.report_form.label}
                        {notification.type === 'edit_request' &&
                          (notification.content.type === 'board'
                            ? 'Yêu cầu chỉnh sửa bảng quảng cáo'
                            : 'Yêu cầu chỉnh sửa địa điểm')}
                        {notification.type === 'status_edit_request' &&
                          'Trạng thái yêu cầu chỉnh sửa đã được thay đổi'}
                      </Typography>
                    </Grid>
                    <Box sx={{ height: '5px' }} />
                    <Grid item container direction='column'>
                      <Grid item xs={12} lg={12}>
                        <Typography variant='h6' color='GrayText'>
                          {notification.type === 'report' ? send : location}
                          {notification.type === 'report' &&
                            notification.content.username}
                          {notification.type === 'edit_request' &&
                          notification.content.type === 'board'
                            ? notification.content.newInformation.location
                                .display_name
                            : notification.content.newInformation.display_name}
                          {notification.type === 'status_edit_request' &&
                          notification.content.type === 'board'
                            ? notification.content.newInformation.location
                                .display_name
                            : notification.content.newInformation.display_name}
                        </Typography>
                      </Grid>
                      <Box sx={{ height: '5px' }} />
                      <Grid
                        item
                        display='flex'
                        justifyContent='flex-end'
                        alignItems='end'
                        xs={12}
                        lg={12}
                      >
                        <Typography variant='h6' color='GrayText'>
                          {moment.utc(notification.createdAt).fromNow()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              {/* </MainCard> */}
            </ListItemWrapper>
            <Divider />
          </>
        ))}
      </List>
    );
  }
};

export default NotificationList;
