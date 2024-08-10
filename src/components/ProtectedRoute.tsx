import React, { useEffect, useState } from 'react';
import {  Outlet } from 'react-router-dom';
import { useAuth } from '../config/useAuth';


const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();
  
  // console.log(isLoggedIn);
  const [LoggedIn,setLoggedIn]=useState(false);
  useEffect(() => {
    (async () => {
      try {
        const isLoggedInResult = await isLoggedIn;
        setLoggedIn(isLoggedInResult);
        console.log("protected route", isLoggedInResult);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    })();
  }, []);
  // setLoggedIn(isLoggedIn);
   
       

  
  return LoggedIn ? <Outlet /> :
  //  <Navigate to="/login" />
  ''
};

export default ProtectedRoute;