import { MapPin, Clock, Mail, ShieldCheck } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-200 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Section 1: Hero Call to Action */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <div className='flex items-center justify-center p-3 bg-slate-800 rounded-2xl shadow-lg'>
             <img src="/img/nplag-white.png" alt="Nurad Plag Logo" className="w-12 h-12 object-contain" />
          </div>
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Achieve <span className="text-emerald-500">World-Class</span> Academic Writing
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Join the growing community of researchers and students who trust 
              <span className="text-blue-400 font-semibold"> Nuradhub</span> to refine and protect their work every day.
            </p>
          </div>
        </div>

        <hr className="border-slate-800 mb-12" />

        {/* Section 2: Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: About */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" /> Nuradplag
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Advanced project submission and plagiarism detection system. 
              Ensuring academic integrity with precision and speed.
            </p>
            <div className="flex gap-4 pt-2">
               <Link to='https://www.facebook.com/nurudeen.ajao.376' className="hover:scale-110 transition-transform">
                  <SiFacebook size={22} className="text-slate-400 hover:text-blue-500" />
               </Link>
               <Link to='https://www.instagram.com/nuradhub' className="hover:scale-110 transition-transform">
                  <SiInstagram size={22} className="text-slate-400 hover:text-pink-500" />
               </Link>
               <Link to='https://x.com/nuradDev' className="hover:scale-110 transition-transform">
                  <SiX size={20} className="text-slate-400 hover:text-white" />
               </Link>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <span className="text-slate-400">First Gate Zone 1, Dutse Alhaji, Abuja</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <a href="mailto:nuradplag@gmail.com" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  nuradplag@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-lg font-semibold text-white">Opening Hours</h4>
            <div className="flex items-start gap-3 text-sm">
              <Clock size={18} className="text-emerald-500 shrink-0" />
              <div className="flex flex-col text-slate-400">
                <span>Mon - Fri: 9:00 am - 8:00 pm</span>
                <span>Sat - Sun: 9:00 am - 10:00 pm</span>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
               <Link to='/register' className="text-xs font-semibold uppercase tracking-widest text-blue-400 hover:text-emerald-400 transition-colors">Register</Link>
               <span className="text-slate-700">|</span>
               <Link to='/login' className="text-xs font-semibold uppercase tracking-widest text-blue-400 hover:text-emerald-400 transition-colors">Log In</Link>
            </div>
          </div>
        </div>

        {/* Section 3: Fine Print Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-xs text-slate-500">
              &copy; 2026 <span className="text-slate-300 font-medium">Nuradhub</span>. All rights reserved.
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500/60 font-bold">
              Designed by Nuradhub
            </p>
          </div>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest text-slate-500">
            <Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;