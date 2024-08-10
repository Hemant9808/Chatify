import React, { useState } from 'react'
// import { IoMdArrowBack } from 'react-icons/io'

import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import IconButton from '@mui/material/IconButton'
import { Icon, InputAdornment } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
// import {  useRouter } from 'next/router
import Loader from '../loader/Loader'

interface ConfirmPasswordProps {
  email: string | string[] | undefined
  handleSubmit: (data:any) => void
  setCurrentComponent?: any
 
}

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({ email, handleSubmit, setCurrentComponent=false }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setfromData] = useState({
    name:'',
    email:'',
    password: '',
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  //const router = useRouter()

  const signup = (e: any) => {
    e.preventDefault();
    if(!formData?.password){
     return setErrorMessage('All sections must be filled out.')
    }
    if (message == 'Weak') {
      setErrorMessage('Choose strong passowrd')
      return
    }

    
    handleSubmit(formData)
  }

  const handlePassword = (passwordValue: string) => {
    setErrorMessage('');
    const strengthChecks: any = {
      length: 0,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false
    }

    strengthChecks.length = passwordValue.length >= 8 ? true : false
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue)
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue)
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue)
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue)

    let verifiedList = Object.values(strengthChecks).filter(value => value)

    let strength = verifiedList.length == 5 ? 'Strong' : verifiedList.length >= 2 ? 'Medium' : 'Weak'

    // setProgress(${(verifiedList.length / 5) * 100}%);
    setMessage(strength)
  }

  const [message, setMessage] = useState('')

  const handleChange = (e: any) => {
    console.log('event', e)

    const { name, value } = e.target
    setfromData(prevDetails => ({
      ...prevDetails,
      [name]: value
    }))
    console.log(formData)
  }

  const handleClick = () => {
    console.log("calling",setCurrentComponent)
    if (setCurrentComponent) {
      setCurrentComponent('EmailInput');
    } else {
      //router.back();
    }
  };

  return (
    <>
    {/* {!loading ? */}
    <div className='absolute z-[50] lg:w-[30%] md:min-w-[400px] md:w-[50%] sm:w-[55%] w-[85%]  bg-white rounded-[20px] shadow  flex-col justify-center items-center inline-flex'>
      <div className='self-stretch  px-3 pt-6 pb-1 flex-col justify-start items-center gap-2 inline-flex'>
        <div className='self-stretch  flex-col justify-start items-center gap-8 flex'>
          <div className='self-stretch  pt-3 flex-col justify-center items-center gap-8 flex'>
            <div className='self-stretch w-[100%] justify-center items-center gap-2 inline-flex'>
              <div className='absolute h-[26px] flex items-center px-4  left-0 '>
                <img
                  src='/src/assets/arrow-left.png'
                  onClick={handleClick}
                  className='w-[24px] cursor-pointer  left-0 text-black sm:h-[23px] h-[20px] '
                />
              </div>
              <div className="text-center text-stone-950 sm:text-[28px] text-[23px] font-semibold font-['Roboto'] leading-[33.60px]">
                Create Password
              </div>
            </div>
            <div className='self-stretch  px-2 flex-col justify-between items-center flex'>
              <div className='self-stretch h-1.52 px-2 flex-col justify-center items-center gap-2 flex'>
                <div className="text-zinc-500  md:text-[17px] text-[12.5px]  font-normal font-['Roboto']">
                  To secure your account, create a password for
                </div>
                <div className="text-stone-950  md:text-[17px] text-[13px]  font-semibold font-['Roboto']">{email}</div>
              </div>
              <div className='self-stretch mt-5  flex-col justify-center items-center gap-6 flex'>
                <form className='self-stretch flex-col justify-center items-center gap-2 flex'>
                <div className='self-stretch w-[100%]    bg-black/opacity-0 rounded-[60px] border border-black/opacity-10 justify-start items-center inline-flex'>
                    <input
                      
                      name='name'
                      value={formData.name}
                      onChange={e => {
                        handleChange(e)
                        handlePassword(e.target.value)
                      }}
                      placeholder='Enter name'
                      className="grow shrink w-[100%] px-5 py-3 basis-0 rounded-[60px] border-0 focus:outline-none text-stone-950 md:text-lg text-md font-normal font-['Roboto'] leading-snug"
                    ></input>
                    
                    

                    {/* <div className="w-[18px] h-[18px] justify-center items-center flex">
                    <div className="w-[18px] h-[18px] relative">
                    </div>
                  </div> */}
                  </div>

                  <div className='self-stretch w-[100%]    bg-black/opacity-0 rounded-[60px] border border-black/opacity-10 justify-start items-center inline-flex'>

                  <input
                      
                      name='email'
                      value={formData.email}
                      onChange={e => {
                        handleChange(e)
                        handlePassword(e.target.value)
                      }}
                      placeholder='Enter email'
                      className="grow shrink w-[100%] px-5 py-3 basis-0 rounded-[60px] border-0 focus:outline-none text-stone-950 md:text-lg text-md font-normal font-['Roboto'] leading-snug"
                    ></input>
                    </div>
                  <div className='self-stretch w-[100%]   bg-black/opacity-0 rounded-[60px] border border-black/opacity-10 justify-start items-center inline-flex'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={formData.password}
                      onChange={e => {
                        handleChange(e)
                        handlePassword(e.target.value)
                      }}
                      placeholder='Enter password'
                      className="grow shrink w-[100%] px-5 py-3 basis-0 rounded-[60px] border-0 focus:outline-none text-stone-950 md:text-lg text-md font-normal font-['Roboto'] leading-snug"
                    ></input>
                    <div className='cursor-pointer ' onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityIcon className='text-gray-700 w-[90px] mr-5' />
                      ) : (
                        <VisibilityOffIcon className='text-gray-700 w-[90px] mr-5' />
                      )}{' '}
                    </div>

                    {/* <div className="w-[18px] h-[18px] justify-center items-center flex">
                    <div className="w-[18px] h-[18px] relative">
                    </div>
                  </div> */}
                  </div>
                  <div className='w-[100%] h-4'>
                    {formData.password.length !== 0 ? (
                      <div className='w-[100%] flex justify-between px-4 py-[1.6%] text-[20px]  self-stretch pr-[12%]   items-center  -mt-2'>
                        <div
                          className={
                            message === 'Weak'
                              ? 'w-[23%] h-1.5 bg-red-500 rounded-3xl text-[14px]'
                              : message === 'Medium'
                              ? 'w-[23%] h-1.5 bg-yellow-500 rounded-3xl'
                              : message === 'Strong'
                              ? 'w-[23%] h-1.5 bg-lime-600 rounded-3xl'
                              : ''
                          }
                        ></div>
                        <div
                          className={
                            message === 'Weak'
                              ? 'w-[23%] h-1.5 bg-zinc-500 rounded-3xl text-[14px]'
                              : message === 'Medium'
                              ? 'w-[23%] h-1.5 bg-yellow-500 rounded-3xl'
                              : message === 'Strong'
                              ? 'w-[23%] h-1.5 bg-lime-600 rounded-3xl'
                              : ''
                          }
                        ></div>
                        <div
                          className={
                            message === 'Weak'
                              ? 'w-[23%] h-1.5 bg-zinc-500 rounded-3xl text-[14px]'
                              : message === 'Medium'
                              ? 'w-[23%] h-1.5 bg-zinc-500 rounded-3xl'
                              : message === 'Strong'
                              ? 'w-[23%] h-1.5 bg-lime-600 rounded-3xl'
                              : ''
                          }
                        ></div>
                        <span
                          className={
                            message === 'Medium'
                              ? 'text-yellow-500 font-semibold text-[14px]'
                              : message === 'Strong'
                              ? 'text-lime-600 font-semibold text-[14px]'
                              : message === 'Weak'
                              ? 'text-red-500 font-semibold text-[14px]'
                              : ''
                          }
                        >
                          {message}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  

                  <div className='self-stretch px-2 py-1 justify-start items-center gap-2 inline-flex'>
                    <div className='w-6 h-6 relative'>
                      {errorMessage && <img src='/images/logos/error.png' className='w-6 h-6 left-0 top-0 absolute' />}
                    </div>
                    <div className='grow shrink basis-0 h-[17px] justify-start items-center flex'>
                      <div className="text-center text-red-500 md:text-sm text-xs font-semibold font-['Roboto'] leading-[16.80px]">
                        {errorMessage}
                      </div>
                    </div>
                  </div>
                  <div className='self-stretch w-[100%] mb-4  bg-stone-950 hover:bg-[#202020] rounded-[60px] justify-center items-center inline-flex'>
                    <div className='justify-center w-[100%] items-center flex'>
                      <button
                        className="text-center cursor-pointer  w-[100%]  px-5 py-3 text-neutral-50 md:text-lg text-md font-bold font-['Roboto'] leading-snug"
                        onClick={signup}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
               
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    {/* :<Loader/> } */}
    </>
  )
}
export default ConfirmPassword
