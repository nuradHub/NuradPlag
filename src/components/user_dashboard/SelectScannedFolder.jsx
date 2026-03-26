import { ArrowRight, FolderHeart, FileUser, FilePlus2, X } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/Context';

const SelectScannedFolder = () => {
  const { folder, setFolder, isFolder, setIsFolder, setSelectedFolder } = useContext(AppContext);

  const selectFolder = () => {
    setSelectedFolder(folder);
    setIsFolder(false);
  };

  // Completely unmount the component when not in use to kill "ghost" lines
  if (!isFolder) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden'>
      {/* 1. Backdrop - Glass effect */}
      <div 
        className='absolute inset-0 bg-slate-900/60 backdrop-blur-sm' 
        onClick={() => setIsFolder(false)} 
      />

      {/* 2. Modal Card */}
      <div className='relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200'>
        
        {/* Header */}
        <div className='flex items-center justify-between bg-slate-50 p-6 border-b border-slate-100'>
          <h3 className='font-bold text-slate-900 text-xl'>Target Folder</h3>
          <button 
            onClick={() => setIsFolder(false)}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-3'>
          <p className='text-xs font-bold text-slate-400 uppercase tracking-widest pb-2'>Choose where to save results</p>
          
          {/* My Scans Option */}
          <div 
            className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2 
              ${folder === 'my-scan' 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                : 'border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100'}`} 
            onClick={() => setFolder('my-scan')}
          >
            <div className='flex items-center gap-3'>
              <div className={`p-2 rounded-lg ${folder === 'my-scan' ? 'bg-emerald-500 text-white' : 'bg-white text-blue-600 shadow-sm'}`}>
                <FolderHeart size={20}/>
              </div>
              <span className='font-bold'>My Scans</span>
            </div>
            <ArrowRight size={18} className={folder === 'my-scan' ? 'opacity-100' : 'opacity-30'} />
          </div>

          {/* Shared Option */}
          <div 
            className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2 
              ${folder === 'shared' 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                : 'border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100'}`} 
            onClick={() => setFolder('shared')}
          >
            <div className='flex items-center gap-3'>
              <div className={`p-2 rounded-lg ${folder === 'shared' ? 'bg-emerald-500 text-white' : 'bg-white text-blue-600 shadow-sm'}`}>
                <FileUser size={20} />
              </div>
              <span className='font-bold'>Shared With Me</span>
            </div>
            <ArrowRight size={18} className={folder === 'shared' ? 'opacity-100' : 'opacity-30'} />
          </div>
        </div>

        {/* Action Bar */}
        <div className='p-6 bg-slate-50 flex items-center justify-between'>
          <div className='flex items-center gap-2 text-slate-400'>
             <FilePlus2 size={20} />
             <span className='text-[10px] font-bold uppercase'>NuradPlag Destination</span>
          </div>
          
          <button 
            disabled={!folder}
            className={`px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg
              ${folder 
                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`} 
            onClick={selectFolder}
          >
            Select Folder
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectScannedFolder;