import { Link } from "react-router-dom";
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { Home, User2, Send, LifeBuoy, Zap, Clock } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Footer from "./Footer";
import { useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

const Support = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSupportMessage = async (e)=> {
    e.preventDefault()
    setIsLoading(true)
    try{
      const response = await axios.post('/inquiry', {
        fullname: fullname,
        email: email,
        message: message
      })
      if(response.data){
        toast.success(response.data.message)
      }
    }catch(err){
      console.log(err)
      toast.error(err.response?.data?.message)
    }finally{
      setIsLoading(false)
    }
  } 

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen overflow-x-hidden selection:bg-indigo-100">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 md:px-12">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-slate-900 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <img src="/img/nplag-white.png" alt="Logo" className="w-5" />
          </div>
          <span className="font-black text-slate-900 tracking-tight text-lg">NuradSupport</span>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <Link to='/dashboard' className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all">
              <Home size={18} /> <span className="hidden md:inline">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to='/dashboard/profile' className="bg-slate-900 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
              <User2 size={18} /> <span className="hidden md:inline">My Profile</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Header */}
      <div className="relative z-10 pt-12 pb-6 text-center px-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-indigo-100">
          <LifeBuoy size={14} className="animate-spin-slow" /> NuradPlag Support
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
          How can we help <span className="text-indigo-600">you</span> today?
        </h1>
        <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
          Whether you’re facing a technical hurdle, need system guidance, or want to suggest a new integrity feature, our academic support squad is ready to assist.
        </p>
      </div>

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-3 py-12 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left Side: Stats & Lottie */}
        <div className="w-full lg:w-5/12 flex flex-col gap-8 order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
             {[
               { icon: <Clock className="text-orange-500" />, label: "Avg Response", val: "< 24 hrs" },
               { icon: <Zap className="text-yellow-500" />, label: "Resolution", val: "99.2%" }
             ].map((item, i) => (
               <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                 <div className="bg-slate-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">{item.icon}</div>
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{item.label}</p>
                 <p className="text-2xl font-black text-slate-900">{item.val}</p>
               </div>
             ))}
          </div>

          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <LifeBuoy size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Need a faster answer?</h3>
              <p className="text-indigo-100 font-medium mb-6">Check our knowledge base for instant solutions to common problems.</p>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg">
                Browse Documentation
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <DotLottieReact
              src="/img/support.lottie"
              loop
              autoplay
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Right Side: The Contact Form */}
        <div className="w-full lg:w-7/12 order-1 lg:order-2">
          <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 p-5 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-liner-to-r from-indigo-500 via-blue-500 to-indigo-500"></div>
            
            <form className="space-y-8" onSubmit={handleSupportMessage} method="POST" autoComplete="on">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 mb-2 block group-focus-within:text-indigo-600 transition-colors">Your Identity</label>
                  <input
                    onChange={(e)=> setFullname(e.target.value.trim())}
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-4 text-slate-900 font-semibold focus:border-indigo-500/20 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:outline-none transition-all"
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 mb-2 block group-focus-within:text-indigo-600 transition-colors">Communication Path</label>
                  <input
                    onChange={(e)=> setEmail(e.target.value.trim())}
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-4 text-slate-900 font-semibold focus:border-indigo-500/20 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 mb-2 block group-focus-within:text-indigo-600 transition-colors">How can we solve your issue?</label>
                <textarea
                  onChange={(e)=> setMessage(e.target.value.trim())}
                  placeholder="Tell us everything..."
                  className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-4 text-slate-900 font-semibold h-44 focus:border-indigo-500/20 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className="w-full group flex items-center justify-center gap-3 bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-2xl shadow-slate-900/20 hover:shadow-indigo-500/30 overflow-hidden relative"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-25 -translate-x-full group-hover:animate-shimmer"></div>
                {isLoading ? 'Sending...' : 'Send Message'}
                <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
              </button>
            </form>

            {/* Support Info */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                {[
                  { icon: <SiFacebook />, link: "https://www.facebook.com/nurudeen.ajao.376" },
                  { icon: <SiX />, link: "https://x.com/nuradDev" },
                  { icon: <SiInstagram />, link: "https://www.instagram.com/nuradhub" },
                  { icon: <FaLinkedin />, link: "#" }
                ].map((social, i) => (
                  <Link key={i} to={social.link} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100">
                    {social.icon}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-slate-600 text-sm font-bold tracking-tight">nuradplag@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(300%) skewX(-25deg); }
        }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
      `}} />
    </div>
  );
};

export default Support;