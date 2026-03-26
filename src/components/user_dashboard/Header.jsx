import Icon from '../../assets/icon/notification.png';
import {Building2, ShieldCheck, Power, Menu, Bell, Settings, CreditCard, AlertCircle } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/Context';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import NotificationItem from './NotificationItem'; 

const socket = io(import.meta.env.VITE_CLIENT_URL);

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isMenu,
    setIsMenu,
    isAsideMenu,
    setIsAsideMenu,
    currentUser,
    setCurrentUser,
    setIsUpload,
    projectFunction
  } = useContext(AppContext);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      if (!userId) return;

      socket.emit('join', userId);

      socket.on('notification', (data) => {
        setNotifications(prev => [
          {
            id: Date.now(),
            message: data.message,
            projectId: data.projectId,
            time: new Date(),
            read: false
          },
          ...prev
        ]);
        setUnreadCount(prev => prev + 1);
        if (projectFunction) projectFunction();
      });
    } catch (err) {
      console.error("Token decode error:", err);
    }

    return () => socket.off('notification');
  }, [projectFunction]);

  // --- Handlers ---
  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(prev => {
      const target = prev.find(n => n.id === id);
      if (target && !target.read) setUnreadCount(c => Math.max(0, c - 1));
      return prev.filter(n => n.id !== id);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    window.location.href = '/login';
  };

  const closeMenuAndNavigate = (path) => {
    navigate(path);
    setIsMenu(false);
  };

  return (
    <>
      {/* Backdrop for both Menus */}
      {(isMenu || showNotifications) && (
        <div 
          className="fixed inset-0 bg-slate-900/5 z-40 transition-opacity"
          onClick={() => {
            setIsMenu(false);
            setShowNotifications(false);
          }}
        />
      )}

      <header className='sticky top-0 z-40 w-full bg-white/80 border-0 shadow-md shadow-indigo-200/20 px-4 py-2'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>

          {/* Mobile Logo */}
          <div className='md:hidden flex items-center gap-2'>
            <img src="/img/nplag.png" alt="Logo" className='w-8 h-8 object-contain' />
            <span className="font-bold text-slate-900 tracking-tight">NuradPlag</span>
          </div>

          <div className='flex items-center justify-end w-full gap-4 md:gap-6 relative'>

            {/* --- NOTIFICATION BELL SECTION --- */}
            <div 
              className='relative group cursor-pointer p-2 hover:bg-slate-100 rounded-full transition-colors'
              onClick={() => {
                setShowNotifications(!showNotifications);
                setIsMenu(false);
              }}
            >
              <Bell size={22} className={`${unreadCount > 0 ? 'text-blue-600' : 'text-slate-600'} group-hover:text-blue-600`} />
              {unreadCount > 0 && (
                <span className='absolute top-1.5 right-1.5 bg-rose-500 border-2 border-white rounded-full text-[10px] h-4 w-4 flex items-center justify-center text-white font-bold animate-pulse'>
                  {unreadCount}
                </span>
              )}
            </div>

            {/* --- NOTIFICATION DROPDOWN --- */}
            {showNotifications && (
              <div className='absolute right-0 top-14 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50 md:right-12'>
                <div className='p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50'>
                  <span className='font-black text-slate-800 text-sm'>Notifications</span>
                  <button 
                    onClick={() => {setNotifications([]); setUnreadCount(0);}} 
                    className='text-[10px] font-bold text-slate-400 hover:text-rose-500 uppercase tracking-widest'
                  >
                    Clear All
                  </button>
                </div>
                
                <div className='max-h-100 overflow-y-auto'>
                  {notifications.length > 0 ? (
                    notifications.map(notif => (
                      <NotificationItem 
                        key={notif.id} 
                        notification={notif} 
                        onRead={handleMarkAsRead} 
                        onDelete={handleDeleteNotification}
                      />
                    ))
                  ) : (
                    <div className='p-10 text-center text-slate-400 text-xs font-bold uppercase tracking-widest'>
                      No new alerts
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- PROFILE SECTION --- */}
            <div className='relative'>
              <div
                className='h-10 w-10 md:h-11 md:w-11 rounded-full bg-blue-600 ring-2 ring-emerald-500/20 hover:ring-emerald-500 transition-all hidden overflow-hidden md:flex items-center justify-center cursor-pointer'
                onClick={() => {
                  setIsMenu(!isMenu);
                  setShowNotifications(false);
                }}
                onDoubleClick={() => setIsUpload(true)}
                title='Double click to change passport'
              >
                {currentUser?.data?.passport ? (
                  <img className='w-full h-full object-cover' src={currentUser?.data?.passport} alt='passport' />
                ) : (
                  <span className='text-white font-bold text-sm'>
                    {currentUser?.data?.firstname?.[0]}{currentUser?.data?.lastname?.[0]}
                  </span>
                )}
              </div>

              {isMenu && (
                <div className='absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200'>
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</p>
                  </div>

                  {!location.pathname.includes('/profile') && (
                    <>
                      <button className='w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors' onClick={() => closeMenuAndNavigate('/dashboard/profile')}>
                        <Settings size={18} /> Account Settings
                      </button>
                      <button className='w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors' onClick={() => closeMenuAndNavigate('/dashboard/profile')}>
                        <CreditCard size={18} /> Billing
                      </button>
                    </>
                  )}

                  {currentUser?.data?.isAdmin && (
                    <>
                    <Link to='/dashboard/organization' className='list-none'>
                      <button className='w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors' onClick={() => setIsMenu(false)}>
                        <Building2 size={18} /> Organization
                      </button>
                    </Link>
                    <Link to='/admin/dashboard/support' className='list-none'>
                      <button className='w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors' onClick={() => setIsMenu(false)}>
                        <AlertCircle size={18} /> Support Messages
                      </button>
                    </Link>
                    </>
                  )}

                  <Link to='/terms' className='list-none'>
                    <button className='w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors' onClick={() => setIsMenu(false)}>
                      <ShieldCheck size={18} /> Terms of use
                    </button>
                  </Link>

                  <div className="mt-2 pt-2 border-t border-slate-50">
                    <button className='w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors' onClick={handleLogout}>
                      <Power size={18} /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              className="p-2 -mr-2 md:hidden text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsAsideMenu(!isAsideMenu)}
            >
              <Menu size={28} />
            </button>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;