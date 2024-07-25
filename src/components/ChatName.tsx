import React, { useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ChatNameProps {
 chatName:string
}
  const ChatName: React.FC<ChatNameProps>=({chatName})=>{
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className=" rounded-2xl  w-[100%] top-0  flex items-center p-4 bg-white shadow">
       <img className='w-12 rounded-full' src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt="" />
        <div className="ml-4">
          <div className="font-semibold">{chatName}</div>
          <div className="text-sm text-gray-600">Online</div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
        <Paper 
      component="form" 
      sx={{ display: 'flex', alignItems: 'center',justifyContent:'center', width: isExpanded ? 300 : 42,borderRadius: isExpanded ? '5rem' : '7rem', transition: 'width 0.3s' }}
    >
      <IconButton onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
      {isExpanded && (
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          sx={{ ml: 1, flex: 1 }}
        />
      )}
    </Paper>
          {/* <button className="p-2 rounded-full bg-gray-200">
            <img src="/path-to-icon/call.svg" alt="Call" className="w-6 h-6" />
          </button> */}
        </div>
      </div>
  )
}
export default ChatName;