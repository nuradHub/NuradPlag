import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/Context';

const ForgotPasswordPage = () => {

    const { email, setEmail, isLoading, setIsLoading } = useContext(AppContext)

    const resetPassword = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            const response = await axios.post(`/reset-link`, {
                email: email
            })
            if (response.data) toast.success(response?.data?.message)
            setEmail('')
        } catch (err) {
            console.log(err.message)
            toast.error(err?.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className=' flex flex-col w-full h-full justify-center bg-linear-to-b from-blue-700 from-30% to-white to-30% '>
            <div className='flex flex-col gap-5 mx-auto p-3 px-5 border border-blue-100 shadow-lg w-80 max-w-150 rounded-2xl bg-white md:w-85'>
                <div className='flex flex-col gap-3 items-center'>
                    <img src="/img/nplag.png" alt="Nurad Plag logo" className='w-7' />
                    <p className='text-lg font-bold'>Reset your password</p>
                    <p className='text-sm text-gray-700'>Verification link will be sent via email</p>
                </div>
                <div className='flex flex-col'>
                    <form className='flex flex-col gap-7' onSubmit={resetPassword} method='POST' autoComplete='on'>
                        <div className='flex flex-col gap-2 relative'>
                            <input type="email" placeholder=' ' required name='email' id='email' className=' peer p-3 border border-blue-200 rounded focus:outline-0 focus:border-blue-700' onChange={(e) => setEmail(e.target.value.trim())} />
                            <label className='absolute -top-4 left-2 bg-white text-gray-600 rounded px-2 peer-placeholder-shown:top-3  peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-4 peer-focus:bg-white peer-focus:text-gray-600 peer-focus:rounded peer-focus:px-2' htmlFor="email">your@gmail.com</label>
                        </div>

                        {isLoading ?
                            <div className='flex items-center justify-center bg-blue-600 rounded '>
                                <img src="/img/loading.gif" className='w-10' />
                            </div>
                            :
                            <button type='submit' className='bg-blue-600 hover:bg-blue-700 px-2 py-2 rounded-sm text-white cursor-pointer border-0 '>
                                Send Verification Link
                            </button>
                        }
                    </form>
                </div>
                <p>Back to <Link to='/login' className='text-blue-400'>Login</Link></p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;