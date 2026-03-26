import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from './context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = () => {

    const { email, setEmail, setPassword, password, isLoading, setIsLoading, showPassword, setShowPassword, setUserId } = useContext(AppContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const newSessionId = Math.random().toString(36).substring(7);

        try {
            const response = await axios.post(`/login`, {
                email: email,
                password: password
            })
            toast.success(response.data.message)
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('active_session_id', newSessionId);
                sessionStorage.setItem('my_tab_session', newSessionId);
            }
            setUserId(response.data.user.userId)

            const adminStatus = response.data.user?.isAdmin;
            const termsStatus = response.data.user?.terms;

            if (!termsStatus) {
                window.location.href = `/terms`;
                return
            } else {
                window.location.href = adminStatus ? `/admin/dashboard` : '/dashboard'
            }
            setEmail('')
            setPassword('')

        } catch (err) {
            toast.error(err?.response?.data?.message)
            console.log("Error", err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className=' flex flex-col w-full h-full justify-center bg-linear-to-b from-blue-700 from-30% to-white to-30%'>
            <div className='flex flex-col gap-5 mx-auto p-3 px-5 border border-blue-100 shadow-lg w-80 max-w-150 rounded-2xl bg-white md:w-85'>
                <div className='flex flex-col gap-3 items-center'>
                    <img src="/img/nplag.png" alt="Nurad Plag logo" className='w-7' />
                    <h3 className='font-black'>Welcome Back</h3>
                </div>
                <div className='flex flex-col gap-3'>
                    <form className='flex flex-col gap-7' onSubmit={handleLogin} method='POST' autoComplete="on">
                        <div className='flex flex-col gap-2 relative'>
                            <input type="email" placeholder=' ' required name='email' id='email' className=' peer p-3 border border-blue-200 rounded focus:outline-0 focus:border-blue-700' onChange={(e) => setEmail(e.target.value.trim())} />
                            <label className='absolute -top-4 left-2 bg-white text-gray-600 rounded px-2 peer-placeholder-shown:top-3  peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-4 peer-focus:bg-white peer-focus:text-gray-600 peer-focus:rounded peer-focus:px-2' htmlFor="email">your@gmail.com</label>
                        </div>
                        <div className='flex flex-col gap-2 relative'>
                            <input type={showPassword ? 'text' : 'password'} placeholder=' ' required name='password' id='password' className="peer p-3 border border-blue-200 rounded focus:outline-0 focus:border-blue-700 pr-12" onChange={(e) => setPassword(e.target.value.trim())} />
                            <img src="/img/eye.png" className='absolute right-3 top-5 cursor-pointer w-5' alt="" onClick={() => setShowPassword(!showPassword)} />
                            <label className='absolute -top-4 left-2 bg-white text-gray-600 rounded px-2 peer-placeholder-shown:top-3  peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-4 peer-focus:bg-white peer-focus:text-gray-600 peer-focus:rounded peer-focus:px-2' htmlFor="password">**********</label>
                            <p> <Link to='/resetpassword' className='text-blue-400'>Forgot your password?</Link></p>
                        </div>

                        {isLoading ?
                            <div className='flex items-center justify-center bg-blue-600 rounded '>
                                <img src="/img/loading.gif" className='w-10' />
                            </div>
                            :
                            <button type='submit' className='bg-blue-600 hover:bg-blue-700 px-2 py-2 rounded-sm text-white cursor-pointer border-0 '>
                                Login
                            </button>
                        }
                    </form>
                    <p>Don't have an account? <Link to='/register' className='text-blue-400'>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;