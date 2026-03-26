import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem('token')
  const activeSession = localStorage.getItem('active_session_id');
  const mySession = sessionStorage.getItem('my_tab_session');

  if (!token || activeSession !== mySession) {
    return <Navigate to='/login' />
  }

  try {
    const deconded = jwtDecode(token)

    const currentTime = Date.now() / 1000

    if (deconded.exp < currentTime) {
      localStorage.removeItem('token')
      return <Navigate to='/login' />
    }

    return <Outlet />
  } catch (err) {
    console.log(err)
    localStorage.removeItem('token')
    return <Navigate to='/login' />
  }


}
export default ProtectedRoute