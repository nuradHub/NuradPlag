import { PageSkeleton } from '../PageSkeleton';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { FilePlus2, FolderHeart, Menu, Upload, Link2, FileUser, Search, Eye, Check, ExternalLink, Plus, FileDown, Send, ArrowRight, LayoutGrid, List, Sparkles, BookText, Clock, FileText, Loader2, Trash } from 'lucide-react';
import AsideMenu from '../AsideMenu';
import { useState, useEffect, useContext } from 'react';
import SelectScannedFolder from './SelectScannedFolder';
import { AppContext } from '../context/Context';
import UploadPassport from './uploads/UploadPassport';
import FormatDate from '../../utils/FormatDate';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserDashboard = () => {

  const { currentMenu, setCurrentMenu, detectPlagiarism, setDetectPlagiarism, detectAi, setDetectAi, isLoading, setIsLoading, viewMode, setViewMode, file, inputText, setInputText, inputUrl, setInputUrl, isScanning, sharedFile, textLength, setTextLenght, handleFileChange, handleExecuteScan, projectFunction, projects, isReady, setIsReady, handleDeleteProject, isDelete, setIsDelete, projectId, getProjectId } = useContext(AppContext)

  const { selectedFolder, setIsFolder, selectedMenu, setSelectedMenu, isUpload } = useContext(AppContext);

  if (isLoading) return <PageSkeleton />;

  const navItemClass = (tag) => `
    flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all font-bold text-sm
    ${selectedMenu === tag
      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}
  `;

  const tabClass = (active) => `
    flex items-center justify-center gap-2 text-[12px] md:text-sm font-bold cursor-pointer rounded-xl px-2 md:px-6 py-3 transition-all flex-1 md:flex-none
    ${active ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}
  `;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const myDatas = async () => {
      setIsReady(true)
      try {
        await projectFunction()
      } catch (err) {
        console.log(err)
      } finally {
        setIsReady(false)
      }
    }
    myDatas()
  }, []);

  useEffect(() => {
    const myDatas = async () => {
      try {
        const response = await axios.put('/status/active')
      } catch (err) {
        console.log(err)
      } 
    }
    myDatas()
  }, []);

  return (
    <div className='flex flex-col w-full h-dvh bg-white md:bg-[#F8FAFC] overflow-hidden'>
      <Header />
      <AsideMenu />
      <SelectScannedFolder />
      {isUpload && <UploadPassport />}

      <div className='flex flex-1 overflow-hidden relative'>

        <aside className='hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 gap-8 shrink-0 h-full overflow-y-auto'>
          <div className='flex items-center gap-2 mb-4'>
            <img src="/img/nplag.png" alt="Logo" className="w-10" />
            <span className="font-bold text-slate-900 text-xl tracking-tight">NuradPlag</span>
          </div>

          <nav className='flex flex-col gap-2'>
            <p className='text-[10px] uppercase tracking-widest text-slate-400 font-bold px-3 mb-2'>Workspace</p>
            <div className={navItemClass('new-scan')} onClick={() => setSelectedMenu('new-scan')}>
              <FilePlus2 size={20} className={selectedMenu === 'new-scan' ? 'text-emerald-500' : 'text-blue-600'} />
              New Scan
            </div>
            <div className={navItemClass('submit-project')} onClick={() => setSelectedMenu('submit-project')}>
              <Send size={20} className={selectedMenu === 'submit-project' ? 'text-emerald-500' : 'text-blue-600'} />
              Submit Project
            </div>
            <div className={navItemClass('my-scan')} onClick={() => setSelectedMenu('my-scan')}>
              <FolderHeart size={20} className={selectedMenu === 'my-scan' ? 'text-emerald-500' : 'text-blue-600'} />
              My Scans
            </div>
            <div className={navItemClass('shared')} onClick={() => setSelectedMenu('shared')}>
              <FileUser size={20} className={selectedMenu === 'shared' ? 'text-emerald-500' : 'text-blue-600'} />
              Shared Files
            </div>
          </nav>

          <div className='mt-auto flex flex-col gap-2 border-t border-slate-100 pt-6'>
            <Link to='/dashboard/support' className='flex items-center gap-3 p-2 text-slate-600 font-bold text-sm hover:text-emerald-600 transition-colors'>
              <Sparkles size={18} className="text-emerald-500" /> Support
            </Link>
            <Link to='/dashboard/blog' className='flex items-center gap-3 p-2 text-slate-600 font-bold text-sm hover:text-emerald-600 transition-colors'>
              <BookText size={18} className="text-emerald-500" /> Blog
            </Link>
          </div>
        </aside>

        <main className='flex-1 min-w-0 overflow-y-auto p-4 md:p-10 bg-white/70 pb-10'>

          {selectedMenu === 'new-scan' || selectedMenu === 'submit-project' ? (
            <div className='max-w-5xl mx-auto flex flex-col gap-6 md:gap-8'>

              <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
                <div className='max-w-full overflow-hidden'>
                  <h1 className='text-2xl md:text-3xl font-extrabold text-slate-900 mb-1 truncate'>
                    {selectedMenu === 'new-scan' ? 'Start a New Scan' : 'Submit Project'}
                  </h1>
                  <p className='text-xs md:text-sm text-slate-500'>Analyze academic integrity with precision.</p>
                </div>

                <div className='flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 w-full md:w-auto'>
                  <div className={tabClass(currentMenu === 'text')} onClick={() => setCurrentMenu('text')}>
                    <Menu size={16} /> <span>Text</span>
                  </div>
                  <div className={tabClass(currentMenu === 'files')} onClick={() => setCurrentMenu('files')}>
                    <Upload size={16} /> <span>Files</span>
                  </div>
                  <div className={tabClass(currentMenu === 'urls')} onClick={() => setCurrentMenu('urls')}>
                    <Link2 size={16} /> <span>URLs</span>
                  </div>
                </div>
              </div>

              <div className='w-full max-w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden'>
                <div className='bg-slate-50/50 border-b border-slate-100 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                  <div className='flex items-center gap-2 w-full sm:w-auto'>
                    <div onClick={() => setDetectPlagiarism(!detectPlagiarism)} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-full text-[10px] md:text-xs font-bold border transition-all cursor-pointer ${detectPlagiarism ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600' : 'bg-white border-slate-200 text-slate-400'}`}>
                      <Search size={14} /> Plag {detectPlagiarism && <Check size={14} />}
                    </div>
                    <div onClick={() => setDetectAi(!detectAi)} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-full text-[10px] md:text-xs font-bold border transition-all cursor-pointer ${detectAi ? 'bg-blue-500/10 border-blue-500 text-blue-600' : 'bg-white border-slate-200 text-slate-400'}`}>
                      <Sparkles size={14} /> AI {detectAi && <Check size={14} />}
                    </div>
                  </div>

                  <div className='flex items-center gap-2 text-[10px] font-bold text-slate-500 cursor-pointer w-full sm:w-auto justify-end' onClick={() => setIsFolder(true)}>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                      <FolderHeart size={14} className="text-blue-500" />
                      <span className="truncate max-w-20">{selectedFolder === 'my-scan' ? 'My Scans' : 'Shared'}</span>
                      <ExternalLink size={12} className="text-slate-400" />
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
                    {isScanning ? "Scanning..." : selectedMenu === 'submit-project' ? 'Submit' : 'Execute Scan'}
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
                    {projects &&
                      [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 2).map((project) => {
                        return (
                          <RecentCard key={project._id} name={project.fileName} time={FormatDate(project.createdAt)} plag={project.approved || project.rejected && project.plagiarismScore} ai={project.approved || project.rejected && project.aiScore} />
                        )
                      })
                    }
                  </div>
                </div>
              }
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4'>
                <div>
                  <h1 className='text-3xl font-extrabold text-slate-900 capitalize'>{selectedMenu.replace('-', ' ')}</h1>
                  <p className='text-slate-500 text-sm'>Manage and view your academic reports.</p>
                </div>
                <div className='flex items-center gap-3 w-full md:w-auto'>
                  <div className='flex bg-slate-100 p-1 gap-3 rounded-xl border border-slate-200'>
                    <button onClick={() => setViewMode(true)} className={`p-2 rounded-lg transition-all ${viewMode ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}><List size={20} /></button>
                    <button onClick={() => setViewMode(false)} className={`p-2 rounded-lg transition-all ${!viewMode ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}><LayoutGrid size={20} /></button>
                    <button className={`p-2 rounded-lg transition-all shadow-sm text-emerald-600 ${isDelete ? 'bg-red-400 text-white animate-pulse' : ''}`} disabled={!isDelete} onClick={handleDeleteProject} title='Delete Project'><Trash size={20} /></button>
                  </div>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all" onClick={() => setSelectedMenu('new-scan')}><Plus size={18} /> New Scan</button>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                {selectedMenu === 'my-scan' ? (
                  isReady ?
                    <div className='flex items-center justify-center'>
                      <p><Loader2 size={40} className='animate-spin shadow shadow-slate-400 rounded-4xl text-slate-900' /> </p>
                    </div>
                    :
                    projects.length !== 0 ?
                      viewMode ? (
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
                              {[...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((project) => (
                                <tr key={project._id} className={`hover:bg-slate-50 cursor-pointer transition-colors ${project._id === projectId && 'bg-slate-100'}`} onClick={()=> {setIsDelete(true); getProjectId(project._id)}}>
                                  <td className="p-5 flex items-center gap-3 truncate">
                                    <FileText size={20} className="text-slate-400" />
                                    <span className="font-bold text-slate-700">{project.fileName}</span>
                                  </td>
                                  <td className="p-5 text-sm text-slate-500 truncate">{FormatDate(project.updatedAt)}</td>
                                  <td className="p-5 truncate">
                                    <span className={`font-bold ${project.plagiarismScore > 30 && project.approved ? 'text-red-500' : project.plagiarismScore > 30 && project.rejected ? 'text-red-500' : 'text-green-500'}`}>{project.approved || project.rejected ? project.plagiarismScore : 0}%</span>
                                  </td>
                                  <td className="p-5 truncate">
                                    <span className={`font-bold ${project.aiScore > 30 && project.approved ? 'text-red-500' : project.aiScore > 30 && project.rejected ? 'text-red-500' : 'text-green-500'}`}>{project.approved || project.rejected ? project.aiScore : 0}%</span>
                                  </td>
                                  <td className="p-5 text-right truncate" title='Result Would be available ones approved'>
                                    <span className={`font-bold text-xs ${project.approved ? 'text-emerald-500' : project.rejected ? 'text-red-500' : 'text-red-500'}`}>
                                      {project.approved ? 'Approved' : project.rejected ? 'Rejected' : 'Pending Review'}
                                    </span>
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
                              <h4 className="font-bold text-slate-900 truncate mb-1">{project.fileName}</h4>
                              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4 truncate">{FormatDate(project.updatedAt)}</p>
                              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                <span className={`text-xs font-bold ${project.plagiarismScore > 30 && project.approved ? 'text-red-500' : 'text-emerald-500'}`}>PLAG: {project.approved ? project.plagiarismScore : 0}%</span>
                                <span className={`text-xs font-bold ${project.aiScore > 30 && project.approved ? 'text-red-500' : 'text-emerald-500'}`}>AI: {project.approved ? project.aiScore : 0}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )
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
                ) :
                  selectedMenu === 'shared' &&
                    isReady ?
                    <div className='flex items-center justify-center'>
                      <p><Loader2 size={40} className='animate-spin shadow shadow-slate-400 rounded-4xl text-slate-900' /> </p>
                    </div>
                    :
                    sharedFile.length !== 0 ?
                      viewMode ? (
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
                              {sharedFile && [...sharedFile].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((shared) => (
                                <tr key={shared._id} className="hover:bg-slate-50 cursor-pointer transition-colors">
                                  <td className="p-5 flex items-center gap-3 truncate">
                                    <FileText size={20} className="text-slate-400" />
                                    <span className="font-bold text-slate-700">{shared.fileName}</span>
                                  </td>
                                  <td className="p-5 text-sm text-slate-500 truncate">{FormatDate(shared.createdAt)}</td>
                                  <td className="p-5 truncate">
                                    <span className={`font-bold ${shared.plagiarismScore > 30 ? 'text-red-500' : 'text-emerald-500'}`}>{shared.approved && shared.plagiarismScore}%</span>
                                  </td>
                                  <td className="p-5 truncate">
                                    <span className={`font-bold ${shared.plagiarismScore > 30 ? 'text-red-500' : 'text-emerald-500'}`}>{shared.approved && project.aiScore}%</span>
                                  </td>
                                  <td className="p-5 text-right " title='Result Would be available ones approved'><Eye size={18} className="ml-auto text-slate-400" /></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                          {sharedFile && [...sharedFile].map((shared) => (
                            <div key={shared._id} className="bg-white border border-slate-200 p-5 rounded-2xl hover:shadow-lg transition-all cursor-pointer group">
                              <div className="p-4 bg-slate-50 rounded-xl w-fit mb-4 group-hover:bg-emerald-50 transition-colors">
                                <FileText size={24} className="text-slate-400 group-hover:text-emerald-500" />
                              </div>
                              <h4 className="font-bold text-slate-900 truncate mb-1">{shared.fileName}</h4>
                              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4 truncate">{FormatDate(shared.createdAt)}</p>
                              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                <span className="text-xs font-bold text-red-500">PLAG: {shared.approved && shared.plagiarismScore}%</span>
                                <span className="text-xs font-bold text-blue-500">AI: {shared.approved && shared.aiScore}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) :
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

const RecentCard = ({ name, time, plag, ai }) => (
  <div className='bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group'>
    <div className='p-3 bg-red-50 text-red-500 rounded-xl'><FileText size={24} /></div>
    <div className='flex-1 overflow-hidden'>
      <h4 className='text-slate-900 font-bold text-sm truncate'>{name}</h4>
      <div className='flex items-center gap-3 text-[10px] uppercase font-bold tracking-wider mt-1'>
        <span className='text-slate-400 truncate'>{time}</span>
        <span className='text-emerald-600 font-bold'>Plag: {plag}</span>
        <span className='text-blue-500 font-bold'>AI: {ai}</span>
      </div>
    </div>
    <ArrowRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
  </div>
);

export default UserDashboard;