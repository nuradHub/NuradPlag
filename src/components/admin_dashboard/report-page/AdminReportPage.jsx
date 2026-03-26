import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Share2, ShieldCheck} from 'lucide-react';
import { AppContext } from '../../context/Context';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import { toast } from 'react-toastify';
import axios from 'axios';

//HIGHLIGHT LOGIC COMPONENT
export const HighlightedText = ({ text, highlights }) => {
  if (!text) return null;

  const points = [];
  (highlights || []).forEach((hl) => {
    if (typeof hl.start === 'number' && typeof hl.end === 'number') {
      points.push({ pos: hl.start, type: 'start', kind: hl.type });
      points.push({ pos: hl.end, type: 'end', kind: hl.type });
    }
  });

  points.sort((a, b) => a.pos - b.pos || (a.type === 'end' ? -1 : 1));

  const parts = [];
  let lastPos = 0;
  let activeTypes = new Set();

  for (const point of points) {
    if (point.pos > lastPos) {
      const slice = text.substring(lastPos, point.pos);
      
      if (activeTypes.size > 0) {

        const hasAI = activeTypes.has('ai');
        const hasPlag = activeTypes.has('plagiarism');

        let highlightClass = 'bg-rose-100 text-rose-900 border-b-2 border-rose-400';
        let title = "Plagiarism Match";

        if (hasAI && hasPlag) {
          highlightClass = 'bg-amber-100 text-amber-900 border-b-2 border-amber-500'; // Mixed
          title = "AI & Plagiarism Detected";
        } else if (hasAI) {
          highlightClass = 'bg-purple-100 text-purple-900 border-b-2 border-purple-500'; // AI Only
          title = "AI Content Detected";
        }

        parts.push(
          <mark 
            key={`${lastPos}-${point.pos}`} 
            className={`${highlightClass} px-0.5 rounded-sm inline transition-all duration-300 cursor-help`} 
            title={title}
          >
            {slice}
          </mark>
        );
      } else {
        parts.push(slice);
      }
    }

    if (point.type === 'start') {
      activeTypes.add(point.kind);
    } else {
      activeTypes.delete(point.kind);
    }
    
    lastPos = point.pos;
  }

  if (lastPos < text.length) {
    parts.push(text.substring(lastPos));
  }

  return (
    <div className="whitespace-pre-wrap text-justify leading-[1.8] font-serif antialiased px-4 py-2 bg-white shadow-inner rounded-md border border-gray-200 text-gray-800">
      {parts}
    </div>
  );
};

const AdminReportPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { report, setReport } = useContext(AppContext);
  const [isFetching, setIsFetching] = useState(true);
  const reportRef = useRef(null)

  useEffect(() => {
    const reportFunction = async () => {
      try {
        setIsFetching(true);
        const response = await axios.put('/filter/project', {
          projectId: projectId
        });
        if (response.data) {
          setReport(response.data);
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
      } finally {
        setIsFetching(false);
      }
    };
    reportFunction();
  }, [projectId, setReport]);

  if (isFetching) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Analyzing Document Structure...</p>
        </div>
      </div>
    );
  }

  const downloadPDF = () => {
    window.print();
  };

  const sidebarSources = report?.sources?.filter(src => {
    const sourceIdStr = String(src._id);
    return report.highlights?.some(hl => String(hl.sourceId) === sourceIdStr);
  }) || [];

  console.log(report)

  return (
    <div className="flex h-screen w-full bg-[#F1F5F9] overflow-hidden font-sans">
      <LeftSideBar projectId={projectId} report={report} reportRef={reportRef.current}/>
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* TOP UTILITY BAR */}
        <header className="h-auto bg-white border-b border-slate-200 flex flex-col items-start justify-between px-6 py-3 gap-3 md:flex-row ">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <ArrowLeft size={18} className="text-slate-600" />
            </button>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              My Scans {'>'} <span className="text-slate-900">{report?.fileName}</span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-8 md:gap-4">
            <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100">
              <ShieldCheck size={14} /> Credits Left: 140
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer" title='Download Report' onClick={downloadPDF} ><Download size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-slate-600"><Share2 size={20} /></button>
          </div>
        </header>

        {/* REPORT WORKSPACE */}
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-3 flex flex-col items-center bg-slate-100">
            {/* Stats Cards */}
            <div className="w-full max-w-4xl grid grid-rows-1 gap-4 mb-6 md:grid-cols-2">
              <StatCard label="Matched Text" score={report?.plagiarismScore} color="rose" />
              <StatCard label="AI Content" score={report?.aiScore} color="purple" />
            </div>

            {/* The Paper */}
            <div
              className="w-full max-w-4xl bg-white shadow-2xl rounded-sm p-5 mb-20 relative text-slate-800 font-serif md:p-14 antialiased"
              ref={reportRef}
              id='pdf-paper'
            >
              <h1 className="flex flex-col gap-2 text-3xl font-bold mb-10 text-center text-slate-900 uppercase tracking-tight border-b pb-8 truncate">
                <span>Name: {report?.userId?.firstname && report?.userId?.firstname}</span>
                <span>Email: {report?.userId?.email && report?.userId?.email}</span>
              </h1>

              <div className="text-[17px] text-justify leading-[1.8] selection:bg-blue-100">
                <HighlightedText
                  text={report?.fullText}
                  highlights={report?.highlights || []}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      <RightSideBar sources={sidebarSources} />
    </div>
  );
};

const StatCard = ({ label, score, color }) => {
  const colorMap = {
    rose: {
      text: "text-rose-600",
      bg: "bg-rose-500",
      barBg: "bg-rose-100"
    },
    purple: {
      text: "text-purple-600",
      bg: "bg-purple-500",
      barBg: "bg-purple-100"
    }
  };

  const selectedColor = colorMap[color] || colorMap.rose;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-black uppercase text-slate-400">{label}</span>
        {/* Use the mapped text color class */}
        <span className={`text-sm font-black ${selectedColor.text}`}>{score || 0}%</span>
      </div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        {/* Use the mapped background color class */}
        <div 
          className={`${selectedColor.bg} h-full transition-all duration-700`} 
          style={{ width: `${score || 0}%` }} 
        />
      </div>
    </div>
  );
};

export default AdminReportPage;