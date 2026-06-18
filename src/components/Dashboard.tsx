import React, { useState } from 'react';
import { 
  Play, Sparkles, Video, Download, Layers, ShieldCheck, 
  ArrowRight, FileText, Volume2, Image as ImageIcon, Zap, Clock, Star, Plus, ChevronRight 
} from 'lucide-react';
import { Project } from '../types';

interface DashboardProps {
  isDarkMode: boolean;
  projects: Project[];
  onCreateQuickVideo: (topic: string) => void;
  onNavigateToTab: (tab: string) => void;
  onSelectProject: (p: Project) => void;
}

export default function Dashboard({
  isDarkMode,
  projects,
  onCreateQuickVideo,
  onNavigateToTab,
  onSelectProject
}: DashboardProps) {
  const [quickTopic, setQuickTopic] = useState<string>('');

  const handleQuickLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTopic.trim()) return;
    onCreateQuickVideo(quickTopic);
    setQuickTopic('');
  };

  // Stats calculation
  const totalVideos = projects.filter(p => p.videoUrl).length + 3; // base 3 simulation
  const totalDownloads = projects.length + 8; // base 8 simulation
  const activeDrafts = projects.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Quick Launch Banner */}
      <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 border border-purple-500/10 bg-gradient-to-tr from-purple-900/30 via-indigo-900/20 to-slate-900">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 fill-purple-300" /> PRO CHANNELS AUTOMATED
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            Launch Your Next YouTube Project
          </h2>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            Specify a target topic below. AutoTube Studio will immediately division timed script segments, suggest clickworthy titles, and formulate creative image backdrops.
          </p>

          <form onSubmit={handleQuickLaunch} className="flex gap-2.5 max-w-md pt-2">
            <input
              type="text"
              placeholder="e.g. Secret history of Roman legions"
              value={quickTopic}
              onChange={(e) => setQuickTopic(e.target.value)}
              className={`flex-1 text-xs px-3.5 py-3 rounded-xl border focus:outline-none ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800 focus:border-purple-500' : 'bg-white border-slate-200'
              }`}
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 rounded-xl shadow-md transition-colors flex items-center gap-1 shrink-0"
            >
              Generate <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className={`p-5 rounded-xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider opacity-50">Total Videos</span>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Video className="w-4 h-4" /></div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold tracking-tight">{totalVideos}</div>
            <p className="text-[10px] text-emerald-500 font-semibold mt-1">✓ Live on workspace</p>
          </div>
        </div>

        <div className={`p-5 rounded-xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider opacity-50">Downloads</span>
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><Download className="w-4 h-4" /></div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold tracking-tight">{totalDownloads}</div>
            <p className="text-[10px] text-indigo-400 font-semibold mt-1">↑ Direct file saves</p>
          </div>
        </div>

        <div className={`p-5 rounded-xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider opacity-50">Active Drafts</span>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Clock className="w-4 h-4" /></div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold tracking-tight">{activeDrafts}</div>
            <p className="text-[10px] opacity-40 mt-1">Pending workspace edits</p>
          </div>
        </div>

        <div className={`p-5 rounded-xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider opacity-50">Automation Rate</span>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><ShieldCheck className="w-4 h-4" /></div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold tracking-tight">100%</div>
            <p className="text-[10px] text-emerald-500 font-semibold mt-1">✓ Secure Sandbox active</p>
          </div>
        </div>

      </div>

      {/* Grid of Tools Shortcut */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 px-1">Workspace Toolsets:</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => onNavigateToTab('script')}
            className={`p-4 rounded-xl border cursor-pointer hover:-translate-y-0.5 transition-all text-left ${isDarkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'}`}
          >
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-3"><FileText className="w-5 h-5" /></div>
            <h4 className="font-bold text-sm">Scripts Studio</h4>
            <p className="text-[10px] opacity-50 mt-1">Design Hooks, Intros, Outros</p>
          </div>

          <div 
            onClick={() => onNavigateToTab('voice')}
            className={`p-4 rounded-xl border cursor-pointer hover:-translate-y-0.5 transition-all text-left ${isDarkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'}`}
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-3"><Volume2 className="w-5 h-5" /></div>
            <h4 className="font-bold text-sm">Voiceover Synth</h4>
            <p className="text-[10px] opacity-50 mt-1">Multi-character Speeches</p>
          </div>

          <div 
            onClick={() => onNavigateToTab('thumbnail')}
            className={`p-4 rounded-xl border cursor-pointer hover:-translate-y-0.5 transition-all text-left ${isDarkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'}`}
          >
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3"><ImageIcon className="w-5 h-5" /></div>
            <h4 className="font-bold text-sm">Thumb Studio</h4>
            <p className="text-[10px] opacity-50 mt-1">Canvas Editor Overlay</p>
          </div>

          <div 
            onClick={() => onNavigateToTab('seo')}
            className={`p-4 rounded-xl border cursor-pointer hover:-translate-y-0.5 transition-all text-left ${isDarkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'}`}
          >
            <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-3"><Sparkles className="w-5 h-5" /></div>
            <h4 className="font-bold text-sm">AI SEO Studio</h4>
            <p className="text-[10px] opacity-50 mt-1">Viral Title, Tags & Hashtags</p>
          </div>

        </div>
      </section>

      {/* Recent Projects List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 px-1">Recent Master Projects:</h3>
          <button 
            onClick={() => onNavigateToTab('create')}
            className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1"
          >
            <Plus className="w-4.5 h-4.5" /> Start New
          </button>
        </div>

        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div 
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex justify-between gap-4 items-center ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:stroke-indigo-500 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500"><Video className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-xs">{proj.title}</h4>
                    <p className="text-[9px] opacity-50 font-mono mt-0.5">Topic: {proj.topic} | Tone: {proj.language}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    proj.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {proj.status}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-40 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`p-8 rounded-xl border text-center ${isDarkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-white border-slate-200'}`}>
            <p className="text-xs opacity-50 italic">Your project directory is empty. Quick-launch or navigate to the Video Generator to synthesize elements.</p>
          </div>
        )}
      </section>
    </div>
  );
}
