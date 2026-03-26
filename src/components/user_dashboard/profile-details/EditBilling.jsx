import { useContext, useState } from "react";
import { AppContext } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { X, CreditCard, MapPin, Loader2 } from "lucide-react";

const EditBilling = () => {
  const { setIsEditBilling, setIsLoading, isLoading, currentUser, getUserProfile } = useContext(AppContext);
  
  const [country, setCountry] = useState(currentUser?.data?.country || '');
  const [address, setAddress] = useState(currentUser?.data?.address || '');
  const [city, setCity] = useState(currentUser?.data?.city || '');
  const [zipcode, setZipcode] = useState(currentUser?.data?.zipcode || '');

  const handleUpdateBilling = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(`/update/profile`, {
        country,
        address,
        city,
        zipcode
      });
      toast.success(response.data.message || "Billing info updated!");
      getUserProfile()
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setIsEditBilling(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      {/* 1. Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={() => setIsEditBilling(false)} 
      />

      {/* 2. Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        
        {/* Header - More compact */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600">
                <CreditCard size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg md:text-xl">Billing Details</h3>
          </div>
          <button 
            onClick={() => setIsEditBilling(false)}
            className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body - Scrollable on very small screens */}
        <form className="p-5 md:p-8 space-y-4 overflow-y-auto" onSubmit={handleUpdateBilling}>
          
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {/* Country */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Country</label>
              <input 
                type="text" 
                value={country}
                required 
                onChange={(e) => setCountry(e.target.value)} 
                className="w-full font-semibold p-3 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:outline-none rounded-xl transition-all text-sm" 
              />
            </div>
            
            {/* Address */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Address</label>
              <input 
                type="text" 
                value={address}
                required 
                onChange={(e) => setAddress(e.target.value)} 
                className="w-full font-semibold p-3 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:outline-none rounded-xl transition-all text-sm" 
              />
            </div>

            {/* City */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">City</label>
              <input 
                type="text" 
                value={city}
                required 
                onChange={(e) => setCity(e.target.value)} 
                className="w-full font-semibold p-3 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:outline-none rounded-xl transition-all text-sm" 
              />
            </div>

            {/* Zip */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Zip Code</label>
              <input 
                type="text" 
                value={zipcode}
                required 
                onChange={(e) => setZipcode(e.target.value)} 
                className="w-full font-semibold p-3 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:outline-none rounded-xl transition-all text-sm" 
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-2xl border border-blue-100/50">
             <MapPin size={14} className="text-blue-500 mt-0.5 shrink-0" />
             <p className="text-[10px] text-blue-600 font-medium leading-tight">
               Billing info is required for official FUK research scan receipts.
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
                "Save Billing"
              )}
            </button>
            
            <button 
              type="button" 
              className="w-full md:w-auto px-8 h-12 md:h-14 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 transition-all order-2 md:order-1" 
              onClick={() => setIsEditBilling(false)} 
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditBilling;