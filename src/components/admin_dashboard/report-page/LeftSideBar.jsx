import React, { useContext, useState } from 'react';
import { FileText, CheckCircle, Globe, LayoutGrid, Check, MessageSquareWarning } from 'lucide-react';
import { AppContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import ApproveProject from './ApproveProject';
import RejectProject from './RejectProject';

const LeftSideBar = ({projectId, report, reportRef}) => {

  const {setSelectedMenu, isApprove, setIsApprove, isRejected, setIsRejected} = useContext(AppContext)
  const navigate = useNavigate()
  const [active, setActive] = useState(false)

  return (
    <>
    {isApprove && <ApproveProject projectId={projectId} report={report.fileName} />}
    {isRejected && <RejectProject projectId={projectId} report={report} reportRef={reportRef} />}
    <aside className="h-full w-16 hover:w-60 bg-white border-r border-slate-200 flex-col py-6 transition-all duration-300 ease-in-out group z-20 shrink-0 overflow-hidden shadow-sm hidden lg:flex">
      <div className="flex items-center px-4 mb-10 gap-4">
        <img src="/img/nplag.png" className="w-8 min-w-8" alt="logo" />
        <span className="font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-lg">
          NuradPlag
        </span>
      </div>

      <nav className="flex flex-col gap-4 px-2">
        <NavItem icon={<FileText size={24} />} label="Full Report" active={true} />
        <NavItem icon={<CheckCircle size={24} />} label="Approved Project" onClick={()=> {setSelectedMenu('approved-projects'); navigate('/admin/dashboard')}} />
        <div className="h-px bg-slate-100 my-2 mx-2" />
        <NavItem icon={<Check size={24} />} label="Approve Project" onClick={()=> setIsApprove(true)} />
        <NavItem icon={<MessageSquareWarning size={24} />} label="Need's Revision"  onClick={()=> setIsRejected(true)}/>
        <NavItem icon={<LayoutGrid size={24} />} label="Dashboard" onClick={()=> {setSelectedMenu('overview'); navigate('/admin/dashboard')}}/>
      </nav>
    </aside>
    </>
   
  );
};

const NavItem = ({ icon, label, active=false, onClick }) => (
  <div onClick={onClick} className={`
    flex items-center gap-4 p-2 rounded-xl cursor-pointer transition-all
    ${active ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'}
  `}>
    <div className="min-w-8 flex justify-center">{icon}</div>
    <span className="font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {label}
    </span>
  </div>
);

export default LeftSideBar;