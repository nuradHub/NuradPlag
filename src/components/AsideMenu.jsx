import { FilePlus2, FolderHeart, Send, X, FileUser, Settings, LogOut, HelpCircle, BookText } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from './context/Context';
import { useNavigate, Link } from 'react-router-dom';

const AsideMenu = () => {
  const navigate = useNavigate();

  const { 
    isAsideMenu, 
    setIsAsideMenu, 
    selectedMenu, 
    setSelectedMenu, 
    currentUser 
  } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const menuAction = (menuTag) => {
    navigate('/dashboard');
    setSelectedMenu(menuTag);
    setIsAsideMenu(false);
  };

  const itemStyle = (tag) => `
    flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer font-semibold text-sm
    ${selectedMenu === tag 
      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
  `;

  return (
    <>

      {isAsideMenu && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsAsideMenu(false)}
        />
      )}

      <div className={`
        fixed top-0 right-0 h-screen w-80 bg-slate-900 border-l border-white/5 
        shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isAsideMenu ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-white/5'>
          <div className="flex items-center gap-2">
            <img src="/img/nplag-white.png" alt="Logo" className='w-8' />
            <span className="text-white font-bold tracking-tight">NuradMenu</span>
          </div>
          <button 
            onClick={() => setIsAsideMenu(false)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Profile Card */}
        <div className='p-6'>
          <div className='bg-slate-800/50 rounded-2xl p-4 border border-white/5'>
            <div className='flex items-center gap-3 mb-4'>
              <div 
                className='relative h-12 w-12 rounded-full bg-blue-600 shrink-0 flex items-center justify-center overflow-hidden border-2 border-emerald-500/20 cursor-pointer'
                onClick={() => navigate('/dashboard/profile')}
              >
                {currentUser?.data?.passport ? (
                  <img className='w-full h-full object-cover' src={currentUser?.data?.passport} alt='passport' />
                ) : (
                  <span className='text-white font-bold'>
                    {currentUser?.data?.firstname?.[0]}{currentUser?.data?.lastname?.[0]}
                  </span>
                )}
              </div>
              <div className='overflow-hidden'>
                <h3 className='text-white font-bold truncate'>
                  {currentUser?.data?.firstname || 'User'} {currentUser?.data?.lastname}
                </h3>
                <p className='text-xs text-slate-500 truncate'>{currentUser?.data?.email || 'Student Account'}</p>
              </div>
            </div>

            <div className='flex items-center justify-between pt-2 border-t border-white/5'>
              <button 
                onClick={() => {navigate('/dashboard/profile'); setIsAsideMenu(false) }}
                className='flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors'
              >
                <Settings size={14} /> Settings
              </button>
              <button 
                onClick={handleLogout}
                className='flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors'
              >
                <LogOut size={14} /> Log out
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className='flex-1 overflow-y-auto px-4 space-y-2'>
          <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Workspace</p>
          
          <div className={itemStyle('new-scan')} onClick={() => menuAction('new-scan')}>
            <FilePlus2 size={20} className={selectedMenu === 'new-scan' ? "text-emerald-400" : "text-blue-500"} />
            New Scan
          </div>

          <div className={itemStyle('submit-project')} onClick={() => menuAction('submit-project')}>
            <Send size={20} className={selectedMenu === 'submit-project' ? "text-emerald-400" : "text-blue-500"} />
            Submit Project
          </div>

          <div className={itemStyle('my-scan')} onClick={() => menuAction('my-scan')}>
            <FolderHeart size={20} className={selectedMenu === 'my-scan' ? "text-emerald-400" : "text-blue-500"} />
            My Scans
          </div>

          <div className={itemStyle('shared')} onClick={() => menuAction('shared')}>
            <FileUser size={20} className={selectedMenu === 'shared' ? "text-emerald-400" : "text-blue-500"} />
            Shared With Me
          </div>

          <div className="pt-6">
            <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Resources</p>
            <Link to='/dashboard/support' className={itemStyle('support')} onClick={() => setIsAsideMenu(false)}>
              <HelpCircle size={20} className="text-emerald-500" />
              Support Center
            </Link>
            <Link to='/dashboard/blog' className={itemStyle('blog')} onClick={() => setIsAsideMenu(false)}>
              <BookText size={20} className="text-emerald-500" />
              Academic Blog
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className='p-6 border-t border-white/5'>
          <Link to='/terms' className='text-xs text-slate-500 hover:text-emerald-500 transition-colors underline underline-offset-4 font-medium' onClick={()=> {setIsAsideMenu(false); setIsAsideMenu(false)}}>
            Terms of Service & Privacy
          </Link>
        </div>
      </div>
    </>
  );
};

export default AsideMenu;