import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FileUp, Globe, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const LandingPage = () => {

  return (
    <div className='bg-slate-950 min-h-screen font-sans selection:bg-emerald-500/30 overflow-x-hidden text-slate-200'>

      {/* 1. Navigation - Blue Tinted Glass */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-3 py-4">
          <div className="flex items-center gap-2">
            <img src="/img/nplag-white.png" alt="Logo" className="w-10" />
            <span className="text-white font-bold text-xl tracking-tight hidden sm:block">NuradPlag</span>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <Link to='/login' className='text-slate-400 font-semibold hover:text-emerald-400 transition-colors text-sm'>Log in</Link>
            <Link to='/register' className='bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1 rounded-lg transition-all shadow-lg shadow-blue-500/20 text-sm'>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section - Emerald & Blue Accents */}
      <section className='pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12'>
        <div className='flex-1 space-y-8 text-center lg:text-left'>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={14} /> AI-Powered Integrity
          </div>
          <h1 className='text-4xl md:text-6xl font-extrabold text-white leading-[1.1]'>
            Scan for Plagiarism with <span className="text-emerald-500">Precision.</span>
          </h1>
          <p className='text-base md:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
            Protect your research with <span className='text-blue-400 font-semibold'>NuradPlag</span>. Our dual-engine system detects both copied content and AI-generated text in real-time.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4'>
            <Link to='/login' className='bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all group shadow-xl shadow-emerald-900/20'>
              Start Scanning <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to='/register' className='bg-slate-800 border border-slate-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-700 transition-all'>
              Sign Up Free
            </Link>
          </div>
        </div>

        <div className='flex-1 w-full lg:max-w-xl relative'>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]"></div>
          <DotLottieReact src="/img/lote.lottie" loop autoplay className="relative z-10 w-full" />
        </div>
      </section>

      {/* 3. Features Section - Slate & Emerald */}
      <section className='bg-slate-900/50 py-24 border-y border-white/5'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <FeatureCard
              icon={<FileUp className="text-emerald-400" size={32} />}
              title="Upload with Ease"
              desc="Analyze research papers by simply pasting text or dragging and dropping files."
            />
            <FeatureCard
              icon={<Globe className="text-blue-400" size={32} />}
              title="Global Comparison"
              desc="Cross-reference against billions of web pages and academic databases."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-emerald-400" size={32} />}
              title="Originality Insights"
              desc="Receive a comprehensive Authenticity Score for your unique ideas."
            />
            <FeatureCard
              icon={<Sparkles className="text-blue-400" size={32} />}
              title="Smart Citations"
              desc="Elevate your writing with AI-powered suggestions and actionable feedback."
            />
          </div>
        </div>
      </section>

      {/* 4. Workflow Section - Blue/Green Mix */}
      <section className='py-24 px-6 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16'>
        <div className='flex-1'>
          <div className='relative'>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
            <DotLottieReact src="/img/lote-2.lottie" loop autoplay className="relative z-10 min-w-sm w-full" />
          </div>
        </div>
        <div className='flex-1 space-y-6'>
          <h2 className='font-bold text-3xl md:text-4xl text-white leading-tight'>
            Streamline Your Workflow <br /><span className="text-blue-400">from Start to Finish</span>
          </h2>
          <p className='text-slate-400 leading-relaxed'>
            Nurad Docs supports your entire creative process, utilizing real-time insights to help you produce clear, ethical, and high-impact writing.
          </p>
          <ul className="space-y-4 pt-4">
            {['Plagiarism & AI Detection', 'Verified Originality', 'Smart Citation Assistance'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-200 font-medium">
                <CheckCircle2 size={20} className="text-emerald-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. CTA Section - Deep Slate & Emerald Banner */}
      <section className='bg-linear-to-br from-slate-800 to-slate-900 border border-white/10 py-16 px-2 mx-4 rounded-[2.5rem] mb-20 overflow-hidden relative'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10'>
          <div className='flex-1 space-y-6 text-center md:text-left'>
            <h2 className='text-white font-extrabold text-1xl md:text-5xl uppercase'>
              Beyond the Scan: <br /><span className="text-emerald-400">Accelerate Progress</span>
            </h2>
            <div className='flex flex-wrap justify-center md:justify-start gap-4 text-emerald-100/60 text-sm font-mono'>
              <span>// SECURE</span>
              <span>// ACCURATE</span>
              <span>// FAST</span>
            </div>
            <Link to='/register' className="inline-block bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/40">
              Get Started Now
            </Link>
          </div>
          <div className='flex-1 w-full min-w-sm max-w-md'>
            <DotLottieReact src="/img/lote-3.lottie" loop autoplay className="w-full opacity-80" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className='p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-blue-500/30 transition-all group hover:-translate-y-2 shadow-xl'>
    <div className='mb-6 p-3 bg-slate-950 w-fit rounded-xl group-hover:bg-slate-800 transition-colors'>
      {icon}
    </div>
    <h3 className='text-white font-bold text-lg mb-3 tracking-wide'>{title}</h3>
    <p className='text-slate-400 text-sm leading-relaxed'>{desc}</p>
  </div>
);

export default LandingPage;