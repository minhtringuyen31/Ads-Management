import { useContext, useEffect, useRef, useState } from 'react';

// material-ui
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonBase,
  CardActions,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

// assets
import { MarkEmailRead } from '@mui/icons-material';
import { IconBell } from '@tabler/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { SocketContext } from 'socket/SocketProvider';
import { GetUser } from 'store/auth/auth-config';
import NotificationList from './NotificationList';

// notification status options
const status = [
  {
    value: 'all',
    label: 'All Notification',
  },
  {
    value: 'new',
    label: 'New',
  },
  {
    value: 'unread',
    label: 'Unread',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const socket = useContext(SocketContext);
  const user = GetUser();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [notifications, setNotifications] = useState([]);
  const [notificationList, setNotificationList] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (user.userRole === 'province_officer') {
      console.log(socket);
      socket.on('new_edit_request', (data) => {
        console.log(data);
        setNotifications((prev) => [...prev, data]);
      });
    } else {
      console.log(socket);
      socket.on('new_notification', (data) => {
        console.log(data);
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socket, user.userRole]);

  const handleChange = (event) => {
    if (event?.target.value) setValue(event?.target.value);
  };

  const handleReadAll = () => {
    setNotifications([]);
  };

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2,
          },
        }}
      >
        <Badge
          badgeContent={notifications.length}
          overlap='circular'
          color='secondary'
        >
          <ButtonBase sx={{ borderRadius: '12px' }}>
            <Avatar
              variant='rounded'
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: 'all .2s ease-in-out',
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                '&[aria-controls="menu-list-grow"],&:hover': {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                },
              }}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup='true'
              onClick={handleToggle}
              color='inherit'
            >
              <IconBell stroke={1.5} size='1.3rem' />
            </Avatar>
          </ButtonBase>
        </Badge>
      </Box>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 5 : 0, 20],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            position={matchesXs ? 'top' : 'top-right'}
            in={open}
            {...TransitionProps}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Grid container direction='column' spacing={2}>
                    <Grid item xs={12}>
                      <Grid
                        container
                        alignItems='center'
                        justifyContent='space-between'
                        sx={{ pt: 2, px: 2 }}
                      >
                        <Grid item>
                          <Stack direction='row' spacing={2}>
                            <Typography variant='subtitle1'>
                              Thông báo
                            </Typography>
                            {/* <Chip
                              size="small"
                              label="01"
                              sx={{
                                color: theme.palette.background.default,
                                bgcolor: theme.palette.warning.dark,
                              }}
                            /> */}
                          </Stack>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={handleReadAll}>
                            <MarkEmailRead />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <PerfectScrollbar
                        style={{
                          height: '100%',
                          maxHeight: 'calc(100vh - 300px)',
                          overflowX: 'hidden',
                        }}
                      >
                        <Grid container direction='column' spacing={2}>
                          {/* <Grid item xs={12}>
                            <Box sx={{ px: 2, pt: 0.25 }}>
                              <TextField
                                id='outlined-select-currency-native'
                                select
                                fullWidth
                                value={value}
                                onChange={handleChange}
                                SelectProps={{
                                  native: true,
                                }}
                              >
                                {status.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            </Box>
                          </Grid> */}
                          <Grid item xs={12} p={0}>
                            <Divider sx={{ my: 0 }} />
                          </Grid>
                        </Grid>
                        <NotificationList handleToggle={handleToggle} />
                      </PerfectScrollbar>
                    </Grid>
                  </Grid>
                  <Divider />
                  <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                    <Button size='small' disableElevation>
                      View All
                    </Button>
                  </CardActions>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
