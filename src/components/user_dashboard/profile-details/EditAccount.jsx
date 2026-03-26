import { useContext, useState } from "react";
import { AppContext } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { X, User, CheckCircle2, Loader2 } from "lucide-react";

const EditAccount = () => {
  const { setIsEditAccount, currentUser, isLoading, setIsLoading, getUserProfile } = useContext(AppContext);
  
  const [firstname, setFirstname] = useState(currentUser?.data?.firstname || '');
  const [lastname, setLastname] = useState(currentUser?.data?.lastname || '');
  const [checked, setChecked] = useState(currentUser?.data?.isChecked || false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname) {
        return toast.warn("Please fill in all required fields");
    }
    
    setIsLoading(true);
    try {
      const response = await axios.put(`/update/profile`, {
        firstname,
        lastname,
        isChecked: checked
      });
      toast.success(response.data.message || "Profile updated successfully!");
      getUserProfile()
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsEditAccount(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      {/* 1. Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={() => setIsEditAccount(false)} 
      />

      {/* 2. Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600">
                <User size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg md:text-xl">Edit Profile</h3>
          </div>
          <button 
            onClick={() => setIsEditAccount(false)}
            className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body - Scrollable on mobile */}
        <form className="p-5 md:p-8 space-y-5 overflow-y-auto" onSubmit={handleUpdateProfile}>
          
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
              <label htmlFor="firstname" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">First Name</label>
              <input 
                type="text" 
                id='firstname' 
                value={firstname}
                placeholder="John" 
                required 
                onChange={(e) => setFirstname(e.target.value)} 
                className="w-full font-semibold p-3 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:outline-none rounded-xl transition-all text-sm" 
              />
            </div>

            <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
              <label htmlFor="lastname" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
              <input 
                type="text" 
                id='lastname' 
                value={lastname}
                placeholder="Doe" 
                required 
                onChange={(e) => setLastname(e.target.value)} 
                className="w-full font-semibold p-3 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:outline-none rounded-xl transition-all text-sm" 
              />
            </div>
          </div>

          {/* Marketing Checkbox - More compact for mobile */}
          <div 
            className={`flex gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer
              ${checked ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}
            onClick={() => setChecked(!checked)}
          >
            <div className={`mt-0.5 shrink-0 h-5 w-5 rounded flex items-center justify-center transition-colors
              ${checked ? 'bg-blue-600 text-white' : 'bg-white border-2 border-slate-300'}`}>
              {checked && <CheckCircle2 size={14} />}
            </div>
            <p className='text-slate-500 text-[10px] md:text-xs leading-relaxed font-medium select-none'>
              Receive FUK research updates, newsletters, and promotional offers for plagiarism scan credits.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-3 pt-2">
            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full md:flex-1 h-12 md:h-14 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center order-1 md:order-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Update Profile"
              )}
            </button>
            
            <button 
              type="button" 
              className="w-full md:w-auto px-8 h-12 md:h-14 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 transition-all order-2 md:order-1" 
              onClick={() => setIsEditAccount(false)} 
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditAccount;