import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import MenuIntroduction from './Profile';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Sidebar: React.FC = () => {
  return (
    <div className="w-[6%] min-w-[4rem] bg-gray-900 rounded-2xl text-white flex flex-col items-center justify-start py-4 space-y-3">
    {/* <button className='  w-11 h-11 rounded-full bg-gray-500'>
        <PersonIcon className="  " />
        </button> */}
        <MenuIntroduction></MenuIntroduction>
        <IconButton  color="inherit" aria-label="menu">
      <MenuIcon className='w-9' />
    </IconButton>
    <IconButton  color="inherit" aria-label="notifications">
      <NotificationsIcon  /> {/* Increase size to 40px */}
    </IconButton>
    </div>
  );
};

export default Sidebar;
