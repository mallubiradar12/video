import React, { useState } from 'react';
import { FileText, Sparkles, Download, Copy, Check, Eye, ChevronRight, Info, RefreshCw } from 'lucide-react';
import { ScriptData } from '../types';

interface ScriptStudioProps {
  isDarkMode: boolean;
  settings: { geminiKey: string };
  onAddScriptToCenter?: (scriptObj: { name: string; content: string; size: string }) => void;
}

export default function ScriptStudio({ isDarkMode, settings, onAddScriptToCenter }: ScriptStudioProps) {
  const [topic, setTopic] = useState<string>('');
  const [language, setLanguage] = useState<string>('English');
  const [length, setLength] = useState<string>('shorts'); // 'shorts' | 'medium' | 'long'
  const [style, setStyle] = useState<string>('educational');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [script, setScript] = useState<ScriptData | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleGenerateScript = async () => {
    if (!topic.trim()) {
      alert("Please specify a topic or theme to generate!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          language,
          length,
          style,
          customKey: settings.geminiKey
        })
      });

      const responseData = await res.json();
      if (responseData.success && responseData.data) {
        setScript(responseData.data);

        if (onAddScriptToCenter) {
          const contentString = `[HOOK]\n${responseData.data.hook}\n\n[INTRO]\n${responseData.data.intro}\n\n[BODY]\n${responseData.data.body}\n\n[OUTRO]\n${responseData.data.outro}\n\n[CALL TO ACTION]\n${responseData.data.cta}`;
          onAddScriptToCenter({
            name: `Script_${topic.replace(/\s+/g, '_')}.txt`,
            content: contentString,
            size: `${(contentString.length / 1024).toFixed(1)} KB`
          });
        }
      } else {
        throw new Error(responseData.error || "Generation endpoint failed");
      }
    } catch (err: any) {
      alert("Error generating script: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const downloadTxt = () => {
    if (!script) return;
    const content = `AutoTube Studio Generated Script\nTopic: ${topic}\nLanguage: ${language}\nLength: ${length}\nStyle: ${style}\n\n====== [HOOK] ======\n${script.hook}\n\n====== [INTRO] ======\n${script.intro}\n\n====== [BODY] ======\n${script.body}\n\n====== [OUTRO] ======\n${script.outro}\n\n====== [CALL TO ACTION] ======\n${script.cta}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AutoTube_Script_${topic.replace(/\s+/g, '_') || 'video'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Printable layout simulates clean PDF downloads beautifully
  const printPdf = () => {
    if (!script) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to export printable files!");
      return;
    }
    
    const htmlContent = `
      <html>
        <head>
          <title>Script Production Exporter - ${topic}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            h1 { font-size: 24px; color: #4f46e5; margin-bottom: 5px; }
            .meta { font-size: 12px; color: #64748b; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 30px; }
            .section-box { margin-bottom: 25px; padding: 15px; background: #f8fafc; border-left: 4px solid #4f46e5; border-radius: 4px; }
            .section-label { font-weight: bold; font-size: 12px; text-transform: uppercase; color: #4f46e5; margin-bottom: 6px; letter-spacing: 0.05em; }
            .section-body { font-size: 14px; }
          </style>
        </head>
        <body>
          <h1>AutoTube Script Exporter</h1>
          <div class="meta">Topic: ${topic} | Language: ${language} | Layout: ${length} | Mode: ${style}</div>
          
          <div class="section-box">
            <div class="section-label">Hook</div>
            <div class="section-body">${script.hook}</div>
          </div>
          <div class="section-box">
            <div class="section-label">Intro</div>
            <div class="section-body">${script.intro}</div>
          </div>
          <div class="section-box">
            <div class="section-label">Body Argument segments</div>
            <div class="section-body">${script.body}</div>
          </div>
          <div class="section-box">
            <div class="section-label">Outro</div>
            <div class="section-body">${script.outro}</div>
          </div>
          <div class="section-box">
            <div class="section-label">Call To Action (CTA)</div>
            <div class="section-body">${script.cta}</div>
          </div>
          
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3.5 pb-5 border-b border-opacity-10 border-slate-500">
        <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-sm">
          <FileText className="w-5.5 h-5.5" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Retention Script Studio</h1>
          <p className="text-sm opacity-60">Generate viral scripts with tailored, click-optimized structures for faceless YouTube channels.</p>
        </div>
      </div>

      {/* Control Box */}
      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="grid md:grid-cols-4 gap-4 items-end">
          
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-60">Video Topic or Theme</label>
            <input
              type="text"
              placeholder="e.g., 5 dark psychological tricks about marketing"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-slate-900 border-slate-800 focus:border-purple-500' : 'bg-slate-50 border-slate-200'}`}
              onKeyDown={(e) => { if (e.key === 'Enter') handleGenerateScript(); }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-60">Language Tone</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="German">German</option>
              <option value="French">French</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <button
            onClick={handleGenerateScript}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Writing...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 fill-white" /> Write AI Script
              </>
            )}
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-opacity-5 border-slate-500 text-xs">
          {/* length selectors */}
          <div className="flex items-center justify-between">
            <span className="opacity-60">Script Length:</span>
            <div className="flex gap-1.5">
              {['shorts', 'medium', 'long'].map((len) => (
                <button
                  key={len}
                  onClick={() => setLength(len)}
                  className={`px-2.5 py-1 rounded-lg border font-bold capitalize transition-colors ${length === len ? 'bg-purple-600/10 text-purple-400 border-purple-500/50' : 'border-transparent opacity-60'}`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between col-span-2">
            <span className="opacity-60">Storytelling Vibe:</span>
            <div className="flex gap-1.5">
              {['educational', 'dramatic', 'neon-cyberpunk', 'motivational'].map((vibe) => (
                <button
                  key={vibe}
                  onClick={() => setStyle(vibe)}
                  className={`px-2.5 py-1 rounded-lg border font-bold capitalize transition-colors ${style === vibe ? 'bg-purple-600/10 text-purple-400 border-purple-500/50' : 'border-transparent opacity-60'}`}
                >
                  {vibe.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Script Panels */}
      {script ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-semibold">
              <Info className="w-4 h-4" /> Click individual section icons to easily copy specific segments
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={downloadTxt}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  isDarkMode ? 'border-slate-800 hover:bg-slate-900' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Download className="w-3.5 h-3.5" /> TXT Exporter
              </button>
              <button
                onClick={printPdf}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                title="Print script or save to browser PDF format"
              >
                <Eye className="w-3.5 h-3.5" /> PDF Print Core
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Hook Segment */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <div className="flex items-center justify-between pb-2 mb-3.5 border-b border-opacity-5 border-slate-500">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Section 1: Retention Hook</span>
                  <button
                    onClick={() => handleCopy(script.hook, 'hook')}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    {copiedSection === 'hook' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm italic opacity-90 leading-relaxed font-serif">"{script.hook}"</p>
              </div>
              <p className="text-[10px] opacity-40 mt-3 pt-3 border-t border-opacity-5 border-slate-500">Hooks should be spoken in the first 4 seconds flat.</p>
            </div>

            {/* Intro Segment */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <div className="flex items-center justify-between pb-2 mb-3.5 border-b border-opacity-5 border-slate-500">
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Section 2: Intro Setup</span>
                  <button
                    onClick={() => handleCopy(script.intro, 'intro')}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    {copiedSection === 'intro' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm italic opacity-90 leading-relaxed font-serif">"{script.intro}"</p>
              </div>
              <p className="text-[10px] opacity-40 mt-3 pt-3 border-t border-opacity-5 border-slate-500">Transitions from Hook smoothly. Establishes visual trust.</p>
            </div>

            {/* Main body segments */}
            <div className={`p-5 rounded-2xl border md:col-span-2 flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <div className="flex items-center justify-between pb-2 mb-3.5 border-b border-opacity-5 border-slate-500">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Section 3: Core Narrative Body</span>
                  <button
                    onClick={() => handleCopy(script.body, 'body')}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    {copiedSection === 'body' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm opacity-90 leading-relaxed font-serif whitespace-pre-wrap">{script.body}</p>
              </div>
              <p className="text-[10px] opacity-40 mt-4 pt-3 border-t border-opacity-5 border-slate-500">Divided into core numbered visual scene markers.</p>
            </div>

            {/* Outro */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <div className="flex items-center justify-between pb-2 mb-3.5 border-b border-opacity-5 border-slate-500">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Section 4: Summary Outro</span>
                  <button
                    onClick={() => handleCopy(script.outro, 'outro')}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    {copiedSection === 'outro' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm italic opacity-90 leading-relaxed font-serif">"{script.outro}"</p>
              </div>
            </div>

            {/* CTA */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <div className="flex items-center justify-between pb-2 mb-3.5 border-b border-opacity-5 border-slate-500">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Section 5: Call To Action</span>
                  <button
                    onClick={() => handleCopy(script.cta, 'cta')}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    {copiedSection === 'cta' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm italic opacity-90 leading-relaxed font-serif">"{script.cta}"</p>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className={`p-12 border rounded-2xl text-center ${isDarkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-white border-slate-200'}`}>
          <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 mx-auto mb-4">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-lg mb-1">State Your Video Vision</h3>
          <p className="text-xs opacity-60 max-w-sm mx-auto mb-6">Input a target subject above. Our Gemini content script engine is ready to structure multi-section visual timing blocks.</p>
          <div className="flex justify-center items-center gap-4 flex-wrap max-w-md mx-auto text-[11px] font-bold">
            <span onClick={() => setTopic('Secret rules of ancient Stoicism')} className="cursor-pointer px-3.5 py-1.5 border hover:border-purple-500/70 transition-colors rounded-full leading-none flex items-center gap-1">Stoicism <ChevronRight className="w-3 h-3" /></span>
            <span onClick={() => setTopic('What happens if you sleep 10 hours daily?')} className="cursor-pointer px-3.5 py-1.5 border hover:border-purple-500/70 transition-colors rounded-full leading-none flex items-center gap-1">Sleep Health <ChevronRight className="w-3 h-3" /></span>
            <span onClick={() => setTopic('5 dark psychological marketing secrets')} className="cursor-pointer px-3.5 py-1.5 border hover:border-purple-500/70 transition-colors rounded-full leading-none flex items-center gap-1">Marketing <ChevronRight className="w-3 h-3" /></span>
          </div>
        </div>
      )}
    </div>
  );
}
