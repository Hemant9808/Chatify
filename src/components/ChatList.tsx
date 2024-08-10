import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../config/useAuth";
import { updateAllMessages } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { io } from "socket.io-client";
import debounce from 'lodash/debounce';
import { map } from "lodash";
interface Chat {
  _id: string;
  chatName: string;
  latestMessage: any;
  updatedAt: string;
  users:[]
}

interface ChatListProps {
  chats: Chat[];
  setMessages: any;
  setSlectedChat: any;
  setChatName:any
  setUsers:any
  users:[]
}

const ChatList: React.FC<ChatListProps> = ({setUsers,users,setChatName,chats,setMessages,setSlectedChat}) => {
  const [query,setQuery]= useState('');
  const auth = useAuth();
  const dispatch = useDispatch();
  console.log("chats sdasa",chats);
  
  const storedUser=localStorage.getItem("user")
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  
  //const currentUser = JSON.parse(storedUser || '') 
  //const chats = useSelector((state: RootState) => state.user.chat);
  const allMessages = useSelector((state: RootState) => state.user.messages);

 const getChatName=async(chatId:string)=>{
     const response =await  auth.chatDetails(chatId)
     console.log("chatDetails",response);
     response.map((user:any)=>{
         if(user._id!=currentUser._id){
          setChatName(user.name);
         }
     })
     
 }
  const selectChat = async (chatId: string) => {
    console.log("chatId",chatId);
    
    setSlectedChat(chatId);
    try {
      getChatName(chatId);
      const response = await auth.fetchAllMessages(chatId);
      console.log("chatId after",chatId);
      
      dispatch(updateAllMessages(response)); // Dispatching to update Redux store
      setMessages(allMessages); // Setting local state with messages from Redux
    } catch (error) {
      console.error("Error selecting chat:", error);
      // Handle error here, e.g., show an error message or log to analytics
    }
  };
  //const socket = io('http://localhost:3000');
  useEffect(()=>{
    setMessages(allMessages);
    auth.chatDetails('668d304f1deaea4f02b4936a');
    
  },[allMessages])

const userSearch =async(query:string)=>{
    const response= await auth.userSearch(query)
    setUsers(response)
    console.log("form chatlist",response);
    
    
}
console.log("users",users);

const debouncedUserSearch = useCallback(debounce(userSearch, 300), []);
const handleSearch = (event:any) => {
  const value = event.target.value;
  setQuery(value);
  if (value) {
    debouncedUserSearch(value);
  } else {
    //setUsers([]);
  }
};
const accessChat =async(userId:string)=>{
  console.log("userId",userId);
  
 const response=await auth.accessChat(userId);
 console.log("access form chatlist ",response);
 if(response._id){
  console.log("response._id",response._id);
  
  const resp = await selectChat(response._id)
}else{
  console.log("chat id not found");
  
}
 
}
const [sortedChats,setSortedChats]= useState<any>();
const sortChat = ()=>{
  if(chats.length>1){
    const Chats=chats.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    setSortedChats(Chats);
  }
  else{
    console.log("not sorted");
    
  }
}

//const Chats=chats.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return (
    <div className="w-[30%] min-w-[15rem] rounded-2xl ml-2 bg-gray-800 text-white overflow-y-auto">
     <>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={query}
          onChange={(e)=>{ handleSearch(e);}}
        />
      </div>
      { query=='' ?   <div className="space-y-4">
        {chats.length > 0 &&
          chats.map((chat, index) => (
            <div
              key={index}
              onClick={() => selectChat(chat._id)}
              className="flex w-[100%] items-center p-4 hover:bg-gray-700"
            >
              <img
                className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-xl"
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt=""
              />
              <div className="ml-4   w-[100%]">
                <div className="  flex  justify-between">
                  { chat.users.map((user:any)=>(

                    <>
                      {user._id!=currentUser._id &&<div className="">
                        { user.name}
                      </div>}
                    </>
                   

                  )) }
                  <div className=" text-sm text-gray-400">
                    {moment(chat.updatedAt).format("h:mm A")}
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {chat.latestMessage?.content.slice(0, 20)}...
                </div>
              </div>
            </div>
          ))}
      </div>:
      <div>
        {
          users.map((user:any,index)=>(
            <div onClick={()=>accessChat(user._id)}
              key={index}
              
              className="flex w-[100%] items-center p-4 hover:bg-gray-700"
            >
              <img
                className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xl"
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt=""
              />
              <div className="ml-4  w-[100%]">
                <div className=" flex self-stretch justify-between">
                  <div className="font-semibold">{user.name}</div>
                
                </div>
                <div className="text-sm text-gray-400">
                  {user.email?.slice(0, 20)}...
                </div>
              </div>
            </div>
          ))
        }
      </div>
       }
      </>
    </div>
  );
};

export default ChatList;
