import { PageSkeleton } from '../PageSkeleton';
import Header from '../user_dashboard/Header';
import {
  FilePlus2, FolderHeart, Menu, Upload, Link2, Search, Check, Plus, FileDown, ArrowRight, LayoutGrid, List, Sparkles, Clock, FileText, Users, BarChart3, GraduationCap, AlertTriangle, ShieldCheck, ArrowUpRight, Loader2, Trash, XCircle
} from 'lucide-react';
import AsideMenu from '../AsideMenu';
import AdminOverviewSection from './AdminOverviewSection'
import { useEffect, useContext, useState } from 'react';
import SelectScannedFolder from '../user_dashboard/SelectScannedFolder';
import { AppContext } from '../context/Context';
import UploadPassport from '../user_dashboard/uploads/UploadPassport';
import axios from 'axios';
import FormatDate from '../../utils/FormatDate';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const navigate = useNavigate()

  const { selectedMenu, setSelectedMenu, isUpload, currentMenu, setCurrentMenu, detectPlagiarism, setDetectPlagiarism, detectAi, setDetectAi, isLoading, setIsLoading, viewMode, setViewMode, file, inputText, setInputText, inputUrl, setInputUrl, isScanning, textLength, setTextLenght, handleFileChange, handleExecuteScan, users, setUsers, projects, setProjects, setReport, adminProject, approved, setApproved, isReport, projectReportFunction, isReady, setIsReady, similarities, setSimilarities, handleDeleteProject, isDelete, setIsDelete, projectId, getProjectId, handleAllProjects, adminProjectFunction, rejected } = useContext(AppContext)

  const usersFunction = async () => {
    try {
      const response = await axios.get('/users')
      if (response.data) {
        setUsers(response.data)
      }
    } catch (err) {
      console.log(err)
      console.log(err?.response?.data?.message)
    }
  }

  useEffect(() => {
    setIsReady(true)
    const studentDatas = async () => {
      try {
        await adminProjectFunction()
        await handleAllProjects()
        await usersFunction()
      } catch (err) {
        console.log(err.message)
      } finally {
        setIsReady(false)
      }
    }
    studentDatas()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    if (!selectedMenu) setSelectedMenu('overview');
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PageSkeleton />;

  const navItemClass = (tag) => `
      flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all font-bold text-sm
      ${selectedMenu === tag
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}
  `;

  const tabClass = (active) => `
      flex items-center justify-center gap-2 text-[12px] md:text-sm font-bold cursor-pointer rounded-xl px-2 md:px-6 py-3 transition-all flex-1 md:flex-none
      ${active ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}
  `;

  const projectReport = async (projectId) => {
    const response = await projectReportFunction(projectId)
    setReport(response)
    navigate(`/admin/dashboard/report/${response._id}`)
  }

  return (
    <div className='flex flex-col w-full h-dvh bg-white md:bg-[#F8FAFC] overflow-hidden'>
      <Header />
      <AsideMenu />
      <SelectScannedFolder />
      {isUpload && <UploadPassport />}
      {isReport &&
        <div className='inset-0 bg-black/40 z-100 fixed flex items-center justify-center transition-all'>
          <div className='flex flex-col items-center gap-3'>
            <Loader2 size={40} className='animate-spin text-blue-600 shadow shadow-white-2xl rounded-4xl' />
            <h2 className='font-bold upper text-slate-900 animate-pulse'>Getting Report</h2>
          </div>
        </div>
      }

      <div className='flex flex-1 overflow-hidden relative'>

        {/* --- SIDEBAR --- */}
        <aside className='hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 gap-6 shrink-0 h-full overflow-y-auto'>
          <div className='flex items-center gap-2 mb-4'>
            <div className='p-2 bg-blue-600 rounded-lg'><ShieldCheck size={20} className="text-white" /></div>
            <span className="font-bold text-slate-900 text-xl tracking-tight">Admin Portal</span>
          </div>

          <nav className='flex flex-col gap-1.5'>
            <p className='text-[10px] uppercase tracking-widest text-slate-400 font-bold px-3 mb-2'>Institutional</p>
            <div className={navItemClass('overview')} onClick={() => setSelectedMenu('overview')}><BarChart3 size={20} /> Overview</div>
            <div className={navItemClass('students')} onClick={() => setSelectedMenu('students')}><Users size={20} /> Students</div>
            <div className={navItemClass('submitted-projects')} onClick={() => setSelectedMenu('submitted-projects')}><GraduationCap size={20} /> Submitted</div>
            <div className={navItemClass('approved-projects')} onClick={() => setSelectedMenu('approved-projects')}><GraduationCap size={20} /> Approved</div>
            <div className={navItemClass('rejected-projects')} onClick={() => setSelectedMenu('rejected-projects')}><XCircle size={20} /> Rejected</div>
            <div className={navItemClass('alerts')} onClick={() => setSelectedMenu('alerts')}><AlertTriangle size={20} /> Critical Alerts</div>

            <p className='text-[10px] uppercase tracking-widest text-slate-400 font-bold px-3 mt-4 mb-2'>Workspace</p>
            <div className={navItemClass('new-scan')} onClick={() => setSelectedMenu('new-scan')}><FilePlus2 size={20} /> New Scan</div>
            <div className={navItemClass('my-scan')} onClick={() => setSelectedMenu('my-scan')}><FolderHeart size={20} /> Admin Scans</div>
          </nav>
        </aside>

        <main className='flex-1 min-w-0 overflow-y-auto p-4 md:p-10 bg-white md:bg-[#F8FAFC] pb-10'>

          {selectedMenu === 'overview' && <AdminOverviewSection />}

          {/* SHARED WORKSPACE (Text, Files, URLs) */}
          {selectedMenu === 'new-scan' && (
            <div className='max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500'>
              <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
                <div>
                  <h1 className='text-3xl font-extrabold text-slate-900 mb-1'>New Admin Scan</h1>
                  <p className='text-sm text-slate-500'>Analyze academic integrity with university-level depth.</p>
                </div>
                <div className='flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200'>
                  <div className={tabClass(currentMenu === 'text')} onClick={() => setCurrentMenu('text')}><Menu size={16} /> <span>Text</span></div>
                  <div className={tabClass(currentMenu === 'files')} onClick={() => setCurrentMenu('files')}><Upload size={16} /> <span>Files</span></div>
                  <div className={tabClass(currentMenu === 'urls')} onClick={() => setCurrentMenu('urls')}><Link2 size={16} /> <span>URLs</span></div>
                </div>
              </div>

              {/* Workspace Card */}
              <div className='w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden'>
                <div className='bg-slate-50/50 border-b border-slate-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4'>
                  <div className='flex items-center gap-2'>
                    <div onClick={() => setDetectPlagiarism(!detectPlagiarism)} className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${detectPlagiarism ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600' : 'bg-white border-slate-200 text-slate-400'}`}>
                      <Search size={14} /> Plag {detectPlagiarism && <Check size={14} />}
                    </div>
                    <div onClick={() => setDetectAi(!detectAi)} className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${detectAi ? 'bg-blue-500/10 border-blue-500 text-blue-600' : 'bg-white border-slate-200 text-slate-400'}`}>
                      <Sparkles size={14} /> AI {detectAi && <Check size={14} />}
                    </div>
                  </div>
                </div>

                <div className='p-4 md:p-6 flex flex-col' style={{ minHeight: '350px' }}>
                  {currentMenu === 'text' ? (
                    <>
                      <textarea
                        value={inputText}
                        onChange={(e) => { setInputText(e.target.value); setTextLenght(e.target.value.trim().length) }}
                        placeholder='Paste or type your document text here for deep analysis...'
                        className='flex-1 w-full text-base md:text-lg text-slate-800 placeholder:text-slate-300 focus:outline-none resize-none'
                      />
                      <p className=' flex items-end justify-end text-gray-600 text-[13px]'><span className=' flex items-end justify-end text-gray-600 text-[10px] md:text-[13px] shadow shadow-gray-100 p-1'>
                        {textLength ? textLength : 0} Characters
                      </span></p>
                    </>
                  ) : currentMenu === 'files' ? (
                    <label htmlFor="upload" className='flex-1 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-emerald-400 transition-colors cursor-pointer group bg-slate-50/30'>
                      <div className="p-6 bg-white rounded-full shadow-md group-hover:scale-110 transition-transform">
                        <FileDown className='text-emerald-500' size={48} />
                      </div>
                      <div className='text-center'>
                        <h2 className='text-slate-900 font-bold'>{file ? file.name : "Drag & Drop Files"}</h2>
                        <p className='text-sm text-slate-500'>{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF, DOCX, or TXT (Max 10MB)"}</p>
                      </div>
                      <input type="file" id='upload' hidden accept=".pdf, .doc, .docx, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} />
                    </label>
                  ) : (
                    <div className='flex-1 flex flex-col gap-6'>
                      <div className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50/30">
                        <Link2 className='text-blue-500 mb-4' size={48} />
                        <h2 className='text-slate-900 font-bold'>Scan from URL</h2>
                        <p className='text-sm text-slate-500'>Analyze content directly from a live website</p>
                      </div>
                      <div className='flex gap-4'>
                        <input
                          type="url"
                          value={inputUrl}
                          onChange={(e) => setInputUrl(e.target.value)}
                          placeholder='https://example.com/article'
                          className='flex-1 bg-white border border-slate-200 p-3 md:p-4 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-sm'
                        />
                        <button className='bg-slate-900 text-white p-4 rounded-xl hover:bg-slate-800 transition-all'><Plus /></button>
                      </div>
                    </div>
                  )}
                </div>
                <div className='p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex justify-end'>
                  <button
                    disabled={isScanning}
                    className='w-full md:w-auto bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-slate-900/10'
                    onClick={handleExecuteScan}
                  >
                    {isScanning ? "Scanning..." : "Execute Scan"}
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              {isReady ?
                <div className='flex items-center justify-center'>
                  <p><Loader2 size={40} className='animate-spin shadow shadow-slate-400 rounded-4xl text-slate-900' /> </p>
                </div>
                :
                <div className='mt-2 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-bold text-slate-900 flex items-center gap-2'>
                      <Clock size={18} className="text-slate-400" /> Recent Activity
                    </h3>
                    <button onClick={() => setSelectedMenu('my-scan')} className='text-blue-600 font-bold text-xs hover:underline'>View All</button>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {adminProject &&
                      [...adminProject].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 2).map((project) => {
                        return (
                          <RecentCard key={project._id} name={project.fileName} time={FormatDate(project.createdAt)} plag={project.approved === true && project.plagiarismScore} ai={project.approved === true && project.aiScore} onClick={() => projectReport(project._id)} />
                        )
                      })
                    }

                  </div>
                </div>
              }
            </div>
          )}

          {/* DATA TABLES (Students, Admin Scans, Submitted Projects, Alerts) */}
          {(['students', 'my-scan', 'submitted-projects', 'alerts', 'approved-projects', 'rejected-projects'].includes(selectedMenu)) && (
            <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
              <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4'>
                <div>
                  <h1 className='text-3xl font-extrabold text-slate-900'>
                    {selectedMenu === 'students' ? 'Student Registry' :
                      selectedMenu === 'my-scan' ? 'Admin Scan History' :
                        selectedMenu === 'approved-projects' ? 'Approved Projects' :
                        selectedMenu === 'rejected-projects' ? 'Rejected Projects' :
                          selectedMenu === 'alerts' ? 'Critical Plagiarism Alerts' : 'Submitted Projects'}
                  </h1>
                  <p className='text-slate-500 text-sm'>
                    {selectedMenu === 'students' ? 'Global list of all registered researchers.' :
                      selectedMenu === 'alerts' ? 'Students with a similarity score exceeding 50%.' :
                        'Record of all administrative similarity checks.'}
                  </p>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex bg-slate-100 p-1 rounded-xl border border-slate-200'>
                    <button onClick={() => setViewMode(true)} className={`p-2 rounded-lg ${viewMode ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}><List size={20} /></button>
                    <button onClick={() => setViewMode(false)} className={`p-2 rounded-lg ${!viewMode ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}><LayoutGrid size={20} /></button>
                    <button className={`p-2 rounded-lg transition-all shadow-sm text-emerald-600 ${isDelete ? 'bg-red-400 text-white animate-pulse' : ''}`} disabled={!isDelete} onClick={handleDeleteProject} title='Delete Project'><Trash size={20} /></button>
                  </div>
                </div>
              </div>

              <div className='flex flex-col'>
                {selectedMenu === 'students' ?
                  isReady ?
                    <div className='flex items-center justify-center'>
                      <p><Loader2 size={40} className='animate-spin shadow shadow-slate-400 rounded-4xl text-slate-900' /> </p>
                    </div>
                    :
                    users.length !== 0 ?
                      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        {viewMode ? (
                          <div className="overflow-x-scroll">
                            <table className='w-full text-left border-collapse min-w-150'>
                              <thead>
                                <tr className='bg-slate-50/50 border-b border-slate-100'>
                                  <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Student Name</th>
                                  <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Email</th>
                                  <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Status/Risk</th>
                                  <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400 text-right'>Action</th>
                                </tr>
                              </thead>
                              <tbody className='divide-y divide-slate-50'>
                                {[...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((user) => (
                                  <tr key={user._id} className="hover:bg-slate-50 cursor-pointer transition-colors">
                                    <td className="p-5 flex items-center gap-3 truncate">
                                      <span className="font-bold text-slate-700">{(user.firstname ? user.firstname : '') + " " + (user.lastname ? user.lastname : '')}</span>
                                    </td>
                                    <td className="p-5 text-sm text-slate-500 truncate">{user.email}</td>
                                    <td className="p-5 truncate">
                                      {(new Date() - new Date(user.updatedAt)) > 3600000 ?
                                        <span className={`text-red-700 bg-red-100 p-1 px-4 text-xs rounded-md`}>Risk </span>
                                        : <span className={`text-green-700 bg-green-100 p-1 px-4 text-xs rounded-md`}>Active</span>}
                                    </td>
                                    <td className="p-5 text-right truncate" >
                                      <span className={`font-bold text-xs text-blue-600 cursor-pointer`} onClick={() => setSelectedMenu('submitted-projects')}> View Report </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 '>
                            {[...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((user) => (
                              <div key={user._id} className="bg-white border border-slate-200 p-5 rounded-2xl hover:shadow-lg transition-all cursor-pointer group ">
                                <div className="p-4 bg-slate-50 rounded-xl w-fit mb-4 group-hover:bg-emerald-50 transition-colors">
                                  <FileText size={24} className="text-slate-400 group-hover:text-emerald-500" />
                                </div>
                                <h4 className="font-bold text-slate-900 truncate mb-1">{user.firstname}</h4>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4 truncate">{user.email}</p>
                                <div className="flex items-center justify-between border-t border-slate-100 text-slate-600 pt-4 flex-wrap gap-1">
                                  <span className={`text-xs font-bold truncate`}>Last approved: {FormatDate(user.updatedAt)}</span>
                                  <span className={`text-xs font-bold text-blue-500 cursor-pointer`} onClick={() => setSelectedMenu('submitted-projects')}>View Report</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      :
                      <div className="p-20 text-center flex flex-col items-center">
                        <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-300 mb-4 animate-pulse">
                          <FolderHeart size={48} />
                        </div>
                        <h3 className="text-slate-900 font-bold text-xl mb-2">No documents found</h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                          This folder is empty.
                        </p>
                      </div>
                  :
                  selectedMenu === 'submitted-projects' ?
                    isReady ?
                      <div className='flex items-center justify-center'>
                        <p><Loader2 size={40} className='animate-spin shadow shadow-slate-400 rounded-4xl text-slate-900' /> </p>
                      </div>
                      :
                      projects.length !== 0 ?
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                          {viewMode ? (
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-scroll">
                              <table className='w-full text-left border-collapse min-w-150'>
                                <thead>
                                  <tr className='bg-slate-50/50 border-b border-slate-100'>
                                    <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Student Name</th>
                                    <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Documents</th>
                                    <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Date</th>
                                    <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Status</th>
                                    <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400 text-right'>Action</th>
                                  </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-50'>
                                  {[...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((project) => (
                                    <tr key={project._id} className="hover:bg-slate-50 cursor-pointer transition-colors">
                                      <td className="p-5 flex items-center gap-3 text-left truncate">
                                        <span className="font-bold text-slate-700">{(project.userId.firstname ? project.userId.firstname : '') + " " + (project.userId.lastname ? project.userId.lastname : '')}</span>
                                      </td>
                                      <td className="p-5 text-slate-500 text-left truncate">{project.fileName}</td>
                                      <td className="p-5 text-slate-500 text-left truncate">{FormatDate(project.createdAt)}</td>
                                      <td className="p-5 text-left truncate">
                                        {project.approved ?
                                          <span className='font-bold text-xs text-green-600 cursor-pointer'> Approved </span>
                                          :
                                          <span className='font-bold text-xs text-red-600 cursor-pointer'> Await Approval </span>
                                        }
                                      </td>
                                      <td className="p-5 text-right truncate" onClick={() => projectReport(project._id)}>
                                        <span className={`font-bold text-xs text-blue-600 cursor-pointer`}> View Report </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                              {[...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((project) => (
                                <div key={project._id} className="bg-white border border-slate-200 p-5 rounded-2xl hover:shadow-lg transition-all cursor-pointer group">
                                  <div className="p-4 bg-slate-50 rounded-xl w-fit mb-4 group-hover:bg-emerald-50 transition-colors">
                                    <FileText size={24} className="text-slate-400 group-hover:text-emerald-500" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 truncate mb-1">{(project.userId.firstname ? project.userId.firstname : '') + " " + (project.userId.lastname ? project.userId.lastname : '')}</h4>
                                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4 truncate">{project.userId.email && project.userId.email}</p>
                                  <div className="flex items-center justify-between border-t border-slate-100 text-slate-600 pt-4 flex-wrap gap-1">
                                    <span className={`text-xs font-bold truncate`}>Last approved: {FormatDate(project.updatedAt)}</span>
                                    <span className={`text-xs font-bold text-blue-500 cursor-pointer`} onClick={() => projectReport(project._id)}>View Report</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        :
                        <div className="p-20 text-center flex flex-col items-center">
                          <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-300 mb-4 animate-pulse">
                            <FolderHeart size={48} />
                          </div>
                          <h3 className="text-slate-900 font-bold text-xl mb-2">No documents found</h3>
                          <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                            This folder is empty.
                          </p>
                        </div>
                    :
                    selectedMenu === 'approved-projects' ?
                      isReady ?
                        <div className='flex items-center justify-center'>
                          <p><Loader2 size={40} className='animate-spin shadow shadow-slate-400 rounded-4xl text-slate-900' /> </p>
                        </div>
                        :
                        approved.length !== 0 ?
                          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            {viewMode ? (
                              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-scroll">
                                <table className='w-full text-left border-collapse min-w-150'>
                                  <thead>
                                    <tr className='bg-slate-50/50 border-b border-slate-100'>
                                      <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Student Name</th>
                                      <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Documents</th>
                                      <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Date</th>
                                      <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Status</th>
                                      <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400 text-right'>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody className='divide-y divide-slate-50'>
                                    {[...approved].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((approve) => (
                                      <tr key={approve._id} className="hover:bg-slate-50 cursor-pointer transition-colors">
                                        <td className="p-5 flex items-center gap-3 text-left truncate">
                                          <span className="font-bold text-slate-700">{(approve.userId.firstname ? approve.userId.firstname : '') + " " + (approve.userId.lastname ? approve.userId.lastname : '')}</span>
                                        </td>
                                        <td className="p-5 text-slate-500 text-left truncate">{approve.fileName}</td>
                                        <td className="p-5 text-slate-500 text-left truncate">{FormatDate(approve.updatedAt)}</td>
                                        <td className="p-5 text-left truncate">
                                          <span className='font-bold text-xs text-green-600 cursor-pointer'> Approved </span>
                                        </td>
                                        <td className="p-5 text-right truncate" onClick={() => projectReport(approve._id)}>
                                          <span className={`font-bold text-xs text-blue-600 cursor-pointer`}> View Report </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {[...approved].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((approve) => (
                                  <div key={approve._id} className="bg-white border border-slate-200 p-5 rounded-2xl hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="p-4 bg-slate-50 rounded-xl w-fit mb-4 group-hover:bg-emerald-50 transition-colors">
                                      <FileText size={24} className="text-slate-400 group-hover:text-emerald-500" />
                                    </div>
                                    <h4 className="font-bold text-slate-900 truncate mb-1">{(approve.userId.firstname ? approve.userId.firstname : '') + " " + (approve.userId.lastname ? approve.userId.lastname : '')}</h4>
                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4 truncate">{approve.userId.email}</p>
                                    <div className="flex items-center justify-between border-t border-slate-100 text-slate-600 pt-4 flex-wrap gap-1">
                                      <span className={`text-xs font-bold truncate`}>Last approved: {FormatDate(approve.updatedAt)}</span>
                                      <span className={`text-xs font-bold text-blue-500 cursor-pointer`} onClick={() => projectReport(approve._id)}>View Report</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          :
                          <div className="p-20 text-center flex flex-col items-center">
                            <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-300 mb-4 animate-pulse">
                              <FolderHeart size={48} />
                            </div>
                            <h3 className="text-slate-900 font-bold text-xl mb-2">No documents found</h3>
                            <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                              This folder is empty.
                            </p>
                          </div>
                      :
                      selectedMenu === 'rejected-projects' ?
                        isReady ?
                          <div className='flex items-center justify-center'>
                            <p><Loader2 size={40} className='animate-spin shadow shadow-slate-400 rounded-4xl text-slate-900' /> </p>
                          </div>
                          :
                          rejected.length !== 0 ?
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                              {viewMode ? (
                                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-scroll">
                                  <table className='w-full text-left border-collapse min-w-150'>
                                    <thead>
                                      <tr className='bg-slate-50/50 border-b border-slate-100'>
                                        <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Student Name</th>
                                        <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Documents</th>
                                        <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Date</th>
                                        <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Status</th>
                                        <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400 text-right'>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody className='divide-y divide-slate-50'>
                                      {[...rejected].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((reject) => (
                                        <tr key={reject._id} className="hover:bg-slate-50 cursor-pointer transition-colors">
                                          <td className="p-5 flex items-center gap-3 text-left truncate">
                                            <span className="font-bold text-slate-700">{(reject.userId.firstname ? reject.userId.firstname : '') + " " + (reject.userId.lastname ? reject.userId.lastname : '')}</span>
                                          </td>
                                          <td className="p-5 text-slate-500 text-left truncate">{reject.fileName}</td>
                                          <td className="p-5 text-slate-500 text-left truncate">{FormatDate(reject.updatedAt)}</td>
                                          <td className="p-5 text-left truncate">
                                            <span className='font-bold text-xs text-red-600 cursor-pointer'> Rejected </span>
                                          </td>
                                          <td className="p-5 text-right truncate" onClick={() => projectReport(reject._id)}>
                                            <span className={`font-bold text-xs text-blue-600 cursor-pointer`}> View Report </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                  {[...rejected].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((reject) => (
                                    <div key={reject._id} className="bg-white border border-slate-200 p-5 rounded-2xl hover:shadow-lg transition-all cursor-pointer group">
                                      <div className="p-4 bg-slate-50 rounded-xl w-fit mb-4 group-hover:bg-emerald-50 transition-colors">
                                        <FileText size={24} className="text-slate-400 group-hover:text-emerald-500" />
                                      </div>
                                      <h4 className="font-bold text-slate-900 truncate mb-1">{(reject.userId.firstname ? reject.userId.firstname : '') + " " + (reject.userId.lastname ? reject.userId.lastname : '')}</h4>
                                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4 truncate">{reject.userId.email}</p>
                                      <div className="flex items-center justify-between border-t border-slate-100 text-slate-600 pt-4 flex-wrap gap-1">
                                        <span className={`text-xs font-bold truncate`}>Last rejected: {FormatDate(reject.updatedAt)}</span>
                                        <span className={`text-xs font-bold text-blue-500 cursor-pointer`} onClick={() => projectReport(reject._id)}>View Report</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            :
                            <div className="p-20 text-center flex flex-col items-center">
                              <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-300 mb-4 animate-pulse">
                                <FolderHeart size={48} />
                              </div>
                              <h3 className="text-slate-900 font-bold text-xl mb-2">No documents found</h3>
                              <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                                This folder is empty.
                              </p>
                            </div>
                        :
                        selectedMenu === 'alerts' ?
                          isReady ?
                            <div className='flex items-center justify-center'>
                              <p><Loader2 size={40} className='animate-spin shadow shadow-slate-400 rounded-4xl text-slate-900' /> </p>
                            </div>
                            :
                            similarities.length !== 0 ?
                              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-scroll">
                                <table className='w-full text-left min-w-125 overflow-x-scroll'>
                                  <thead className='bg-slate-50/30 text-slate-400 text-[10px] font-bold uppercase tracking-widest'>
                                    <tr>
                                      <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Student Name</th>
                                      <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Document</th>
                                      <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Similarity</th>
                                      <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400 text-right'>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody className='divide-y divide-slate-50'>
                                    {similarities &&
                                      [...similarities].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((similarity) =>
                                        similarity.plagiarismScore > 50 &&
                                        <AlertRow key={similarity._id} name={(similarity.userId.firstname ? similarity.userId.firstname : '') + " " + (similarity.userId.lastname ? similarity.userId.lastname : '')} doc={similarity.fileName} percent={similarity.plagiarismScore} onClick={() => projectReport(similarity._id)} />
                                      )
                                    }
                                  </tbody>
                                </table>
                              </div>
                              :
                              <div className="p-20 text-center flex flex-col items-center">
                                <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-300 mb-4 animate-pulse">
                                  <FolderHeart size={48} />
                                </div>
                                <h3 className="text-slate-900 font-bold text-xl mb-2">No documents found</h3>
                                <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                                  This folder is empty.
                                </p>
                              </div>
                          :
                          selectedMenu === 'my-scan' &&
                            isReady ?
                            <div className='flex items-center justify-center'>
                              <p><Loader2 size={40} className='animate-spin shadow shadow-slate-400 rounded-4xl text-slate-900' /> </p>
                            </div>
                            :
                            adminProject.length !== 0 ?
                              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                                {viewMode ?
                                  <div className="overflow-x-auto">
                                    <table className='w-full text-left border-collapse min-w-150'>
                                      <thead>
                                        <tr className='bg-slate-50/50 border-b border-slate-100'>
                                          <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>File Name</th>
                                          <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Date</th>
                                          <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>Plagiarism</th>
                                          <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400'>AI</th>
                                          <th className='p-5 text-xs font-bold uppercase tracking-wider text-slate-400 text-right'>Action</th>
                                        </tr>
                                      </thead>
                                      <tbody className='divide-y divide-slate-50'>
                                        {[...adminProject].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((project) => (
                                          <tr key={project._id} className={`hover:bg-slate-50 cursor-pointer transition-colors ${project._id === projectId ? 'bg-slate-100' : ''}`} onClick={() => { setIsDelete(true); getProjectId(project._id) }}>
                                            <td className="p-5 flex items-center gap-3 truncate">
                                              <FileText size={20} className="text-slate-400" />
                                              <span className="font-bold text-slate-700">{project.fileName}</span>
                                            </td>
                                            <td className="p-5 text-sm text-slate-500 truncate">{FormatDate(project.createdAt)}</td>
                                            <td className="p-5 truncate">
                                              <span className={`font-bold ${project.plagiarismScore > 30 && project.approved ? 'text-red-500' : 'text-emerald-500'}`}>{project.approved ? project.plagiarismScore : 0}%</span>
                                            </td>
                                            <td className="p-5 truncate">
                                              <span className={`font-bold ${project.aiScore > 30 && project.approved ? 'text-red-500' : 'text-emerald-500'}`}>{project.approved ? project.aiScore : 0}%</span>
                                            </td>
                                            <td className="p-5 text-right truncate" onClick={() => projectReport(project._id)}>
                                              <span className={`font-bold text-xs ${project.approved ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {project.approved ? 'Reviewed' : 'Pending Review'}
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  :
                                  <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    {[...adminProject].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((project) => (
                                      <div key={project._id} className="bg-white border border-slate-200 p-5 rounded-2xl hover:shadow-lg transition-all cursor-pointer group" onClick={() => projectReport(project._id)}>
                                        <div className="p-4 bg-slate-50 rounded-xl w-fit mb-4 group-hover:bg-emerald-50 transition-colors">
                                          <FileText size={24} className="text-slate-400 group-hover:text-emerald-500" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 truncate mb-1">{project.fileName}</h4>
                                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4 truncate">{FormatDate(project.createdAt)}</p>
                                        <div className="flex items-center justify-between border-t border-slate-100 pt-4 flex-wrap gap-1">
                                          <span className={`text-xs font-bold ${project.plagiarismScore > 30 && project.approved ? 'text-red-500' : 'text-emerald-500'}`}>PLAG: {project.approved ? project.plagiarismScore : 0}%</span>
                                          <span className={`text-xs font-bold ${project.aiScore > 30 && project.approved ? 'text-red-500' : 'text-emerald-500'}`}>AI: {project.approved ? project.aiScore : 0}%</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                }
                              </div>
                              :
                              <div className="p-20 text-center flex flex-col items-center">
                                <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-300 mb-4 animate-pulse">
                                  <FolderHeart size={48} />
                                </div>
                                <h3 className="text-slate-900 font-bold text-xl mb-2">No documents found</h3>
                                <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                                  This folder is empty.
                                </p>
                              </div>
                }
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
};

const RecentCard = ({ name, time, plag, ai, onClick }) => (
  <div className='bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group' onClick={onClick}>
    <div className='p-3 bg-red-50 text-red-500 rounded-xl'><FileText size={24} /></div>
    <div className='flex-1 overflow-hidden'>
      <h4 className='text-slate-900 font-bold text-sm truncate'>{name}</h4>
      <div className='flex items-center gap-3 text-[10px] uppercase font-bold tracking-wider mt-1'>
        <span className='text-slate-400'>{time}</span>
        <span className='text-red-600 font-bold'>Plag: {plag}</span>
        <span className='text-blue-500 font-bold'>AI: {ai}</span>
      </div>
    </div>
    <ArrowRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
  </div>
);

const AlertRow = ({ name, doc, percent, onClick }) => (
  <tr className='hover:bg-slate-50 transition-colors'>
    <td className='p-5'>
      <p className='font-bold text-slate-700 text-sm truncate'>{name}</p>
    </td>
    <td className='p-5 text-xs text-slate-500 truncate'>{doc}</td>
    <td className='p-5'>
      <span className='px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-100 text-rose-600'>
        {percent} Match
      </span>
    </td>
    <td className='p-5 text-right' onClick={onClick}>
      <button className='p-2 text-slate-400 hover:text-blue-600' ><ArrowUpRight size={18} /></button>
    </td>
  </tr>
)

export default AdminDashboard;