import { CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const ApproveProject = ({ projectId, report }) => {

  const { setIsApprove } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [approved, setapproved] = useState(false)

  const approveProjectFunction = async () => {
    setLoading(true)
    try {
      const response = await axios.put(`/approve/${projectId}`, {
        projectId: projectId
      })
      if (response.data) {
        toast.success(response.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message)
    } finally {
      setLoading(false)
      setIsApprove(false)
    }
  }

  useEffect(() => {
    const getUserProject = async () => {
      try {
        const response = await axios.put(`/filter/project/`, {
          projectId: projectId
        })
        if (response) {
          setapproved(response.data.approved)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getUserProject()
  },[])

  return (
    <div className="fixed inset-0 z-400 flex items-center justify-center p-4 bg-slate-900/60 animate-in fade-in duration-300">

      {/* Modal Container */}
      <div className="bg-white w-full max-w-sm rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

        <div className="h-2 w-full bg-emerald-500" />

        <div className="p-7">
          <button className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-2">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900">Approve Project?</h3>

            <p className="text-slate-500 text-[9px] leading-relaxed flex flex-col items-center">
              You are about to officially approve <span className="font-bold text-slate-800">{report && report}</span>.
              This will notify the student and mark the submission as verified in the database.
            </p>
          </div>

          {/* Warning Box */}
          <div className="mt-6 p-2 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
            <AlertTriangle size={20} className="text-amber-600 shrink-0" />
            <p className="text-[9px] text-amber-700 font-medium">
              Note: This action is permanent. Approved projects are added to the institutional repository for future plagiarism cross-referencing.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button className={`w-full p-2 bg-red-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-200 text-xs active:scale-95 md:p-3 ${approved ? 'bg-green-500' : ''}`} onClick={approveProjectFunction} disabled={approved}>
              {loading ? 'Loading...' : approved ? 'Already Approved' : 'Confirm Approval'}
            </button>

            <button className="w-full p-2 bg-white hover:bg-slate-200 text-slate-800 font-bold rounded-2xl transition-all shadow-sm shadow-emerald-200 text-xs active:scale-95 md:p-3" onClick={() => setIsApprove(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveProject;