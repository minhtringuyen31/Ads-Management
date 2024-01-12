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
import ReportContext from 'store/report/report-context';
import MainCard from 'ui-component/cards/MainCard';

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
const NotificationList = () => {
  const reportCtx = useContext(ReportContext);
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
      setNotificationList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleItemClicked = (id) => {
    reportCtx.setReportDetail(id);
    navigate('/utils/report/detail');
  };

  const modifierNotificationList = notificationList.toReversed();

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 700,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 700,
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
            <MainCard>
              <Grid container spacing={2} alignItems='center'>
                <Grid
                  item
                  xs={12}
                  lg={2}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  <ListItemIcon>
                    <CircleNotifications fontSize='large' color='info' />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={12} lg={10} container direction='column'>
                  <Grid item>
                    <Typography variant='h3'>{notification.title}</Typography>
                  </Grid>
                  <Box sx={{ height: '10px' }} />
                  <Grid item>
                    <Typography variant='h5'>
                      {notification.content.report_form.label}
                    </Typography>
                  </Grid>
                  <Box sx={{ height: '10px' }} />
                  <Grid item container direction='row'>
                    <Grid item xs={12} lg={6}>
                      <Typography variant='h6' color='GrayText'>
                        Người gửi: {notification.content.username}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      display='flex'
                      justifyContent='flex-end'
                      alignItems='end'
                      xs={12}
                      lg={6}
                    >
                      <Typography variant='h6' color='GrayText'>
                        {moment.utc(notification.createdAt).fromNow()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </ListItemWrapper>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default NotificationList;
