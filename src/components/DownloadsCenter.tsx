import React from 'react';
import { Download, FileText, Volume2, Image as ImageIcon, Video, Trash2, ShieldCheck, Share2 } from 'lucide-react';

interface DownloadCenterProps {
  isDarkMode: boolean;
  scripts: { name: string; content: string; size: string }[];
  audioFiles: { name: string; url: string; size: string }[];
  thumbnails: { name: string; url: string; size: string }[];
  videos: { name: string; url: string; size: string; timestamp: string }[];
  onRemoveScript: (idx: number) => void;
  onRemoveAudio: (idx: number) => void;
  onRemoveThumbnail: (idx: number) => void;
  onRemoveVideo: (idx: number) => void;
}

export default function DownloadsCenter({
  isDarkMode,
  scripts,
  audioFiles,
  thumbnails,
  videos,
  onRemoveScript,
  onRemoveAudio,
  onRemoveThumbnail,
  onRemoveVideo
}: DownloadCenterProps) {

  const triggerDownloadTxt = (name: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const hasAnyDownloads = scripts.length > 0 || audioFiles.length > 0 || thumbnails.length > 0 || videos.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3.5 pb-5 border-b border-opacity-10 border-slate-500">
        <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-sm">
          <Download className="w-5.5 h-5.5" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Direct Asset Downloads Center</h1>
          <p className="text-sm opacity-60">Collect, preview, and download scripts, synthesized voiceovers, structured visual slides, and final MP4 compositions.</p>
        </div>
      </div>

      {!hasAnyDownloads ? (
        <div className={`p-12 rounded-2xl border text-center ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 mx-auto mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-lg mb-1">Your Vault is Secure</h3>
          <p className="text-xs opacity-60 max-w-sm mx-auto mb-6">You haven't generated any downloadable media assets yet. Use any of our Workspace tools to begin compiling material.</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* 1. Scripts */}
          {scripts.length > 0 && (
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="font-bold text-sm text-purple-400 mb-4 flex items-center gap-1.5"><FileText className="w-4 h-4" /> Exportable Script Drafts</h3>
              <div className="space-y-3.5">
                {scripts.map((item, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 text-xs font-semibold ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><FileText className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-[10px] opacity-50 font-mono mt-0.5">Size: {item.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => triggerDownloadTxt(item.name, item.content)}
                        className={`p-2.5 rounded-lg border hover:scale-105 transition-all text-purple-400 ${isDarkMode ? 'bg-slate-950 border-slate-850 hover:bg-slate-900' : 'bg-white hover:bg-slate-50'}`}
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemoveScript(idx)}
                        className={`p-2.5 rounded-lg border text-red-500 hover:text-red-400 ${isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-white'}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Audio files */}
          {audioFiles.length > 0 && (
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="font-bold text-sm text-emerald-400 mb-4 flex items-center gap-1.5"><Volume2 className="w-4 h-4" /> Synthesized Audio Tracks</h3>
              <div className="space-y-3.5">
                {audioFiles.map((item, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 text-xs font-semibold ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Volume2 className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-[10px] opacity-50 font-mono mt-0.5">Size: {item.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={item.url}
                        download={item.name}
                        className={`p-2.5 rounded-lg border hover:scale-105 transition-all text-emerald-400 ${isDarkMode ? 'bg-slate-950 border-slate-850 hover:bg-slate-900' : 'bg-white hover:bg-slate-50'}`}
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => onRemoveAudio(idx)}
                        className={`p-2.5 rounded-lg border text-red-500 hover:text-red-400 ${isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-white'}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Thumbnails */}
          {thumbnails.length > 0 && (
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="font-bold text-sm text-blue-400 mb-4 flex items-center gap-1.5"><ImageIcon className="w-4 h-4" /> Canvas Designs snapshot</h3>
              <div className="space-y-3.5">
                {thumbnails.map((item, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 text-xs font-semibold ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded overflow-hidden border border-opacity-10 border-slate-500 shrink-0"><img src={item.url} className="w-full h-full object-cover" /></div>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-[10px] opacity-50 font-mono mt-0.5">Format: PNG | Size: {item.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={item.url}
                        download={item.name}
                        className={`p-2.5 rounded-lg border hover:scale-105 transition-all text-blue-400 ${isDarkMode ? 'bg-slate-950 border-slate-850 hover:bg-slate-900' : 'bg-white hover:bg-slate-50'}`}
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => onRemoveThumbnail(idx)}
                        className={`p-2.5 rounded-lg border text-red-500 hover:text-red-400 ${isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-white'}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Complete Videos */}
          {videos.length > 0 && (
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="font-bold text-sm text-indigo-400 mb-4 flex items-center gap-1.5"><Video className="w-4 h-4" /> Compiled Productions</h3>
              <div className="space-y-3.5">
                {videos.map((item, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 text-xs font-semibold ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><Video className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-[10px] opacity-40 font-mono mt-0.5">Rendered: {item.timestamp} | Size: {item.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={item.url}
                        download={item.name}
                        className={`p-2.5 rounded-lg border hover:scale-105 transition-all text-indigo-400 ${isDarkMode ? 'bg-slate-950 border-slate-850 hover:bg-slate-900' : 'bg-white hover:bg-slate-50'}`}
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => onRemoveVideo(idx)}
                        className={`p-2.5 rounded-lg border text-red-500 hover:text-red-400 ${isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-white'}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
