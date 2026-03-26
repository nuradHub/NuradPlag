import { UserPlus, Building, Shield, Activity, MoreVertical, Search, FileLock2, ExternalLink, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios'

const OrganizationPage = () => {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const adminFunction = async () => {
      try {
        const response = await axios.get('/admins')
        if (response) {
          setMembers(response.data)
        }
      } catch (err) {
        console.log(err)
        toast.error(err?.response?.data?.message)
      }
    }
    adminFunction()
  }, [])

  return (
    <div className='max-w-6xl mx-auto flex flex-col gap-6 md:gap-8 animate-in fade-in duration-500 pb-10 pt-10 px-4 md:px-6'>

      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div className='min-w-0'>
          <h3 className='text-2xl md:text-3xl font-extrabold text-slate-900'>Organization</h3>
          <p className='text-slate-500 text-sm'>Administrative hub for FUK.</p>
        </div>
        <button className='w-full md:w-auto flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all'>
          <UserPlus size={18} /> <span>Invite Admin</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
        <StatCard icon={<Building className="text-blue-600" />} label="Institution" value="FUK, Gombe State" />
        <StatCard icon={<ShieldCheck className="text-emerald-600" />} label="Management" value={`${members.length} Admins`} />
        <StatCard icon={<Activity className="text-amber-600" />} label="License" value="Active" />
      </div>

      {/* Members List Section */}
      <div className='bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden'>
        {/* Table Header */}
        <div className='p-4 md:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30'>
          <h4 className='font-bold text-slate-800 text-sm md:text-base'>Administrative Access</h4>
          <div className='relative hidden sm:block'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
            <input type="text" placeholder="Search admins..." className='pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20' />
          </div>
        </div>

        {/* Scrollable Table Wrapper */}
        <div className='w-full overflow-x-auto bg-white'>
          <table className='w-full text-left border-collapse'>
            <thead className='bg-slate-50/50 text-slate-400'>
              <tr>
                <th className='p-4 md:p-5 text-[10px] font-bold uppercase tracking-widest'>Official</th>
                <th className='p-4 md:p-5 text-[10px] font-bold uppercase tracking-widest hidden md:table-cell'>Clearance</th>
                <th className='p-4 md:p-5 text-[10px] font-bold uppercase tracking-widest'>Status</th>
                <th className='p-4 md:p-5 text-[10px] font-bold uppercase tracking-widest text-right'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-50'>
              {members ? (
                members.map((member) => (
                  <tr key={member._id} className='hover:bg-slate-50/50 transition-colors group'>
                    <td className='p-4 md:p-5'>
                      <div className='flex items-center gap-3 min-w-0'>
                        <div className={`h-10 w-10 overflow-clip rounded-full flex items-center justify-center font-bold text-xs uppercase ${member.role === 'owner' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {member.firstname.split('')[0]}
                        </div>
                        <div className='min-w-0'>
                          <p className='font-bold text-slate-700 text-xs md:text-sm truncate w-32 md:w-auto'>{member.firstname}</p>
                          <p className='text-[10px] md:text-xs text-slate-400 truncate w-32 md:w-auto'>{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className='p-4 md:p-5 hidden md:table-cell'>
                      <div className='flex items-center gap-2'>
                        <Shield size={14} className={member.role === 'owner' ? "text-rose-500" : "text-blue-500"} />
                        <span className='text-sm font-semibold text-slate-600'>{member.role}</span>
                      </div>
                    </td>
                    <td className='p-4 md:p-5'>
                      <span className='inline-flex px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase bg-emerald-100 text-emerald-600'>
                        {(new Date() - new Date(member.updatedAt)) > 3600000 ?
                          <span className={`text-red-700 p-1 px-4 text-xs rounded-md`}>Risk </span>
                          : <span className={`text-green-700 p-1 px-4 text-xs rounded-md`}>Active</span>}
                      </span>
                    </td>
                    <td className='p-4 md:p-5 text-right'>
                      <button className='p-2 text-slate-300 hover:text-slate-600 transition-all'>
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-slate-400 text-sm">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institutional Compliance Section - Updated for Final Year Project */}
      <div className='bg-slate-100/50 rounded-3xl p-4 md:p-8 border border-slate-200 mx-1 md:mx-0'>
        <div className='flex flex-col md:flex-row items-start gap-4'>
          <div className='p-3 bg-white rounded-2xl shadow-sm text-slate-400 hidden md:block'>
            <FileLock2 size={24} />
          </div>
          <div className='flex-1'>
            <h4 className='font-bold text-slate-900 text-sm md:text-base flex items-center gap-2'>
              <ShieldCheck size={18} className="md:hidden text-emerald-500" />
              Academic Policy Alignment
            </h4>
            <p className='text-[11px] md:text-sm text-slate-500 mt-2 leading-relaxed'>
              This system is developed as a final year project for <strong>Federal University of Kashere (FUK)</strong>.
              It is designed to uphold the university's standards of academic integrity.
              User data and scan results are handled according to the project's internal data protection protocols.
            </p>
            <div className='flex flex-wrap gap-x-4 gap-y-2 mt-4 md:mt-6'>
              <button className='text-[10px] md:text-xs font-bold text-slate-600 hover:underline flex items-center gap-1'>
                System Manual <ExternalLink size={10} />
              </button>
              <button className='text-[10px] md:text-xs font-bold text-slate-600 hover:underline flex items-center gap-1'>
                Project Documentation <ExternalLink size={10} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className='bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4'>
    <div className='p-3 bg-slate-50 rounded-2xl shrink-0'>{icon}</div>
    <div className='min-w-0'>
      <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate'>{label}</p>
      <p className='text-sm md:text-lg font-black text-slate-900 truncate'>{value}</p>
    </div>
  </div>
);

export default OrganizationPage;