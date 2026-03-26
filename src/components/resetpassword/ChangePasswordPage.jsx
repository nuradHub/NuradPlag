import axios from "axios"
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"
import { AppContext } from "../context/Context";

const ChangePasswordPage = () => {

  const { password, setPassword, isLoading, setIsLoading, showPassword, setShowPassword } = useContext(AppContext)

  const { resetToken } = useParams()

  const navigate = useNavigate()

  const changePassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.put(`/reset-password/${resetToken}`, {
        password: password
      })
      if (response.data) toast.success(response?.data?.message);
      setPassword('')
      navigate('/login')
    } catch (err) {
      toast.error(err?.response?.data?.message)
      console.log("Error", err.message)
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full h-full justify-center bg-linear-to-b from-blue-700 from-40% to-white to-40%">
      <div className="flex flex-col gap-7 mx-auto p-3 px-5 border border-blue-100 shadow-lg w-80 max-w-150 rounded-2xl bg-white md:w-85">
        <img src="/img/nplag.png" alt="Nurad Plag Logo" className="w-10 mx-auto" />
        <h3 className="font-bold uppercase text-center text-black">Reset Your Password</h3>
        <form className='flex flex-col gap-7' onSubmit={changePassword} method='POST' autoComplete='on'>
          <div className='flex flex-col gap-2 relative'>
            <input type={showPassword ? 'text' : 'password'} placeholder=' ' required name='password' id='password' className="peer p-3 border border-blue-200 rounded focus:outline-0 focus:border-blue-700 pr-12" onChange={(e) => setPassword(e.target.value.trim())} />
            <img src="/img/eye.png" className='absolute right-3 top-5 cursor-pointer w-5' alt="" onClick={() => setShowPassword(!showPassword)} />
            <label className='absolute -top-4 left-2 bg-white text-gray-600 rounded px-2 peer-placeholder-shown:top-3  peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-4 peer-focus:bg-white peer-focus:text-gray-600 peer-focus:rounded peer-focus:px-2' htmlFor="password">New password</label>
          </div>

          {isLoading ?
            <div className='flex items-center justify-center bg-blue-600 rounded '>
              <img src="/img/loading.gif" className='w-10' />
            </div>
            :
            <button type='submit' className='bg-blue-600 hover:bg-blue-700 px-2 py-2 rounded-sm text-white cursor-pointer border-0 '>
              Reset Password
            </button>
          }
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordPage