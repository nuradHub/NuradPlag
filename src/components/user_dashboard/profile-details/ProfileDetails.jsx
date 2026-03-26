import { PageSkeleton } from '../../PageSkeleton';
import { Link } from 'react-router-dom';
import Header from '../Header';
import {
  Check, User2, Pen, ShieldCheck, CreditCard, Zap, Lock, Info, LifeBuoy, AlertTriangle, Trash2
} from 'lucide-react';
import AsideMenu from '../../AsideMenu';
import { useState, useEffect, useContext } from 'react';
import SelectScannedFolder from '../SelectScannedFolder';
import { AppContext } from '../../context/Context';
import { toast } from 'react-toastify';
import EditAccount from './EditAccount';
import EditBilling from './EditBilling';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import axios from 'axios';

const ProfileDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const { isEditAccount, isEditBilling, isEditEmail, setIsEditAccount, setIsEditBilling, setIsEditEmail, selectedProfile, setSelectedProfile, currentUser, isUpdatePassword, setIsUpdatePassword, setCurrentUser } = useContext(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PageSkeleton />;

  const handleDeleteAccount = async () => {
    setIsWaiting(true)
    try {
      const response = await axios.delete('/delete/account', {
        data: { userId: currentUser.data._id }
      })
      if (response.data) {
        localStorage.removeItem('token')
        setCurrentUser(null)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message)
    }finally{
      setIsWaiting(false)
    }
  }

  return (
    /* Changed to overflow-hidden to lock the main screen */
    <div className='flex flex-col w-full h-screen bg-slate-50 overflow-hidden'>
      <Header />
      <AsideMenu />
      <SelectScannedFolder />
      {isEditAccount && <EditAccount />}
      {isEditBilling && <EditBilling />}
      {isEditEmail && <UpdateEmail />}
      {isUpdatePassword && <UpdatePassword />}

      <div className='flex flex-1 overflow-hidden relative'>

        {/* Left Navigations (Sidebar) */}
        <aside className='hidden md:flex md:flex-col md:w-64 bg-white border-r border-slate-200 shrink-0 pt-10'>
          <div className='px-6 mb-8'>
            <img src="/img/nuradplag.png" alt="logo" className="w-32" />
          </div>

          <nav className='flex flex-col gap-1 px-4 flex-1'>
            <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold transition-all ${selectedProfile === 'profile' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`} onClick={() => setSelectedProfile('profile')}>
              <User2 size={20} /> Profile
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold transition-all ${selectedProfile === 'security' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`} onClick={() => setSelectedProfile('security')}>
              <ShieldCheck size={20} /> Security
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold transition-all ${selectedProfile === 'billing' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`} onClick={() => setSelectedProfile('billing')}>
              <CreditCard size={20} /> Subscription Plan
            </div>
          </nav>

          {/* Support Link - Links to the dashboard support page */}
          <div className='p-4 border-t border-slate-100'>
            <Link to='/dashboard/support' className='flex items-center gap-3 p-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 hover:text-emerald-600 transition-all'>
              <LifeBuoy size={20} /> Support
            </Link>
          </div>
        </aside>

        {/* Main Body Content Area - Made this area independently scrollable */}
        <main className='flex-1 overflow-y-auto p-4 md:p-10'>
          <div className='max-w-4xl mx-auto pb-20'>

            {selectedProfile === 'profile' && (
              <div className='flex flex-col gap-8'>
                <h3 className='font-bold text-2xl text-slate-900'>Account Details</h3>
                <div className='bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                      <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Email Address</p>
                      <div className='flex flex-col items-start md:flex-row md:items-center gap-3'>
                        <p className='font-bold text-slate-700'>{currentUser?.data?.email || 'user@example.com'}</p>
                        <button onClick={() => setIsEditEmail(true)} className='text-blue-600 font-bold text-xs hover:underline'>Change email</button>
                      </div>
                    </div>
                    <button onClick={() => setIsEditAccount(true)} className="p-2 bg-slate-50 text-slate-400 hover:text-emerald-500 rounded-lg transition-colors"><Pen size={18} /></button>
                  </div>
                  <hr className='border-slate-100' />
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>First Name</p>
                      <p className='font-bold text-slate-700'>{currentUser?.data?.firstname || '—'}</p>
                    </div>
                    <div>
                      <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Last Name</p>
                      <p className='font-bold text-slate-700'>{currentUser?.data?.lastname || '—'}</p>
                    </div>
                  </div>
                </div>

                <h3 className='font-bold text-2xl text-slate-900 mt-4'>Billing Address</h3>
                <div className='bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6'>
                  <div className='flex justify-between items-start'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 w-full'>
                      <div>
                        <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Country</p>
                        <p className='font-bold text-slate-700'>{currentUser?.data?.country || '—'}</p>
                      </div>
                      <div>
                        <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>City</p>
                        <p className='font-bold text-slate-700'>{currentUser?.data?.city || '—'}</p>
                      </div>
                      <div className='md:col-span-2'>
                        <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Street Address</p>
                        <p className='font-bold text-slate-700'>{currentUser?.data?.address || '—'}</p>
                      </div>
                    </div>
                    <button onClick={() => setIsEditBilling(true)} className="p-2 bg-slate-50 text-slate-400 hover:text-emerald-500 rounded-lg transition-colors"><Pen size={18} /></button>
                  </div>
                </div>
              </div>
            )}

            {selectedProfile === 'security' && (
              <div className='flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
                <div className="flex flex-col gap-1">
                  <h3 className='font-black text-3xl text-slate-900 tracking-tight'>Security & Privacy</h3>
                  <p className="text-slate-500 font-medium">Manage your credentials and account safety.</p>
                </div>

                {/* Main Security Box */}
                <div className='bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 space-y-8 relative'>
                  <div className='flex items-start gap-5'>
                    <div className='p-4 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm border border-indigo-100/50'><Lock size={24} /></div>
                    <div className='flex-1'>
                      <h4 className='font-bold text-slate-900 text-lg'>Password Management</h4>
                      <p className='text-slate-500 text-sm leading-relaxed'>Ensure your account remains protected with a high-entropy password.</p>
                      <button
                        className='mt-5 px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-900/10 text-sm'
                        onClick={() => setIsUpdatePassword(true)}
                      >
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>

                  <div className='flex items-start gap-5 opacity-70'>
                    <div className='p-4 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100'><ShieldCheck size={24} /></div>
                    <div className='flex-1'>
                      <div className="flex items-center gap-3">
                        <h4 className='font-bold text-slate-900 text-lg'>Two-Factor Authentication</h4>
                        <span className='px-2 py-0.5 bg-slate-100 text-slate-500 font-black text-[9px] uppercase rounded-md border border-slate-200'>Beta</span>
                      </div>
                      <p className='text-slate-500 text-sm'>Add an extra verification layer to your login process.</p>
                      <div className='mt-4 inline-flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-widest'>Coming Soon</div>
                    </div>
                  </div>
                </div>

                {/* The Enhanced Danger Zone */}
                <div className={`group transition-all duration-700 rounded-[2.5rem] border-2 overflow-hidden ${isDelete ? 'bg-rose-50/80 border-rose-200 shadow-2xl shadow-rose-200/20' : 'bg-white border-slate-100 hover:border-rose-100 shadow-sm'}`}>
                  <div className='p-5 md:p-10'>
                    <div className='flex items-start gap-6'>
                      <div className={`p-4 rounded-2xl transition-colors duration-500 ${isDelete ? 'bg-rose-600 text-white animate-pulse' : 'bg-rose-50 text-rose-500 group-hover:bg-rose-600 group-hover:text-white'}`}>
                        <AlertTriangle size={28} />
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-black text-slate-900 text-xl uppercase tracking-tighter'>Danger Zone</h4>
                        <p className='text-slate-500 text-sm mt-1 leading-relaxed max-w-2xl font-medium'>
                          Account deletion is <span className="text-rose-600 font-bold underline decoration-rose-200 decoration-2 underline-offset-2">irreversible</span>. This will purge your research history, scan results, and biometric identity from NuradPlag.
                        </p>

                        {!isDelete && (
                          <button
                            className='mt-8 flex items-center gap-2 text-rose-500 font-black text-sm hover:text-rose-700 transition-all group/btn'
                            onClick={() => setIsDelete(true)}
                          >
                            Delete Account Permanently <Trash2 size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Floating Confirmation Input */}
                    {isDelete && (
                      <div className='mt-10 animate-in slide-in-from-top-4 duration-500'>
                        <div className='bg-white/60 backdrop-blur-sm border border-rose-200 p-4 md:p-10 rounded-[2rem] shadow-xl shadow-rose-900/5 relative'>
                          <div className="absolute -top-3 left-8 px-3 py-1 bg-rose-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-rose-200">
                            Security Check
                          </div>

                          <div className='flex flex-col gap-6'>
                            <div className="space-y-4">
                              <p className="text-slate-600 text-sm font-bold ml-1">
                                To confirm, please type your email below:
                                <code className="block mt-2 p-3 bg-slate-900 text-indigo-300 rounded-xl text-xs font-mono select-all border border-slate-700 shadow-inner">
                                  {currentUser?.data?.email}
                                </code>
                              </p>

                              <div className="relative group">
                                <input
                                  type="text"
                                  value={deleteConfirmText}
                                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                                  placeholder="Enter identity to confirm"
                                  className="w-full bg-white/80 border-2 border-slate-100 rounded-2xl p-5 text-slate-900 font-bold focus:border-rose-500 focus:ring-[12px] focus:ring-rose-500/10 transition-all outline-none placeholder:text-slate-300 shadow-sm"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-4">
                              <button
                                disabled={deleteConfirmText !== currentUser?.data?.email || isWaiting}
                                className={`flex-1 w-full flex items-center justify-center gap-3 py-5 font-black rounded-2xl transition-all active:scale-[0.98] text-sm uppercase tracking-widest ${deleteConfirmText === currentUser?.data?.email
                                    ? 'bg-rose-600 text-white shadow-2xl shadow-rose-400/40 hover:bg-rose-700 cursor-pointer'
                                    : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                                  }`}
                                onClick={handleDeleteAccount}
                              >
                                {isWaiting ? (
                                  <div className="h-5 w-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                  <Trash2 size={18} />
                                )}
                                {isWaiting ? 'Wiping Infrastructure...' : 'Confirm Account Termination'}
                              </button>

                              <button
                                onClick={() => { setIsDelete(false); setDeleteConfirmText(''); }}
                                className='w-full md:w-auto px-8 py-5 text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors uppercase tracking-widest'
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedProfile === 'billing' && (
              <div className='flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300'>
                <h3 className='font-bold text-2xl text-slate-900'>Subscription Plan</h3>

                <div className='bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl'>
                  <div className='relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
                    <div>
                      <div className='inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4'>
                        <Zap size={14} fill="currentColor" /> Current Plan
                      </div>
                      <h1 className='text-4xl font-extrabold'>Basic Free</h1>
                      <p className='text-slate-400 mt-2'>Perfect for occasional research and students.</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm text-slate-400'>Next Reset</p>
                      <p className='text-xl font-bold'>April 1, 2026</p>
                    </div>
                  </div>
                  <div className='absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl'></div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col'>
                    <h4 className='font-bold text-slate-900 text-xl'>Pro Researcher</h4>
                    <p className='text-slate-500 text-sm mt-1'>For serious academic work.</p>
                    <div className='my-6'>
                      <span className='text-4xl font-black text-slate-900'>₦5,000</span>
                      <span className='text-slate-400 font-bold'>/month</span>
                    </div>
                    <ul className='space-y-4 flex-1'>
                      <li className='flex items-center gap-3 text-sm font-medium text-slate-600'><Check size={18} className='text-emerald-500' /> Unlimited Plagiarism Scans</li>
                      <li className='flex items-center gap-3 text-sm font-medium text-slate-600'><Check size={18} className='text-emerald-500' /> Advanced AI Detection</li>
                      <li className='flex items-center gap-3 text-sm font-medium text-slate-600'><Check size={18} className='text-emerald-500' /> PDF Report Downloads</li>
                    </ul>
                    <button className='mt-8 w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all'>Upgrade to Pro</button>
                  </div>
                  <div className='bg-slate-50 p-8 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center'>
                    <div className='p-4 bg-white rounded-full shadow-sm mb-4'><Info className='text-blue-500' size={32} /></div>
                    <h4 className='font-bold text-slate-900'>Need more scans?</h4>
                    <p className='text-slate-500 text-sm mt-2 px-4'>Organizations and Schools can contact us for custom bulk licensing.</p>
                    <button className='mt-6 font-bold text-blue-600 hover:underline'>Contact Sales</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileDetails;