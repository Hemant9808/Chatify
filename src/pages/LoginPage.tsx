import React, { ReactNode, useEffect, useState } from 'react'

import ConfirmPassword from '../components/auth/ConfirmPassword'
import EmailInput from '../components/auth/EmailInput'
import PasswordInput from '../components/auth/PasswordInput'
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper'
import axios from 'axios'
import toast from 'react-hot-toast'
// import { useRouter } from 'next/router'
import Loader from '../components/loader/Loader'
import SvgComponent from '../components/auth/SvgComponent'
import { useAuth } from '../config/useAuth'
import { createBrowserHistory } from 'history';

const LoginPage = () => {
  const navigate = useNavigate();

  const history = createBrowserHistory();
  const auth = useAuth()
  const [currentComponent, setCurrentComponent] = useState('EmailInput') // State to manage which component to display
  const [email, setEmail] = useState('')
  const [member, setMember] = useState(false)
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState(true)
  const [loading, setLoading] = useState(false)
  // const router = useRouter()
  // const { email: emailParam, isMember=false } = router.query

  // useEffect(() => {
  //   if (emailParam && isMember) {
  //     const emailStr = Array.isArray(emailParam) ? emailParam[0] : emailParam
  //     setEmail(emailStr)
  //     setMember(true)
  //     setCurrentComponent('ConfirmPassword')
  //   }
  // }, [emailParam, isMember])

  useEffect(() => {
   
    
    const token = localStorage.getItem("token");

    if (token) {
      console.log("token", token);
     
      navigate("/chat");
    }
   
  }, []);

  const handleEmailSubmit = async (email: string) => {
    setLoading(true)
    const isValidEmail = validateEmail(email)
    setValid(validateEmail(email))
    console.log("email",email);
    
    if (!isValidEmail) {
      setLoading(false);
      return
    }

    setEmail(email)
    setCurrentComponent('PasswordInput')

    // try {
    //   const response = await auth.checkEmail(email)
    //   console.log(response)

    //   console.log('handleEmailSubmit run', email)
    //   setMember(response.data?.isMember);
    //   if (response.data?.exists && response.data?.isVerified) {
    //     setCurrentComponent('PasswordInput')
    //   } else {
    //     setCurrentComponent('ConfirmPassword')
    //   }
    // } catch (error) {
    //   console.error('Error sending message: ', error)
    // }
    setLoading(false);
  }

  // +

  const handleSignIn = async () => { 
    setLoading(true);
    try {
      const resp = await auth.login(email, password)
      if (resp?.data.success) {
        toast.success(resp?.data.message)
        // history.push('/chat');
        navigate('/chat');
       
      }else{
        toast.error(resp?.data.message)
      }
      console.log('resppp', resp)
    } catch (err: any) {
      console.log('errrr', err)
      toast.error(err?.response?.data?.error || err?.response?.data?.message)
    }
    setLoading(false);
  }
  
        

  const handleSignUp = async (data:any) => {
    try {
      setLoading(true);
      const res = await auth.signup(data.name, data.email, data.password)
      console.log('res', res)
      if (res?.data.success) {
        toast.success(res?.data.message)
        //router.push(`/verification?email=${email}&isMember=${member}`)
        setLoading(false);
        console.log("isLoggedIn login page", isLoggedIn);
        navigate('/chat');
      }
      setLoading(false);
    } catch (err: any) {
      console.log('errrr', err)
      toast.error(err?.response?.data?.error || err?.response?.data?.message)
    }
  }
const socialLoginClicked=()=>{
  
}
const { isLoggedIn } = useAuth();
console.log("isLoggedIn login page", isLoggedIn);

// useEffect(()=>{
//   window.localStorage.
// })


  const renderComponent = () => {
    switch (currentComponent) {
      case 'EmailInput':
        return <EmailInput setCurrentComponent={setCurrentComponent} loading={loading} setValid={setValid} socialLoginClicked={socialLoginClicked} valid={valid} onsubmit={handleEmailSubmit} />
      case 'PasswordInput':
        return <PasswordInput loading={loading} setCurrentComponent={setCurrentComponent} member={member} password={password} setPassword={setPassword} email={email} handleSignIn={handleSignIn} />
      case 'ConfirmPassword':
        return(!loading ? <ConfirmPassword   setCurrentComponent={setCurrentComponent} email={email} handleSubmit={handleSignUp} />:<Loader/>)
      default:
        return null
    }
  }

  return (
    <div>
      {/* <div className='relative w-[100%] overflow-hidden h-screen bg-gradient-to-r from-teal-100 via-blue-100 to-indigo-100 flex items-center justify-center'>  */}
      <div className='relative w-[100%] overflow-hidden h-screen bg-gradient-to-r from-teal-100 via-blue-100 to-indigo-200 flex items-center justify-center'>

      {/* <div className='relative w-[100%] overflow-hidden h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center'> */}
        <div className='absolute  w-[100%] overflow-hidden  h-screen  flex justify-between items-center'>
          <div className=' absolute w-[100%]  h-screen flex justify-between items-center '>
            {/* <div className="absolute w-[40%] h-screen  bg-indigo-500 rounded-full blur-[400px]" /> */}
            {/* <div className='absolute z-[10] w-[50%] h-[80%]  bg-indigo-500 rounded-[20%] md:left-[-600px] left-[-270px]  blur-[110px] ' />
            <div className='absolute w-[50%] h-[70%]  bg-indigo-500 rounded-[20%] md:right-[-600px] right-[-270px] blur-[110px] ' /> */}
          </div>
          <div className=' absolute'></div>
        </div>
        {/* component */}
        <div className=' absolute w-[100%] h-screen flex justify-center items-center '>{renderComponent()}</div>

        <div className='  w-[23%] z-[20] h-[100%] absolute rotate-180 left-0 '>
          <SvgComponent />
        </div>
        <div className=' w-[23%]  z-[20] h-[100%]  absolute  right-0 '>
          <SvgComponent />
        </div>
      </div>
    </div>

    // enter Password
  )
}


export default LoginPage
