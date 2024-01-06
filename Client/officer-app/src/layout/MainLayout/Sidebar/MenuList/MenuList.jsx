// material-ui
import { Typography } from '@mui/material';

// project imports
import menuItem from 'menu-items';
import { GetUser } from 'store/auth/auth-config';
import NavGroup from './NavGroup/NavGroup';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const role = GetUser().userRole;
  let items = [];

  switch (role) {
    case 'province_officer':
      items = menuItem.province_officer;
      break;
    case 'ward_officer':
      items = menuItem.ward_officer;
      break;
    case 'district_officer':
      items = menuItem.district_officer;
      break;
    default:
      return;
  }

  const navItems = items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant='h6' color='error' align='center'>
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
