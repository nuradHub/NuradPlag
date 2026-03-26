import { useContext, useState } from "react";
import { AppContext } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { X, Mail, ShieldCheck, Loader2, Send } from "lucide-react";

const UpdatePassword = () => {
  const { setIsEditEmail, setIsLoading, isLoading, setIsUpdatePassword, setCurrentUser } = useContext(AppContext);
  const [email, setEmail] = useState('');

  const handleSendResetLink = async (e) => {
    setIsLoading(true);
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post(`/reset-link`, {
        email: email
      })
      if (response.data) toast.success(response?.data?.message)
      setEmail('')
      localStorage.removeItem('token')
      setCurrentUser(null)
    } catch (err) {
      console.log(err.message)
      toast.error(err?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* 1. Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsEditEmail(false)}
      />

      {/* 2. Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-xl">Reset Password</h3>
          </div>
          <button
            onClick={() => setIsEditEmail(false)}
            className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 transition-colors"
          >
            <X size={20} onClick={()=> setIsUpdatePassword(false)} />
          </button>
        </div>

        {/* Form Body */}
        <form className="p-8 space-y-6" onSubmit={handleSendResetLink}>

          <div className="space-y-2">
            <p className="flex flex-col items-start gap-1 text-sm text-slate-500 leading-relaxed">
              Enter your email address and we'll send you a link to reset your password.
               <span className="text-xs text-red-700 italic">Note: you will be redirected back to login after reset</span>
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  id='email'
                  placeholder="name@fukashere.edu.ng"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  className="w-full font-semibold pl-12 p-3.5 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none rounded-2xl transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full h-14 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Reset Link</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="w-full h-14 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-[0.98]"
              onClick={() => setIsUpdatePassword(false)}
            >
              Back to Safety
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;