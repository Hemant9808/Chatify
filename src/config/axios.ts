// import axios,{ AxiosInstance } from "axios";
// import { useEffect } from "react";

// export const createAxiosInstance=():AxiosInstance => {
//    const baseURL = 'http://localhost:3000/';
//    var token = window.localStorage.getItem('token')
//    useEffect(()=>{
//       token = window.localStorage.getItem('token')
//       console.log("from axios useE token:",token);
//    },[])
   
//    console.log("from axios token:",token);
   
//    const axiosInstance:AxiosInstance=axios.create({
//     baseURL:`${baseURL}`,
//     headers: {
//         'Content-Type': 'application/json',
//         'authorization':`Bearer ${token}`
         
//       }
//    })

//    return axiosInstance
// }


import axios, { AxiosInstance } from "axios";
export const createAxiosInstance = (): AxiosInstance => {
  const baseURL = ' https://chatify-backend-4.onrender.com/';
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${baseURL}`,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
