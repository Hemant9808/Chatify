import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
interface passwordInputProps {
  email: string
  password: string
  setPassword: any
  handleSignIn: () => void
  member: boolean
  setCurrentComponent: any
  loading:boolean
}

const passwordInput: React.FC<passwordInputProps> = ({
  member,
  email,
  setCurrentComponent,
  password,
  setPassword,
  handleSignIn,
  loading
}) => {
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  // const handleForgetPassword = () => {
  //   router.push(`/forgetPassword?email=${email}&isMember=${member}`)
  // }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleSignIn();
  }
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-center ' >
    {!loading ?  <div className=' absolute lg:w-[27%] md:w-[40%] sm:w-[50%] w-[85%] z-[50] shadow-lg rounded-[17px] bg-white px-4 pt-6 pb-1 flex-col justify-start items-center gap-2 inline-flex'>
      <div className='self-stretch grow shrink basis-0 flex-col justify-between items-center flex'>
        <div className='self-stretch pt-3 flex-col justify-center items-center gap-8 flex'>
          <div className='self-stretch w-[100%] justify-center items-center px-4 gap-2 inline-flex'>
            <div className='absolute  h-[26px] flex items-center px-5  left-0 '>
              <img
                src='/src/assets/arrow-left.png'
                onClick={() => setCurrentComponent('EmailInput')}
                className='w-[24px] cursor-pointer  left-0 text-black sm:h-[23px] h-[20px] '
              />
            </div>
            <div className="text-center text-stone-950 sm:text-[28px] text-[23px] font-semibold font-['Roboto'] leading-[33.60px]">
              Enter Password
            </div>
          </div>
          <div className='self-stretch  px-2 flex-col justify-center items-center gap-14 flex'>
            <div className='self-stretch h-12 px-2 flex-col justify-center items-center gap-2 flex'>
              <div className="text-zinc-500 sm:text-[17px] text-[13px] font-normal font-['Roboto']">
                Login to your account using password for
              </div>
              <div className="text-stone-950 sm:text-[17px] text-[13px] font-semibold font-['Roboto']">{email}</div>
            </div>
            <form onSubmit={handleSubmit} className='self-stretch  flex-col justify-center items-center gap-6 flex'>
              <div className='self-stretch h-28 flex-col justify-center items-center gap-2 flex'>
                <div
                  className='self-stretch w-[100%] bg-black/opacity-0 rounded-[60px] border border-black  justify-start items-center inline-flex focus:border-black focus:ring-0 focus:outline-none'
                
                  autoFocus // Focuses on this input when component mounts
                >
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Enter Password'
                 autoFocus
                    className="grow w-[100%] shrink rounded-[60px] px-5 py-3 basis-0 text-stone-950 sm:text-lg text-md font-normal font-['Roboto'] leading-snug focus:outline-none focus:ring-0 focus:shadow-none"
                  />
                  <div className='cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? (
                      <VisibilityIcon className='text-gray-700 w-[90px] mr-5' />
                    ) : (
                      <VisibilityOffIcon className='text-gray-700 w-[90px] mr-5' />
                    )}{' '}
                  </div>
                </div>

                {/* <div className='self-stretch w-[100%] bg-black/opacity-0 rounded-[60px] border border-black/opacity-10 justify-start items-center inline-flex'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Enter Password'
                    className="grow w-[100%] shrink rounded-[60px] px-5 py-3 basis-0 text-stone-950 sm:text-lg text-md font-normal font-['Roboto'] leading-snug focus:outline-none focus:ring-0 focus:shadow-none"
                  ></input>
                   <div className='cursor-pointer ' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? (
                        <VisibilityIcon className='text-gray-700 w-[90px] mr-5' />
                      ) : (
                        <VisibilityOffIcon className='text-gray-700 w-[90px] mr-5' />
                      )}{' '}
                    </div>
                 
                </div> */}
                <div className='self-stretch w-[100%]   bg-stone-950 hover:bg-[#202020] rounded-[60px] justify-center items-center inline-flex'>
                  <div className='justify-center w-[100%] items-center flex'>
                    <button
                      type='submit'
                      className="text-center text-neutral-50 w-[100%] px-5 py-3 sm:text-lg text-md font-bold font-['Roboto'] leading-snug"
                      //onClick={handleSignIn}
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="text-center mb-4 text-zinc-500 text-sm font-medium font-['Roboto'] underline uppercase leading-[16.80px] cursor-pointer"
                //onClick={handleForgetPassword}
              >
                Forgot password
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div> : 
    <div className='flex justify-start flex-col items-center gap-3  '>
    <svg
      className='animate-spin h-18 w-18'
      xmlns='http://www.w3.org/2000/svg'
      width='72'
      height='72'
      viewBox='0 0 72 72'
      fill='none'
    >
      <path
        d='M21.5297 61.0341C20.6771 62.509 18.7799 63.0253 17.3938 62.0348C13.7549 59.4342 10.6918 56.0924 8.41357 52.2169C5.61282 47.4526 4.09371 42.0441 4.0042 36.5183C3.91469 30.9924 5.25783 25.5376 7.9028 20.6851C10.5478 15.8325 14.4044 11.7477 19.0971 8.82848C23.7897 5.90926 29.1585 4.25513 34.6803 4.02722C40.2022 3.79931 45.689 5.00538 50.6063 7.52796C55.5235 10.0505 59.7037 13.8036 62.7395 18.4217C65.209 22.1782 66.8529 26.4028 67.5774 30.8165C67.8534 32.4976 66.5517 33.9713 64.8518 34.0842C63.1519 34.1971 61.701 32.9044 61.3864 31.2301C60.7569 27.8796 59.4683 24.6764 57.5844 21.8107C55.1338 18.0829 51.7596 15.0534 47.7903 13.0171C43.821 10.9809 39.3921 10.0073 34.9348 10.1913C30.4775 10.3753 26.1438 11.7105 22.3558 14.0669C18.5679 16.4234 15.4548 19.7206 13.3197 23.6377C11.1847 27.5547 10.1005 31.9579 10.1727 36.4184C10.245 40.8789 11.4712 45.2446 13.732 49.0904C15.47 52.0469 17.7738 54.6186 20.5011 56.6642C21.864 57.6864 22.3822 59.5592 21.5297 61.0341Z'
        fill='#101010'
      />
    </svg>
    <div className="text-center text-stone-950 text-[1.3rem] font-semibold font-['Roboto'] leading-[33.60px]">
      Loading...
    </div>
  </div>
    }
    </div>
  )
}
export default passwordInput
