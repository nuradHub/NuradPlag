import { Bell, FileText, CheckCircle2, Clock, Circle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const NotificationItem = ({ notification, onRead, onDelete }) => {
  const { id, message, time, read, projectId } = notification;

  return (
    <div 
      onClick={() => onRead(id)}
      className={`relative group p-5 flex gap-4 transition-all cursor-pointer border-b border-slate-100 
        ${read ? 'bg-white opacity-70' : 'bg-blue-50/40 hover:bg-blue-50'}`}
    >
      {/* Status Dot (Only if unread) */}
      {!read && (
        <div className="absolute top-6 left-2">
          <Circle size={8} className="fill-blue-600 text-blue-600 animate-pulse" />
        </div>
      )}

      {/* Icon based on message content */}
      <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center 
        ${read ? 'bg-slate-100 text-slate-400' : 'bg-white shadow-sm text-blue-600'}`}>
        {message.toLowerCase().includes('approve') ? (
          <CheckCircle2 size={22} />
        ) : (
          <FileText size={22} />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex justify-between items-start gap-2">
          <p className={`text-sm leading-snug ${read ? 'text-slate-500' : 'text-slate-900 font-bold'}`}>
            {message}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-1">
          {/* Time Ago */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            <Clock size={12} />
            {formatDistanceToNow(new Date(time), { addSuffix: true })}
          </div>

          {/* Project Link Hint */}
          {projectId && (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter">
              ID: {projectId.slice(-6)}
            </span>
          )}
        </div>
      </div>

      {/* Hover Delete Action */}
      <button 
        onClick={(e) => { e.stopPropagation(); onDelete(id); }}
        className="group-hover:opacity-100 p-2 hover:bg-rose-50 text-rose-500 rounded-xl transition-all bg-slate-100"
      >
        <span className="text-sm font-bold px-1">Clear</span>
      </button>
    </div>
  );
};

export default NotificationItem;