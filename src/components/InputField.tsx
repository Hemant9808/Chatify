import React, { useState } from 'react';
import { useAuth } from '../config/useAuth';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { addSingleMessage, updateAllMessages } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
interface inputFieldProps {
 
  selectedChat:string,
  socket:any
}
const InputField: React.FC<inputFieldProps> = ({selectedChat,socket}) => {
  const auth = useAuth()
  const dispatch = useDispatch();
  const [message,setMessage]=useState('');
  const sendMessage=async()=>{
    if(message!=''){
      
      const response = await auth.sendMessage(selectedChat,message);
      console.log("sent message", response);
      socket.emit("new message", response)
      
      const data = dispatch(addSingleMessage(response));
      console.log(" after dispatch",data);
    }
    setMessage('');
  }
  const handleKeyDown = (event:any) => {
    if (event.key === "Enter") {
      sendMessage(); // Call your function here
    }
  };
  return (
    <div className="flex rounded-2xl  w-[100%]  items-center p-1.5 bg-white shadow">
      <input
        type="text"
        placeholder="Write messages..."
        className="flex-1 p-2 text-md text-gray-600 font-semibold rounded-md focus:outline-none"
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
       <IconButton 
        onClick={sendMessage} 
        className="ml-4 p-2  "
        sx={{ color: 'white',
          backgroundColor:'#FF4A09',
          borderRadius:'12px',
          width:'40px',
          '&:hover': {
      backgroundColor: '#E54307', // Darker shade for hover effect
    }

        }}
      >
        <SendIcon 
        sx={{ 
          width:'20px',

        }} />
      </IconButton>
    </div>
  );
};

export default InputField;
