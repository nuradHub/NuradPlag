import { Routes, Route } from 'react-router-dom';
import './index.css';
import React, { Suspense, useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './components/NotFound';
import axios from 'axios';
import { AppContext } from './components/context/Context';
import { jwtDecode } from 'jwt-decode';
import BlogPage from './components/BlogPage';
import OrganizationPage from './components/user_dashboard/profile-details/OrganizationPage';
import TermsOfUse from './components/user_dashboard/TermsOfUse';
import AdminProtectedRoute from './components/ProtectedRoute/AdminProtectedRoute';
import AdminDashboard from './components/admin_dashboard/AdminDashboard';
import AdminReportPage from './components/admin_dashboard/report-page/AdminReportPage';
import AdminSupport from './components/admin_dashboard/AdminSupport';

const LandingPage = React.lazy(() => import('./pages/LandingPage'))
const LoginPage = React.lazy(() => import('./components/LoginPage'))
const RegisterPage = React.lazy(() => import('./components/RegisterPage'))
const ForgotPasswordPage = React.lazy(() => import('./components/resetpassword/ForgotPasswordPage'))
const ChangePasswordPage = React.lazy(() => import('./components/resetpassword/ChangePasswordPage'))
const UserDashboard = React.lazy(() => import('./components/user_dashboard/UserDashboard'))
const ProfileDetails = React.lazy(() => import('./components/user_dashboard/profile-details/ProfileDetails'))
const Support = React.lazy(() => import('./components/Support'))

function App() {

  const { getUserProfile, currentUser } = useContext(AppContext)

  useEffect(() => {
    getUserProfile()
  }, [])

  useEffect(() => {
    const checkSession = () => {
      const activeSession = localStorage.getItem('active_session_id');
      const mySession = sessionStorage.getItem('my_tab_session');

      if (activeSession && mySession && activeSession !== mySession) {
        window.location.href = '/login?reason=session_taken';
      }
    };

    window.addEventListener('storage', checkSession);

    window.addEventListener('focus', checkSession);

    return () => {
      window.removeEventListener('storage', checkSession);
      window.removeEventListener('focus', checkSession);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <Suspense fallback={<div className='fixed top-0 left-0 right-0 bottom-0 dark:bg-slate-900 flex items-center justify-center z-2'><div className='w-20'><img src='/img/nplag-white.png' alt='loading icon' className='animate-bounce' /></div></div>}>
        <ToastContainer />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/resetpassword' element={<ForgotPasswordPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard">
              <Route index element={<UserDashboard />} />
              <Route path="profile" element={<ProfileDetails />} />
              <Route path='support' element={<Support />} />
              <Route path='organization' element={<OrganizationPage />} />
              <Route path='blog' element={<BlogPage />} />
            </Route>
          </Route>
          <Route path='terms' element={<TermsOfUse />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashboard">
              <Route index element={<AdminDashboard />} />
              <Route path='report/:projectId' element={<AdminReportPage />} />
              <Route path='support' element={<AdminSupport />} />
            </Route>
          </Route>
          <Route path='/reset-password/:resetToken' element={<ChangePasswordPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>

  );
}

export default App;
