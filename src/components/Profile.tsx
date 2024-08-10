import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu, MenuListboxSlotProps } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem , menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

export default function MenuIntroduction() {
    const navigate = useNavigate()
  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
  const logout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    navigate("/");
  }
BaseMenuButton
  return (
    <Dropdown>
      <BaseMenuButton>    <button className='  w-11 h-11 rounded-full bg-gray-500'>
        <PersonIcon className="  " />
        </button></BaseMenuButton>
      <Menu className="   px-3 py-2 ml-3  flex justify-center items-center  bg-gray-700 rounded-lg shadow-2xl">
        <MenuItem onClick={createHandleMenuClick('Profile')}> <PersonIcon className="mr-4 mb-2 text-[#D6BD98] "/>
        <span className='text-[#D6BD98]'>John Doe</span></MenuItem>
        <MenuItem onClick={createHandleMenuClick('Language settings')}>
        <EmailIcon className="mr-4 mb-2 text-[#D6BD98]" />
        <span className='text-[#D6BD98]'>johndoe@example.com</span>
        </MenuItem>
        <MenuItem onClick={logout} className=" flex justify-center text-red-700">
          <span className='px-2 bg-red-200 rounded-2xl cursor-pointer text-center mb-2 pb-1 '>Log out</span>
        </MenuItem>
              </Menu>
    </Dropdown>
  );
}