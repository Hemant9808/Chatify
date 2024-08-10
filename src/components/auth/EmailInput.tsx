import React, { useEffect, useRef, useState } from 'react'
import Loader from '../loader/Loader'

interface EmailInputProps {
  onsubmit: (email: string) => void | Promise<void>
  valid: boolean
  socialLoginClicked: any
  setValid: any
  loading: boolean
  setCurrentComponent:any
}
const EmailInput: React.FC<EmailInputProps> = ({ setCurrentComponent, onsubmit, setValid, valid, socialLoginClicked, loading }) => {
  const handleSubmit = (event: any) => {
    event.preventDefault()

    onsubmit(email)
  }
  const [email, setEmail] = useState('')

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-center '>
      {!loading ? (
        <div className='absolute z-[50] rounded-[15px] lg:w-[30%] md:w-[45%] sm:w-[50%] w-[80%] shadow-lg bg-white px-4 pt-6 pb-1 flex-col justify-end items-center gap-2 inline-flex'>
          <div className='self-stretch  flex-col justify-center items-center gap-8 flex'>
            <div className='self-stretch  pt-3 flex-col justify-center items-center gap-14 flex'>
              <div className="text-center text-stone-950 lg:text-[28px] text-[24px] font-semibold font-['Roboto'] leading-[33.60px]">
                Log in or Sign up
              </div>
              <div className='self-stretch  px-2 flex-col justify-center items-center gap-8 flex'>
                <form
                  onSubmit={handleSubmit}
                  className='self-stretch h-28 flex-col justify-center items-center gap-2 flex'
                >
                  <div className=' w-[100%] self-stretch   rounded-[60px] border border-black  justify-start items-center inline-flex'>
                    <div autoFocus className='w-[100%] justify-start items-center flex border-black '>
                      <input
                        value={email}
                        ref={inputRef}
                        // required={true}
                        onChange={e => {
                          setEmail(e.target.value)
                          console.log(email)
                          setValid(true)
                        }}
                        placeholder='thekaypo@gmail.com'
                        autoFocus
                        className="text-stone-950 px-5 py-3 w-[100%] rounded-[60px] h-[100%] md:text-lg text-md font-normal font-['Roboto'] leading-snug focus:outline-none focus:ring-0 focus:shadow-none"
                      />
                    </div>
                  </div>
                  {!valid && (
                    <div className='text-red-600 w-[100%] text-xs font-semibold flex ml-[2rem] '>
                      Please enter a valid email address.
                    </div>
                  )}
                  <div className='self-stretch w-[100%] bg-stone-950 hover:bg-[#202020] rounded-[60px] justify-center items-center inline-flex'>
                    <div className='justify-center w-[100%] items-center flex'>
                      <button
                        type='submit'
                        className="text-center cursor-pointer w-[100%]  px-5 py-3 text-neutral-50 md:text-lg text-md font-bold font-['Roboto'] leading-snug"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </form>
                <div className='self-stretch py-1 justify-center items-center gap-2 inline-flex'>
                  <div className='grow shrink basis-0 h-[0px] border-[1px] border-stone-950/opacity-5'></div>
                  <div className='px-2 justify-center items-center flex'>
                    <div className="text-center text-stone-950/opacity-20 text-xs  font-['Roboto'] uppercase leading-[14.40px]">
                      or
                    </div>
                  </div>
                  <div className='grow shrink basis-0 h-[0px] border-[1px] border-stone-950/opacity-5'></div>
                </div>

                

                <div className='self-stretch px-5 py-1   rounded-[60px] border border-stone-950/opacity-5 hover:bg-[#e7e6e6]  backdrop-blur-[19.90px] flex-col justify-center items-center gap-2 flex'>
                  <div className='self-stretch   flex-col justify-center items-start gap-4 flex'>
                    <div className='self-stretch justify-center items-center gap-2.5 inline-flex'>
                      <img className='w-5 h-5 relative' src='/src/assets/google.png' />
                      <button
                        onClick={() => socialLoginClicked('google')}
                        className="text-center text-stone-950 py-2 opacity-80 md:text-lg text-md font-[500] font-['Roboto'] leading-snug"
                      >
                        Continue with Google
                      </button>
                    </div>
                  </div>
                  
                </div>
                <div  onClick={()=>{setCurrentComponent("ConfirmPassword");console.log("cliked create new account");
                }} ><a className='bg-indigo-500 flex items-center justify-center cursor-pointer text-white px-5 py-2 rounded-3xl '>create new account</a></div>

                <div className='text-center'>
                  <span className="text-zinc-400 text-sm font-medium font-['Roboto'] leading-[16.80px]">
                    By logging in you agree to
                    <br />
                    our{' '}
                  </span>
                  <span className="text-blue-500 text-sm font-medium font-['Roboto'] underline leading-[16.80px]">
                    <a
                      href='https://triahq.notion.site/Tria-Beta-Terms-of-Use-1d7dfaf5a58f4038beecd1a67f963425?pvs=4'
                      target='_blank'
                    >
                      T&C
                    </a>
                  </span>
                  <span className="text-zinc-400 text-sm font-medium font-['Roboto'] leading-[16.80px]"> and </span>
                  <span className="text-blue-500 text-sm font-medium font-['Roboto'] underline leading-[16.80px]">
                    <a
                      href='https://triahq.notion.site/Tria-Beta-Privacy-Policy-359373dd601045b888c207f255634371?pvs=4'
                      target='_blank'
                    >
                      Privacy Policy
                    </a>
                  </span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      ) : (
          <Loader />
      )}
    </div>
  )
}
export default EmailInput
