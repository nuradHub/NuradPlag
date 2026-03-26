import { Search, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const BlogPage = () => {

  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const requestBlogPost = async () => {
      try {
        const response = await axios.get('/blog')
        setBlog(response.data)
      } catch (err) {
        toast.error(err?.response?.data?.message)
        console.log(err)
      }
    }
    requestBlogPost()
  }, [])
  {


    return (
      <div className="bg-slate-950 min-h-screen text-slate-200 overflow-x-hidden">

        {/* 1. Blog Hero Section */}
        <section className="pt-15 pb-20 px-6 bg-linear-to-b from-slate-900 to-slate-950 border-b border-white/5">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
              <BookOpen size={14} /> NuradHub Insights
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">
              Our <span className="text-emerald-500">Journal</span> & News
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
              Stay updated with the latest in academic technology, writing ethics, and software updates from the Nuradplag team.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative pt-4">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
              <Search className="absolute left-4 top-7.5 text-slate-500" size={18} />
            </div>
          </div>
        </section>

        {/* 2. Blog Grid */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blog?.map((post) => (
              <article
                key={post._id}
                className="group bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all hover:-translate-y-2 shadow-xl"
              >
                {/* Image Header */}
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-emerald-500 font-bold text-sm pt-2 group-hover:gap-3 transition-all"
                  >
                    Read Article <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* 3. Newsletter / CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="bg-blue-600 rounded-[2.5rem] p-12 flex flex-col items-center text-center space-y-6 relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

            <h2 className="text-3xl font-bold text-white relative z-10">Stay Informed</h2>
            <p className="text-blue-100 max-w-md relative z-10">
              Subscribe to get the latest guides and feature updates delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md relative z-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl bg-white text-slate-900 focus:outline-none"
              />
              <button className="bg-slate-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    );
  };
}
export default BlogPage;