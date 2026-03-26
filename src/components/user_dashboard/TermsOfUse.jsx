import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ShieldCheck, Scale, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const TermsOfUse = () => {

  const [terms, setTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const termsFunction = async () => {
    const token = localStorage.getItem('token')
    let userId
    if (token) {
      const decoded = jwtDecode(token)
      userId = decoded.userId
    } else {
      window.location.href = '/login'
    }
    setIsLoading(true)
    try {
      const response = await axios.put('/terms', {
        userId: userId
      })

      const adminStatus = response.data.user?.isAdmin;

      if (adminStatus === true) {
        window.location.href = `/admin/dashboard`;
      } else {
        window.location.href = `/dashboard`;
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const termsFunction = async () => {
      const token = localStorage.getItem('token')
      let userId
      if (token) {
        const decoded = jwtDecode(token)
        userId = decoded.userId
      } else {
        window.location.href = '/login'
      }
      try {
        const response = await axios.get(`/terms/${userId}`)
        if(response.data){
          setTerms(response.data.user.terms)
          setMessage(response.data.message)
        }
      } catch (err) {
        console.log(err)
        toast.error(err?.response?.data?.message)
      }
    }
    termsFunction()
  })

  return (
    <div className='w-full max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500 pb-20 pt-10 px-4 md:px-0 '>

      {/* 1. Page Header */}
      <div className='text-center space-y-3'>
        <div className='inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-2xl mb-2'>
          <ShieldCheck size={32} />
        </div>
        <h1 className='text-3xl md:text-4xl font-black text-slate-900'>Terms of Use</h1>
        <p className='text-slate-500 max-w-xl mx-auto text-sm md:text-base'>
          Guidelines for academic integrity and system usage at Federal University of Kashere.
        </p>
        <div className='text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2'>
          Last Updated: March 2026 • Project Version 1.0
        </div>
      </div>

      {/* 2. Main Content Cards */}
      <div className='grid grid-cols-1 gap-6'>

        {/* Academic Integrity Section */}
        <div className='bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4'>
          <div className='flex items-center gap-3 text-slate-900'>
            <Scale className='text-blue-600' size={24} />
            <h3 className='font-bold text-xl'>1. Academic Integrity</h3>
          </div>
          <p className='text-slate-600 text-sm leading-relaxed'>
            NuradPlag is designed to support the <strong>FUK Academic Integrity Policy</strong>. Users must not use this tool to circumvent original research requirements. The system is an aid for verification, not a substitute for scholarly effort.
          </p>
          <ul className='space-y-3 pt-2'>
            <TermItem text="You agree to submit only your original work or work you have permission to scan." />
            <TermItem text="Manipulation of text to bypass detection (hidden characters, etc.) is strictly prohibited." />
          </ul>
        </div>

        {/* Data Privacy Section */}
        <div className='bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4'>
          <div className='flex items-center gap-3 text-slate-900'>
            <Lock className='text-emerald-600' size={24} />
            <h3 className='font-bold text-xl'>2. Data Privacy & Storage</h3>
          </div>
          <p className='text-slate-600 text-sm leading-relaxed'>
            All documents uploaded to NuradPlag are encrypted. As a final year project implementation:
          </p>
          <div className='bg-slate-50 p-4 rounded-2xl border border-slate-100'>
            <p className='text-xs text-slate-500 italic'>
              "Documents are temporarily stored for analysis and are not shared with third-party databases without explicit institutional consent from the University authorities."
            </p>
          </div>
        </div>

        {/* Prohibited Use Section */}
        <div className='bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-slate-900'>
          <div className='flex items-center gap-3'>
            <AlertCircle className='text-rose-500' size={24} />
            <h3 className='font-bold text-xl'>3. Prohibited Use</h3>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600'>
            <div className='p-4 bg-rose-50/50 rounded-2xl border border-rose-100'>
              <strong>Commercial Use:</strong> This project version is for academic use at FUK only. Selling access is prohibited.
            </div>
            <div className='p-4 bg-rose-50/50 rounded-2xl border border-rose-100'>
              <strong>Botting:</strong> Automated scanning or "scraping" of the NuradPlag interface is disallowed.
            </div>
          </div>
        </div>

        {/* Accepted Terms and Conditions */}
        {terms &&
          <div className='bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-slate-900'>
            <div className='flex items-center gap-3 w-full'>
              <CheckCircle2 className='text-green-500' size={24} />
              <h3 className='font-bold text-xl'>Terms and Conditions Accepted</h3>
            </div>
            <div className='gap-4 text-sm text-slate-600 w-full'>
              <div className='p-4 bg-rose-50/50 rounded-2xl border border-rose-400 w-full'>
                <strong>{message && message}</strong>
              </div>
            </div>
          </div>
        }

      </div>

      {/* 3. Acceptance Footer */}
      <div className='bg-slate-900 rounded-3xl p-8 text-white text-center space-y-6'>
        <h4 className='text-xl font-bold'>Acknowledge Guidelines</h4>
        <p className='text-slate-400 text-sm max-w-md mx-auto'>
          By continuing to use NuradPlag, you confirm that you are a registered student/staff of FUK and agree to abide by these terms.
        </p>
        <div className='flex justify-center'>
          <button disabled={terms} className={`${terms ? 'bg-emerald-500' : 'bg-red-500'} hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95`}  onClick={termsFunction}>
            {isLoading ?
              <p className='animate-spin '><Loader2 /></p>
              :
              terms ? 'Terms Accepted' : 'I Accept & Understand'
            }

          </button>
        </div>
      </div>

    </div>
  );
};

// Helper component for bullet points
const TermItem = ({ text }) => (
  <li className='flex items-start gap-3'>
    <CheckCircle2 className='text-emerald-500 shrink-0 mt-0.5' size={18} />
    <span className='text-slate-600 text-sm font-medium'>{text}</span>
  </li>
);

export default TermsOfUse;