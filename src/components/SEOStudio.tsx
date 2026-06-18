import React, { useState } from 'react';
import { Search, Sparkles, Copy, Check, Info, FileText, ChevronRight } from 'lucide-react';
import { SEOData } from '../types';

interface SEOStudioProps {
  isDarkMode: boolean;
  settings: { geminiKey: string };
}

export default function SEOStudio({ isDarkMode, settings }: SEOStudioProps) {
  const [topic, setTopic] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [seoResult, setSeoResult] = useState<SEOData | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const triggerSEO = async () => {
    if (!topic.trim()) {
      alert("Please specify a topic, keyword or script theme!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          customKey: settings.geminiKey
        })
      });
      const resData = await res.json();
      if (resData.success && resData.data) {
        setSeoResult(resData.data);
      } else {
        throw new Error(resData.error || "SEO Generation Failed");
      }
    } catch (err: any) {
      alert("Error generating SEO: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const defaultSuggestedTags = [
    "faceless channel help",
    "youtube growth strategy",
    "youtube automation tutorial",
    "make money online",
    "ai video editor tool",
    "viral video strategies"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3.5 pb-5 border-b border-opacity-10 border-slate-500">
        <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shadow-sm">
          <Search className="w-5.5 h-5.5" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">AI Viral SEO Generator</h1>
          <p className="text-sm opacity-60">Generate high-CTR titles, semantic tag groups, and hashtags to fuel search indexes.</p>
        </div>
      </div>

      {/* Input panel */}
      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold block mb-1.5">What is your video topic or core keyword?</label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g., Space Colonization, Quantum Computers, 5 Signs of Burnout"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className={`flex-1 px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 focus:border-orange-500' : 'bg-slate-50 border-slate-200 focus:focus-orange-500'
                }`}
                onKeyDown={(e) => { if (e.key === 'Enter') triggerSEO(); }}
              />
              <button
                onClick={triggerSEO}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-colors flex items-center gap-1.5 shrink-0"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 fill-white" /> Optimize Metadata
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-50 text-xs">
            <Info className="w-3.5 h-3.5" />
            <span>Uses deep semantic optimization to match search engine indices for rapid initial traction.</span>
          </div>
        </div>
      </div>

      {/* Results Workspace */}
      {seoResult ? (
        <div className="space-y-6">
          {/* Title Variations */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="font-bold text-base mb-4 text-orange-500 flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Recommended Click-Worthy Titles
            </h3>
            <div className="space-y-3">
              {seoResult.titles.map((titleStr, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 text-sm font-semibold ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold opacity-40">#{idx + 1}</span>
                    <p className="opacity-90">{titleStr}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(titleStr, `title-${idx}`)}
                    className={`p-2 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-950 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-100'}`}
                    title="Copy Title"
                  >
                    {copiedKey === `title-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Tags Split view */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Optimized Description */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-opacity-10 border-slate-500 mb-4">
                  <h3 className="font-bold text-sm text-indigo-400">Optimized YouTube Description</h3>
                  <button
                    onClick={() => handleCopy(seoResult.description, 'description')}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border text-indigo-400 flex items-center gap-1 hover:bg-indigo-500/10 transition-colors"
                  >
                    {copiedKey === 'description' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Desc
                  </button>
                </div>
                <div className={`p-4 rounded-xl text-xs font-mono max-h-[220px] overflow-y-auto leading-relaxed border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  {seoResult.description}
                </div>
              </div>
              <p className="text-[10px] opacity-40 mt-3 pt-3 border-t border-opacity-5 border-slate-500">Includes core indexing tags, safe monetization hooks and disclaimer buffers.</p>
            </div>

            {/* Tags Grid Column */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-opacity-10 border-slate-500 mb-4">
                  <h3 className="font-bold text-sm text-emerald-400">Discover Tags</h3>
                  <button
                    onClick={() => handleCopy(seoResult.tags.join(', '), 'tags')}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border text-emerald-400 flex items-center gap-1 hover:bg-emerald-500/10 transition-colors"
                  >
                    {copiedKey === 'tags' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy List
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {seoResult.tags.map((tag, i) => (
                    <span key={i} className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hashtags list */}
              <div className="pt-4 border-t border-opacity-15 border-slate-500 mt-4">
                <p className="text-xs font-bold mb-2 opacity-50">Trend Hashtags:</p>
                <div className="flex flex-wrap gap-2">
                  {seoResult.hashtags.map((hCode, i) => (
                    <span 
                      key={i} 
                      onClick={() => handleCopy(hCode, `hashtag-${i}`)}
                      className="text-xs font-mono font-bold text-orange-400 hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      {hCode} {copiedKey === `hashtag-${i}` && <span className="text-[9px] text-emerald-500">(copied!)</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className={`p-10 rounded-2xl border text-center ${isDarkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-white border-slate-200'}`}>
          <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mx-auto mb-4">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-lg mb-1">Analyze Your Target Topic</h3>
          <p className="text-xs opacity-60 max-w-sm mx-auto mb-6">Input your desired target keyword above to let Gemini synthesize high-performance SEO indices.</p>
          <div className="flex justify-center items-center gap-4 flex-wrap max-w-md mx-auto">
            {defaultSuggestedTags.map((tName, i) => (
              <span 
                key={i} 
                onClick={() => setTopic(tName)}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-full border cursor-pointer hover:border-orange-500/60 transition-colors flex items-center gap-1 leading-none ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}
              >
                {tName} <ChevronRight className="w-3 h-3" />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
