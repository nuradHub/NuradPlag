import { useContext } from 'react';
import { Search, Globe, MoreVertical, ExternalLink } from 'lucide-react';
import { AppContext } from '../../context/Context';

const RightSideBar = () => {
  const { report } = useContext(AppContext);

  const scrollToSource = (sourceId) => {
    const elementId = `source-${sourceId}`;
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const isAI = sourceId === 'ai-content';
      const ringColor = isAI ? 'ring-purple-500' : 'ring-blue-500';

      element.classList.add('ring-4', ringColor, 'ring-offset-2', 'z-50');

      setTimeout(() => {
        element.classList.remove('ring-4', ringColor, 'ring-offset-2', 'z-50');
      }, 2000);

    } else {
      console.warn(`Target ${elementId} not found. This highlight might be filtered out by thresholds.`);
    }
  };

  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex-col shrink-0 overflow-y-auto hidden lg:flex">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <h3 className="font-bold text-slate-700 text-sm">
          Matching Sources ({report?.sources?.length || 0})
        </h3>
        <Search size={16} className="text-slate-400" />
      </div>

      <div className="p-4 space-y-4">
        {report &&
          [...report.sources].map(source => (
            <SourceItem
              key={source._id}
              title={source.title}
              link={source.url}
              percent={source.matchPercentage}
              type={source.type}
              color={source.type === 'AI Content' ? "text-purple-600 bg-purple-50" : "text-rose-600 bg-rose-50"}
              onClick={() => scrollToSource(source._id)}
            />
          ))
        }
      </div>
    </aside>
  );
};

const SourceItem = ({ title, link, percent, type, color, onClick }) => (
  <div
    onClick={onClick}
    className="p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group bg-white truncate"
  >
    <div className="flex justify-between items-start mb-2">
      <div className={`p-1.5 rounded-lg ${color}`}>
        <Globe size={14} />
      </div>
      <MoreVertical size={14} className="text-slate-300" />
    </div>
    <h4 className="text-xs font-bold text-slate-800 mb-1 group-hover:text-blue-600 truncate">{title}</h4>
    <div className="flex items-center gap-1 text-[10px] text-blue-500 mb-3">
      <ExternalLink size={10} />
      <a href={link} target='_parent' rel="noreferrer" onClick={(e) => e.stopPropagation()}>{link}</a>
    </div>
    <div className="flex items-center justify-between">
      <div className="w-24 bg-slate-100 h-1 rounded-full overflow-hidden">
        <div className="bg-blue-500 h-full" style={{ width: percent }} />
      </div>
      <span className="text-[10px] font-black text-slate-900">{percent}</span>
    </div>
    <div className={`mt-2 text-[8px] font-black uppercase tracking-widest ${color.split(' ')[0]} text-center py-1 rounded-md`}>
      {type}
    </div>
  </div>
);

export default RightSideBar;