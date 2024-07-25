import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import MessageArea from "../components/MessageArea";
import InputField from "../components/InputField";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../config/useAuth";
import ChatName from "../components/ChatName";
import { addSingleMessage, updateChat } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const ChatPage: React.FC = () => {
  const dispatch = useDispatch()
  const auth = useAuth();
  const navigate = useNavigate();
  // const [chats, setChats] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  const [selectedChat,setSlectedChat]=useState('')
  const [socketConnected,setSocketConnected]=useState(false);
  const [chatName,setChatName]= useState('');
  const [users,setUsers]= useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("from auth comtext", token);
      fetchAllChats();
    }
    if (!token) {
      console.log("from auth comtext", token);

      navigate("/login");
    }
  }, []);

  const chats = useSelector((state: RootState) => state.user.chat);
  //const user = useSelector((state: RootState) => state.user.user);
  const storedUser=localStorage.getItem("user")
  const user = JSON.parse(storedUser || '') 
  console.log("user",user);
  
  const fetchAllChats = useCallback(async () => {
    const response = await auth.fetchChats();
    dispatch(updateChat(response));
    console.log("called again");
    
  }, [auth, dispatch]);

   console.log(socketConnected);
   
   //socket = io('http://localhost:3000');
  useEffect(()=>{
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("message received", (newMessageRecieved:any) => {
      console.log("message received",newMessageRecieved);
      
      const data = dispatch(addSingleMessage(newMessageRecieved));
      console.log("dispatched",data);
      
    });
    return () => {
      socket.off("message received");
    };
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));
  },[dispatch, user])
 
  // useEffect(() => {
  //   if(token){
  //   fetchAllChats()}
  //  //auth.fetchAllMessages('kgn')

  // }, []);
  console.log("setChatName",chatName);
  
  console.log("messages", messages);
  return (
    <div className="flex h-screen p-2 w-[100%]">
      <Sidebar />
      <ChatList setUsers={setUsers} users={users} setChatName={setChatName} setSlectedChat={setSlectedChat} setMessages={setMessages} chats={chats} />

      
      {chatName != '' ? <div className=" w-[100%]  flex flex-col max-h-[100vh] pl-2 ">
        <div className=" rounded-md">
         
          <ChatName chatName={chatName}  />
        </div>
       <div className="p-1">
          <MessageArea messages={messages} />
        </div> 
        <div className=" ">
          <InputField socket={socket} selectedChat={selectedChat}  />
        </div>
      </div> : <div className="w-[100%] bg-white rounded-2xl h-[100%] justify-center items-center text-center" >  <div className=" absolute text-4xl top-[45%] left-[45%] ">No chat Seleted </div></div> }
    </div>
  );
};

export default ChatPage;
