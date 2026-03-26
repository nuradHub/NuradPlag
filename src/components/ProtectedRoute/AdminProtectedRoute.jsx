import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/Context'; // Adjust path
import { Loader2 } from 'lucide-react';
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const activeSession = localStorage.getItem('active_session_id');
  const mySession = sessionStorage.getItem('my_tab_session');

  if (!token || activeSession !== mySession) return <Navigate to='/login' />;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to='/login' />;
    }

    if (decoded.isAdmin === true) {
      return <Outlet />;
    } else {
      return <Navigate to='/dashboard' />;
    }

  } catch (err) {
    localStorage.removeItem('token')
    return <Navigate to='/login' />;
  }
};

export default AdminProtectedRoute;