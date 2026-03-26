import { useState, useEffect } from 'react';
import { Mail, Clock, CheckCircle, Reply, Send, ArrowLeft } from 'lucide-react'; // Added ArrowLeft
import { toast } from 'react-toastify';
import axios from 'axios';
import FormatDate from '../../utils/FormatDate';

const AdminSupport = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const inquiryMessages = async () => {
    try {
      const response = await axios.get('/inquiry')
      if (response.data) {
        setInquiries(response.data)
      }
    } catch (err) {
      toast.error(err.response?.data?.message)
      console.log(err)
    }
  }

  const filteredInquiries = inquiries.filter(item => item.status === activeTab);

  const handleSendReply = async () => {
    if (!replyText.trim()) return toast.error("Please enter a response");

    setIsSending(true);
    try {
      const response = await axios.post('/admin/reply-support', {
        inquiryId: selectedInquiry._id,
        replyMessage: replyText
      });

      if (response.data) {
        toast.success("Response sent to student");
      }
      setReplyText('');
      await inquiryMessages();
      // On mobile, you might want to stay on the view to see the "Resolved" state, 
      // but let's update the local selected state
      setSelectedInquiry({...selectedInquiry, status: 'resolved', replyMessage: replyText});
    } catch (err) {
      toast.error("Transmission failed");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    inquiryMessages()
  }, [])

  return (
    <div className="flex h-[calc(100vh-80px)] bg-slate-50 overflow-hidden relative">

      {/* 1. SIDEBAR: Ticket List */}
      {/* Mobile logic: Hide sidebar if an inquiry is selected on small screens */}
      <div className={`w-full md:w-96 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ${selectedInquiry ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 md:p-6 border-b border-slate-100">
          <h1 className="text-lg md:text-xl font-black text-slate-900 mb-4">NuradSupport Inbox</h1>

          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'pending' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              <Clock size={14} /> Pending
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'resolved' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500'}`}
            >
              <CheckCircle size={14} /> Resolved
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredInquiries.length > 0 ? filteredInquiries.map((ticket) => (
            <div
              key={ticket._id}
              onClick={() => setSelectedInquiry(ticket)}
              className={`p-4 md:p-5 border-b border-slate-50 cursor-pointer transition-all hover:bg-slate-50 ${selectedInquiry?._id === ticket._id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-slate-900 text-sm truncate mr-2">{ticket.fullname}</span>
                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{FormatDate(ticket.createdAt)}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {ticket.message}
              </p>
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center h-full opacity-40 grayscale">
              <Mail size={48} />
              <p className="text-sm font-bold mt-2">No {activeTab} tickets</p>
            </div>
          )}
        </div>
      </div>

      {/* 2. MAIN VIEW: Conversation Details */}
      {/* Mobile logic: Show as full screen overlay if selectedInquiry exists */}
      <div className={`${selectedInquiry ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-slate-50/50 absolute inset-0 z-20 md:relative md:z-0`}>
        {selectedInquiry ? (
          <>
            {/* Header */}
            <div className="bg-white p-4 md:p-6 border-b border-slate-200 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3 md:gap-4">
                {/* Mobile Back Button */}
                <button 
                  onClick={() => setSelectedInquiry(null)}
                  className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm md:text-base">
                  {selectedInquiry.fullname.split('')[0]}
                </div>
                <div className="max-w-[150px] md:max-w-none">
                  <h2 className="font-bold text-slate-900 text-sm md:text-base truncate">{selectedInquiry.fullname}</h2>
                  <p className="text-[10px] md:text-xs text-slate-500 truncate">{selectedInquiry.email}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="hidden sm:block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ticket ID</span>
                <span className="bg-slate-100 px-2 md:px-3 py-1 rounded-md text-[10px] md:text-xs font-mono text-slate-600">
                  #{selectedInquiry._id.substring(0, 8).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8">
              {/* Student Message */}
              <div className="flex gap-3 md:gap-4 max-w-full md:max-w-3xl">
                <div className="flex-1 bg-white border border-slate-200 p-4 md:p-6 rounded-2xl rounded-tl-none shadow-sm">
                  <p className="text-slate-800 text-sm md:text-base leading-relaxed italic">
                    "{selectedInquiry.message}"
                  </p>
                  <p className="text-[9px] md:text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-tighter">Sent via Student Dashboard</p>
                </div>
              </div>

              {/* Display Admin Reply if Resolved */}
              {selectedInquiry.status === 'resolved' && (
                <div className="flex flex-row-reverse gap-3 md:gap-4 max-w-full md:max-w-3xl ml-auto text-right">
                  <div className="flex-1 bg-indigo-600 text-white p-4 md:p-6 rounded-2xl rounded-tr-none shadow-indigo-200 shadow-xl text-left">
                    <p className="text-sm md:text-base leading-relaxed">
                      {selectedInquiry.replyMessage}
                    </p>
                    <p className="text-[9px] md:text-[10px] text-indigo-200 font-bold mt-4 uppercase tracking-tighter">Replied by Support Team</p>
                  </div>
                </div>
              )}
            </div>

            {/* Reply Input (Only show for Pending) */}
            {selectedInquiry.status === 'pending' && (
              <div className="p-4 md:p-8 bg-white border-t border-slate-200">
                <div className="relative group">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your official response..."
                    className="w-full h-32 md:h-40 bg-slate-50 border-2 border-slate-100 rounded-2xl md:rounded-3xl p-4 md:p-6 text-sm md:text-base text-slate-900 focus:bg-white focus:border-indigo-600/20 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none resize-none"
                  />
                  <button
                    onClick={handleSendReply}
                    disabled={isSending}
                    className="mt-3 md:mt-0 md:absolute md:bottom-4 md:right-4 w-full md:w-auto bg-slate-900 text-white px-6 py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-indigo-600 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                  >
                    {isSending ? 'Sending...' : 'Send Response'}
                    <Send size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
            <div className="p-10 rounded-full bg-slate-100 mb-6">
              <Reply size={48} className="opacity-20" />
            </div>
            <p className="font-bold uppercase tracking-[0.2em] text-xs">Select an inquiry to begin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupport;