import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react';
import { AppContext } from './context/Context';

const RegisterPage = () => {

  const navigate = useNavigate()

  const {email, password, setEmail, setPassword, firstname, setFirstName, isLoading, setIsLoading, showPassword, setShowPassword} = useContext(AppContext)

  const HandleRegisterUser = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    if (!email || !password || !firstname) return;

      try {
        const response = await axios.post(`/register`, {
          firstname: firstname,
          email: email,
          password: password
        })
        toast.success(response.data.message)
        setEmail('')
        setFirstName('')
        setPassword('')
        navigate('/login')
      } catch (err) {
        toast.error(err?.response?.data?.message)
        console.log("Error:", err.message)
      }finally{
        setIsLoading(false)
      }
  }

  return (
    <div className='flex flex-col w-full h-full justify-center bg-linear-to-b from-blue-700 from-30% to-white to-30%'>
      <div className='flex flex-col gap-5 bg-white border border-blue-100 shadow-lg mx-auto p-3 px-5 w-85 max-w-150 rounded-2xl md:w-95'>
        <div className='flex flex-col gap-3 items-center'>
          <img src="/img/nplag.png" alt="Nurad Plag logo" className='w-7' />
          <h3 className='font-bold text-2xl'>Sign Up</h3>
        </div>
        <div className='flex flex-col'>
          <form className='flex flex-col gap-7' onSubmit={HandleRegisterUser} method='POST' autoComplete='on'>
            <div className='flex flex-col gap-2 relative'>
              <input type="text" placeholder=' ' required name='first-name' id='first-name' className=' peer p-3 border border-blue-200 rounded focus:outline-0 focus:border-blue-700' onChange={(e) => setFirstName(e.target.value.trim())} />
              <label className='absolute -top-4 left-2 bg-white text-gray-600 rounded px-2 peer-placeholder-shown:top-3  peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-4 peer-focus:bg-white peer-focus:text-gray-600 peer-focus:rounded peer-focus:px-2' htmlFor="first-name">First Name</label>
            </div>
            <div className='flex flex-col gap-2 relative'>
              <input type="email" placeholder=' ' required name='email' id='email' className=' peer p-3 border border-blue-200 rounded focus:outline-0 focus:border-blue-700' onChange={(e) => setEmail(e.target.value.trim())} />
              <label className='absolute -top-4 left-2 bg-white text-gray-600 rounded px-2 peer-placeholder-shown:top-3  peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-4 peer-focus:bg-white peer-focus:text-gray-600 peer-focus:rounded peer-focus:px-2' htmlFor="email">your@gmail.com</label>
            </div>
            <div className='flex flex-col gap-2 relative'>
              <input type={showPassword ? 'text' : 'password'} placeholder=' ' required name='password' id='password' className="peer p-3 border border-blue-200 rounded focus:outline-0 focus:border-blue-700 pr-12" onChange={(e) => setPassword(e.target.value.trim())} />
              <img src="/img/eye.png" className='absolute right-3 top-5 cursor-pointer w-5' alt="" onClick={()=> setShowPassword(!showPassword)} />
              <label className='absolute -top-4 left-2 bg-white text-gray-600 rounded px-2 peer-placeholder-shown:top-3  peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-4 peer-focus:bg-white peer-focus:text-gray-600 peer-focus:rounded peer-focus:px-2' htmlFor="password">**********</label>
            </div>
            
            {isLoading ?
              <div className='flex items-center justify-center bg-blue-600 rounded '>
                <img src="/img/loading.gif" className='w-10' />
              </div>
              :
              <button type='submit' className='bg-blue-600 hover:bg-blue-700 px-2 py-2 rounded-sm text-white cursor-pointer border-0 '>
                Register
              </button>
            }
          </form>
        </div>
        <p>Already have an account? <Link to='/login' className='text-blue-400'>Login</Link></p>
        <div className='flex items-center '>
          <p className="flex items-center before:content-[''] before:flex-1 before:border-t before:border-gray-300 before:mr-4 after:content-[''] after:flex-1 after:border-t after:border-gray-300 after:ml-4 w-full">OR</p>
        </div>
        <div className='w-full'>
          <button className="bg-slate-100 px-2 py-2 rounded-2xl text-black cursor-pointer border-0 hover:bg-slate-200 w-full bg-[url('/img/google.png')] bg-no-repeat bg-position-[60px_center] bg-size-[20px] pl-10">Signup with email</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;