import { useContext, useState } from "react";
import { AppContext } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { X, Mail, ShieldAlert, Loader2 } from "lucide-react";

const UpdateEmail = () => {
  const { setIsEditEmail, setIsLoading, isLoading, setCurrentUser } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!email || !confirmEmail) return;
    
    if (email !== confirmEmail) {
      return toast.error('Emails do not match');
    }

    setIsLoading(true);
    try {
      const response = await axios.put(`/update/email`, {
        email: email
      });

      toast.success(response.data.message || "Email updated successfully");
      localStorage.removeItem('token')
      setCurrentUser(null)
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update email");
    } finally {
      setIsEditEmail(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 1. Backdrop with Glass Effect */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={() => setIsEditEmail(false)} 
      />

      {/* 2. Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                <Mail size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-xl">Change Email</h3>
          </div>
          <button 
            onClick={() => setIsEditEmail(false)}
            className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form className="p-8 space-y-6" onSubmit={handleUpdateEmail}>
          
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">New Email Address</label>
              <input 
                type="email" 
                id='email' 
                placeholder="new.email@example.com" 
                required 
                onChange={(e) => setEmail(e.target.value.trim())} 
                className="w-full font-semibold p-3.5 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none rounded-2xl transition-all" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirm-email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Confirm New Email</label>
              <input 
                type="email" 
                id='confirm-email' 
                required 
                placeholder="Confirm your new email" 
                onChange={(e) => setConfirmEmail(e.target.value.trim())} 
                className="w-full font-semibold p-3.5 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none rounded-2xl transition-all" 
              />
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
             <ShieldAlert size={18} className="text-amber-600 mt-0.5 shrink-0" />
             <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
               For security, updating your email may require you to log in again. Ensure you have access to the new inbox to verify your account.
             </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "Update Email Address"
              )}
            </button>
            
            <button 
              type="button" 
              className="w-full h-14 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-[0.98]" 
              onClick={() => setIsEditEmail(false)} 
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateEmail;