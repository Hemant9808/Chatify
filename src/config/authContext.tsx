import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";

// ** Config

// **axios
import { createAxiosInstance } from "./axios";
import toast from "react-hot-toast";
import { Params } from "react-router-dom";
export interface AuthContextProps {
  checkEmail: (email: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  signup: (name:string,email: string, password: string) => Promise<any>;
  isLoggedIn: () => boolean
  fetchChats: () => Promise<any>;
  fetchAllMessages: (chatId:string) => Promise<any>
  sendMessage:(selectedChat:string,message:string)=> Promise<any>
  chatDetails: (chatId:string) => Promise<any>
  userSearch:(Params:string) => Promise<any>
  accessChat:(userId:string) => Promise<any>
}

const defaultProvider: AuthContextProps = {
  checkEmail: async () => {},
  login: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  isLoggedIn: () => false,
  fetchChats: () => Promise.resolve(),
  fetchAllMessages: () => Promise.resolve(),
  sendMessage: () => Promise.resolve(),
  chatDetails:() => Promise.resolve(),
  userSearch:() => Promise.resolve(),
  accessChat:() => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};
const AuthProvider = ({ children }: Props) => {
  const axiosInstance = createAxiosInstance();

  useEffect(()=>{
    isLoggedIn();
   
  })

  const isLoggedIn = ()=>{
    const token = localStorage.getItem("token");
    if (token) {
      
      console.log("from auth comtext",true);
      return true;
    }
    else{
      console.log("from auth comtext",false);
      return false;
    }
  }
  

  const checkEmail = async (email: string) => {
    try {
      const apiUrl = `auth/admin/email-exists/${email}/`;
      // Making the POST request using Axios
      const response = await axiosInstance.get(apiUrl);
      console.log("Response Data: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error making getTransactionList request:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log("entered in auth context");

      const apiURL = "login";
      const response = await axiosInstance.post(apiURL, { email, password });
      console.log("login request", response);
      localStorage.setItem("token",response?.data?.token );
      const token = localStorage.getItem("token");
      localStorage.setItem("user", JSON.stringify(response?.data?.foundUser[0]));
      return response;
    } catch (error) {
      console.log("Error on login", error);
      throw error;
    }
  };

  const signup = async (name:string,email: string, password: string) => {
    try {
      console.log("entered in auth context");
      const apiURL = "register";
      const response = await axiosInstance.post(apiURL, { name,email,password });
      console.log("signup request", response);
      localStorage.setItem("token",response?.data?.token );
      localStorage.setItem("user",JSON.stringify(response?.data));
      console.log("from authcontext" , JSON.stringify(response?.data));
      
      // const token = localStorage.getItem("token");
      // if (token) {
      //   setIsLoggedIn(true);
      // }
      // if (response.data.token) {
      //   localStorage.setItem("token", response.data.token);
      // }

      return response;
    } catch (error) {
      console.log("Error on login", error);
      throw error;
    }
  };
  const fetchChats = async()=>{
    try {
      console.log("entered in auth context");

      const apiURL = "chat/fetchAllChat";
      // const userId = '668d0e38f38a8a788bbc4849'
      const response = await axiosInstance.post(apiURL);
      
      
      console.log("fetch chatts request", response.data);


      return response.data;
    } catch (error) {
      console.log("Error on login", error);
      throw error;
    }
  }


  const fetchAllMessages = async(chatId:string)=>{
    try {
      console.log("entered in auth context");
      const apiURL = "fetchMessages";
      //const chatId = chatId
      // const userId = '668d0e38f38a8a788bbc4849'
      const response = await axiosInstance.post(apiURL,{chatId});  
      console.log("fetch message request", response.data);
      return response.data;
    } catch (error) {
      console.log("Error on login", error);
      throw error;
    }
  }
  const sendMessage=async(selectedChat:string,message:string)=>{       
    try {
      const apiURL = 'sendMessage'
      const response =await axiosInstance.post(apiURL,{chatId:selectedChat,content:message})
      console.log("senr message UTH CONTEXT",response.data);  
      return response.data;
    } catch (error) {
      console.log("error in send message", error);
      
    }
  }

  const chatDetails=async(chatId:string)=>{     
    try {
      const apiURL = 'chat/chatDetails'
      const response =await axiosInstance.post(apiURL,{chatId:chatId})
     // console.log("chatDetails",response.data);  
      return response.data.users;
    } catch (error) {
      console.log("error in chatDetails ", error);
      
    }
  }
 const userSearch=async(query:string)=>{
  try {
    console.log("query form auth context", query);
    
    const apiURL = `userSearch?email=${query}`
    const response =await axiosInstance.get(apiURL)
   // console.log("chatDetails",response.data); 
      console.log("userSearch", response);
      
    return response.data;
  } catch (error) {
    console.log("error in chatDetails ", error);
    
  }
 }

 const accessChat=async(userId:string)=>{
  try {
   // console.log("query form auth context", query);
    
    const apiURL = `chat/accessChat`
    const response =await axiosInstance.post(apiURL,{userId:userId})
   // console.log("chatDetails",response.data); 
      console.log("access chat", response);
      
    return response.data;
  } catch (error) {
    console.log("error in chatDetails ", error);
    
  }
 }

  const values = {
    checkEmail,
    login,
    isLoggedIn,
    signup,
    fetchChats,
    fetchAllMessages,
    sendMessage,
    chatDetails,
    userSearch,
    accessChat
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
