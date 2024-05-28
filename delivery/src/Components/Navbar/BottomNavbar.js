import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import GridViewIcon from '@mui/icons-material/GridView';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

export default function BottomNavbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="DashBoard" icon={<GridViewIcon />} component={Link} to="/" />
        <BottomNavigationAction label="Deliveries" icon={<DeliveryDiningIcon />} component={Link} to="/deliveries" />
        <BottomNavigationAction label="My earnings" icon={<AttachMoneyIcon />} component={Link} to="/my-earnings" />
      </BottomNavigation>
    </Box>
  );
}