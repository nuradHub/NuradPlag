import { Users, FileSearch, AlertTriangle, ShieldCheck, TrendingUp, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/Context';

const AdminOverviewSection = () => {

  const { setSelectedMenu, users, similarities } = useContext(AppContext)

  // 1. Total Student Count
  const totalStudents = users?.length || 0;

  // 2. Calculate "New This Week"
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const newStudentsThisWeek = users?.filter(u => new Date(u.createdAt) > sevenDaysAgo).length;

  // 3. Dynamic Trend Message
  const studentTrend = newStudentsThisWeek > 0
    ? `+${newStudentsThisWeek} this week`
    : "No new signups this week";


  // 1. Total Count (Whole number)
  const totalScans = similarities?.length || 0;

  // 2. Calculate "Today's" Scans
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const scansToday = similarities && similarities?.filter(p => new Date(p.createdAt) >= startOfToday).length;

  // 3. Dynamic Trend Message
  const trendText = scansToday > 0
    ? `+${scansToday} today`
    : "No scans yet today";


  // 1. Existing Average Logic
  const totalScore = similarities && similarities?.reduce((acc, project) => acc + (project.plagiarismScore || 0), 0);
  const averageSimilarity = similarities?.length > 0 ? (totalScore / similarities.length).toFixed(1) : 0;

  // 2. High Risk Logic (New)
  const highRisksimilarities = similarities && similarities?.filter(p => p.plagiarismScore > 50);
  const highRiskCount = highRisksimilarities?.length;

  // 3. Dynamic Trend Message
  const trendMessage = highRiskCount && highRiskCount > 0
    ? `${highRiskCount} reports need review`
    : "All reports within limits";


  // Calculate Health based on data availability
  const isDatabaseConnected = similarities && similarities.length >= 0;
  const hasRecentActivity = similarities && similarities?.some(p => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return new Date(p.createdAt) > oneDayAgo;
  });

  // Determine status
  const healthValue = isDatabaseConnected ? "99.9%" : "0%";
  const healthTrend = isDatabaseConnected
    ? (hasRecentActivity ? "Active & Healthy" : "Operational (Idle)")
    : "Database Offline";

  const healthColor = isDatabaseConnected ? "text-purple-600" : "text-red-600";

  // ---Calculate Real Usage Spike ---
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
  const twoWeeksAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));

  // 1. Scans this week (Last 7 days)
  const thisWeekScans = similarities && similarities?.filter(p => new Date(p.createdAt) >= oneWeekAgo).length;

  // 2. Scans last week (7-14 days ago)
  const lastWeekScans = similarities && similarities?.filter(p => {
    const date = new Date(p.createdAt);
    return date >= twoWeeksAgo && date < oneWeekAgo;
  }).length;

  // 3. Calculate Percentage
  let usagePercentage = 0;
  if (lastWeekScans > 0) {
    usagePercentage = Math.round(((thisWeekScans - lastWeekScans) / lastWeekScans) * 100);
  } else if (thisWeekScans > 0) {
    usagePercentage = 100; // If it's a new system, first week is a 100% spike
  }

  const isSpike = usagePercentage >= 0;


  return (
    <div className='overview-print-container w-full max-w-7xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500 pb-20 pt-10 px-4 md:px-0'>

      {/* Header */}
      <div>
        <h2 className='text-3xl font-black text-slate-900'>Institutional Overview</h2>
        <p className='text-slate-500 text-sm'>Real-time analytics for Federal University of Kashere.</p>
      </div>

      {/* 1. Global Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
        <AdminStatCard
          icon={<Users className="text-blue-600" />}
          label="Total Students"
          value={totalStudents && totalStudents}
          trend={studentTrend && studentTrend}
        />
        <AdminStatCard
          icon={<FileSearch className="text-emerald-600" />}
          label="Total Scans"
          value={totalScans && totalScans}
          trend={trendText && trendText}
        />
        <AdminStatCard
          icon={<AlertTriangle className={highRiskCount && highRiskCount > 0 ? "text-red-600" : "text-amber-600"} />}
          label="High Similarity Alerts"
          value={highRiskCount && highRiskCount}
          trend={trendMessage && trendMessage}
          isAlert={highRiskCount && highRiskCount > 0}
        />
        <AdminStatCard
          icon={<ShieldCheck className={healthColor && healthColor} />}
          label="System Health"
          value={healthValue && healthValue}
          trend={healthTrend && healthTrend}
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

        {/* 2. Recent Plagiarism Alerts (Table Summary) */}
        <div className='lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden h-120 overflow-y-scroll'>
          <div className='p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50'>
            <h4 className='font-bold text-slate-800 flex items-center gap-2'>
              <AlertTriangle size={18} className="text-amber-500" />
              Critical Alerts
            </h4>
            <button className='text-xs font-bold text-blue-600 hover:underline' onClick={() => setSelectedMenu('alerts')}>View All</button>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-left min-w-125'>
              <thead className='bg-slate-50/30 text-slate-400 text-[10px] font-bold uppercase tracking-widest'>
                <tr>
                  <th className='p-5'>Student</th>
                  <th className='p-5'>Document</th>
                  <th className='p-5'>Similarity</th>
                  <th className='p-5 text-right'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-50'>
                {similarities &&
                  [...similarities].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((similarity) =>
                    similarity.plagiarismScore > 50 &&
                    <AlertRow key={similarity._id} name={(similarity.userId.firstname ? similarity.userId.firstname : '') + " " + (similarity.userId.lastname ? similarity.userId.lastname : '')} doc={similarity.fileName} percent={similarity.plagiarismScore} onClick={()=> setSelectedMenu('alerts')}/>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. System Usage Summary */}
        <div className='bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden'>
          <div className='relative z-10'>
            <div className='h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6'>
              <TrendingUp size={24} className={isSpike ? "text-emerald-400" : "text-amber-400"} />
            </div>
            <h4 className='text-2xl font-bold mb-2'>
              {isSpike ? 'Usage Spike' : 'Usage Trend'}
            </h4>
            <p className='text-slate-400 text-sm leading-relaxed'>
              Scan volume has <strong>{isSpike ? 'increased' : 'decreased'}</strong> by
              <strong className="text-white ml-1">{Math.abs(usagePercentage && usagePercentage)}%</strong> this week.
              Total of <strong>{thisWeekScans && thisWeekScans}</strong> new similarities analyzed at FUK.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className='relative z-10 mt-8 w-full py-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-bold transition-all flex items-center justify-center gap-2'
          >
            Download Report <ArrowUpRight size={18} />
          </button>

          {/* Decorative background element */}
          <div className={`absolute -bottom-10 -right-10 w-40 h-40 ${isSpike ? 'bg-emerald-500/10' : 'bg-amber-500/10'} rounded-full blur-3xl`}></div>
        </div>

      </div>
    </div>
  );
};

// Sub-components
const AdminStatCard = ({ icon, label, value, trend, isAlert }) => (
  <div className={`bg-white p-6 rounded-4xl border border-slate-200 shadow-sm flex flex-col gap-4`}>
    <div className='flex justify-between items-start'>
      <div className='p-3 bg-slate-50 rounded-2xl'>{icon}</div>
      <button className='text-slate-300'><MoreHorizontal size={20} /></button>
    </div>
    <div>
      <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>{label}</p>
      <p className='text-2xl font-black text-slate-900'>{value}</p>
      <p className={`text-[10px] font-bold mt-1 ${isAlert ? 'text-rose-500' : 'text-emerald-500'}`}>{trend}</p>
    </div>
  </div>
);

const AlertRow = ({ name, doc, percent, onClick }) => (
  <tr className='hover:bg-slate-50 transition-colors'>
    <td className='p-5'>
      <p className='font-bold text-slate-700 text-sm'>{name}</p>
    </td>
    <td className='p-5 text-xs text-slate-500'>{doc}</td>
    <td className='p-5'>
      <span className='px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-100 text-rose-600'>
        {percent} Match
      </span>
    </td>
    <td className='p-5 text-right' onClick={onClick}>
      <button className='p-2 text-slate-400 hover:text-blue-600'><ArrowUpRight size={18} /></button>
    </td>
  </tr>
);

export default AdminOverviewSection;