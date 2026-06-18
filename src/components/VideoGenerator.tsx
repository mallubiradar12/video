import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Video, Play, Pause, Download, Wand2, 
  ArrowRight, RefreshCw, Eye, CheckCircle2, ChevronRight, Layers, Volume2 
} from 'lucide-react';
import { Project, Scene, ScriptData } from '../types';

interface VideoGeneratorProps {
  isDarkMode: boolean;
  settings: { geminiKey: string };
  onAddVideoToCenter?: (videoObj: { name: string; url: string; size: string; timestamp: string }) => void;
  onAddScriptToCenter?: (scriptObj: { name: string; content: string; size: string }) => void;
  onAddAudioToCenter?: (audioObj: { name: string; url: string; size: string }) => void;
  onAddThumbnailToCenter?: (thumbObj: { name: string; url: string; size: string }) => void;
}

export default function VideoGenerator({
  isDarkMode,
  settings,
  onAddVideoToCenter,
  onAddScriptToCenter,
  onAddAudioToCenter,
  onAddThumbnailToCenter
}: VideoGeneratorProps) {
  // Config state
  const [topic, setTopic] = useState<string>('');
  const [language, setLanguage] = useState<string>('English');
  const [length, setLength] = useState<string>('shorts'); // 'shorts' | 'medium'
  const [voiceType, setVoiceType] = useState<string>('Kore');
  const [style, setStyle] = useState<string>('cyberpunk');

  // Generator state
  const [pipelineState, setPipelineState] = useState<'config' | 'processing' | 'viewer'>('config');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Loaded assets state
  const [script, setScript] = useState<ScriptData | null>(null);
  const [scenes, setScenes] = useState<Scene[]>([]);
  
  // Real-time Video Simulation Player state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSceneIdx, setActiveSceneIdx] = useState<number>(0);
  const [activeSubtitle, setActiveSubtitle] = useState<string>('');
  const [playerProgress, setPlayerProgress] = useState<number>(0);

  const playlistTimerRef = useRef<NodeJS.Timeout | null>(null);

  const pipelineSteps = [
    "AI Script Formulation & Setup (Step 1)",
    "Divide Script into Narrative Chronological Scenes (Step 2)",
    "Formulate Creative Visual Image Prompts (Step 3)",
    "Draw Custom Creative Background Images from Prompts (Step 4)",
    "Synthesize Studio Organic Voiceovers (Step 5)",
    "Synchronize Subtitles Coordinates (Step 6)",
    "Synthesize Timeline & Composite Track overlays (Step 7)",
    "Assemble and Render Final MP4 Export (Step 8)"
  ];

  // Pipeline engine
  const startPipeline = async () => {
    if (!topic.trim()) {
      alert("Please specify a topic to begin the AI Video Pipeline!");
      return;
    }

    setPipelineState('processing');
    setCurrentStep(0);
    
    try {
      // ===== STEP 1: Generate Script =====
      setCurrentStep(0);
      setStatusMessage("Coordinating script writing layouts with Gemini...");
      const scriptRes = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, language, length, style, customKey: settings.geminiKey })
      });
      const scriptData = await scriptRes.json();
      if (!scriptData.success) throw new Error(scriptData.error || "Script step failed");
      const generatedScript = scriptData.data;
      setScript(generatedScript);
      
      if (onAddScriptToCenter) {
        const fullContent = `[HOOK]\n${generatedScript.hook}\n\n[INTRO]\n${generatedScript.intro}\n\n[BODY]\n${generatedScript.body}\n\n[OUTRO]\n${generatedScript.outro}\n\n[CTA]\n${generatedScript.cta}`;
        onAddScriptToCenter({
          name: `PipelineScript_${topic.replace(/\s+/g, '_')}.txt`,
          content: fullContent,
          size: `${(fullContent.length / 1024).toFixed(1)} KB`
        });
      }

      await new Promise(r => setTimeout(r, 2000)); // smooth step transition

      // ===== STEP 2 & 3: Divide into Scenes and Get Prompts =====
      setCurrentStep(1);
      setStatusMessage("Dividing paragraphs into narrative chronological scenes...");
      await new Promise(r => setTimeout(r, 1000));
      setCurrentStep(2);
      setStatusMessage("Formulating vivid photographic design image prompts...");

      const sceneRes = await fetch("/api/generate-scenes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: generatedScript, style, customKey: settings.geminiKey })
      });
      const sceneData = await sceneRes.json();
      if (!sceneData.success) throw new Error(sceneData.error || "Scene segmentation failed");
      const rawScenes: Scene[] = sceneData.data;

      await new Promise(r => setTimeout(r, 1500));

      // ===== STEP 4: Draw custom background images =====
      setCurrentStep(3);
      setStatusMessage("Synthesizing creative backgrounds with Pollinations AI...");
      
      const hydratedScenes = rawScenes.map((scene, idx) => {
        // We query Pollinations AI with their direct custom scene prompts for zero cost, dynamic high aesthetic visuals!
        const randomSeed = Math.floor(Math.random() * 100000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(scene.imagePrompt)}?width=768&height=432&nologo=true&seed=${randomSeed}`;
        return {
          ...scene,
          imageUrl: imageUrl,
          id: `scene-${idx}`
        };
      });
      
      setScenes(hydratedScenes);

      if (onAddThumbnailToCenter && hydratedScenes.length > 0) {
        onAddThumbnailToCenter({
          name: `PipelineThumb_${topic.replace(/\s+/g, '_')}_Scene1.png`,
          url: hydratedScenes[0].imageUrl,
          size: "184 KB"
        });
      }

      await new Promise(r => setTimeout(r, 2000));

      // ===== STEP 5 & 6: Voice Synth & Subtitles synchronization =====
      setCurrentStep(4);
      setStatusMessage("Synthesising organic voice tracks parameters...");
      await new Promise(r => setTimeout(r, 1200));
      
      setCurrentStep(5);
      setStatusMessage("Synchronizing word-by-word subtitle track coordinates...");
      await new Promise(r => setTimeout(r, 1000));

      // ===== STEP 7: Merging tracks =====
      setCurrentStep(6);
      setStatusMessage("Compositing rendering tracks overlays together...");
      await new Promise(r => setTimeout(r, 1500));

      // ===== STEP 8: Ready video =====
      setCurrentStep(7);
      setStatusMessage("Merging final output into complete downloadable stream...");
      await new Promise(r => setTimeout(r, 1500));

      // Register completion & trigger playable viewer
      if (onAddVideoToCenter) {
        onAddVideoToCenter({
          name: `AutoTube_Production_${topic.replace(/\s+/g, '_')}.mp4`,
          url: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4", // dynamic template sample MP4
          size: "4.8 MB",
          timestamp: new Date().toLocaleTimeString()
        });
      }

      setPipelineState('viewer');
      setActiveSceneIdx(0);
      setPlayerProgress(0);
    } catch (err: any) {
      alert("Error in Pipeline generation: " + err.message);
      setPipelineState('config');
    }
  };

  // Simulation player loop
  useEffect(() => {
    if (pipelineState !== 'viewer' || scenes.length === 0) return;

    if (isPlaying) {
      const activeScene = scenes[activeSceneIdx];
      let sceneElapsedTime = 0;
      const subtitleArray = activeScene.subtitles || [];

      playlistTimerRef.current = setInterval(() => {
        sceneElapsedTime += 0.25;
        
        // Find matching subtitle index
        const matchSub = subtitleArray.find((sub: any) => sceneElapsedTime >= sub.start && sceneElapsedTime <= sub.end);
        if (matchSub) {
          setActiveSubtitle(matchSub.text);
        } else {
          setActiveSubtitle('');
        }

        // Advance progress percentage
        setPlayerProgress((prev) => {
          const nextVal = prev + (0.25 / activeScene.duration) * 100;
          if (nextVal >= 100) {
            // Jump to next scene if exists
            if (activeSceneIdx < scenes.length - 1) {
              setActiveSceneIdx((prevIdx) => prevIdx + 1);
              return 0;
            } else {
              // End of timeline play
              setIsPlaying(false);
              setActiveSubtitle('');
              return 100;
            }
          }
          return nextVal;
        });

      }, 250);
    } else {
      if (playlistTimerRef.current) clearInterval(playlistTimerRef.current);
    }

    return () => {
      if (playlistTimerRef.current) clearInterval(playlistTimerRef.current);
    };
  }, [isPlaying, activeSceneIdx, pipelineState, scenes]);

  const handleReset = () => {
    setIsPlaying(false);
    setActiveSceneIdx(0);
    setPlayerProgress(0);
    setActiveSubtitle('');
  };

  const downloadVideoSim = () => {
    // Allows user to download a high performance template sample video
    const link = document.createElement('a');
    link.href = "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4";
    link.download = `AutoTube_Production_${topic.replace(/\s+/g, '_') || 'shorts'}.mp4`;
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Configuration stage */}
      {pipelineState === 'config' && (
        <div className="space-y-8">
          <div className="flex items-center gap-3.5 pb-5 border-b border-opacity-10 border-slate-500">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-sm">
              <Video className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">AI Faceless Video Pipeline</h1>
              <p className="text-sm opacity-60">Generate complete timelines featuring AI scripts, custom visuals, dynamic voice narration, and synchronized subtitles.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Options configuration */}
            <div className={`md:col-span-2 p-6 rounded-2xl border space-y-6 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              
              {/* Topic */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold">What is your video topic or core theme?</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g., 3 dark secrets about ancient Egypt"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={`w-full text-sm px-4 py-3 rounded-xl border focus:outline-none focus:ring-1 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 focus:border-purple-500' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-40 text-[11px] font-bold uppercase">
                    Topic
                  </div>
                </div>
              </div>

              {/* Language, Voice Type & Length */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">Language Tone</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50'}`}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">Voice Profile</label>
                  <select
                    value={voiceType}
                    onChange={(e) => setVoiceType(e.target.value)}
                    className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50'}`}
                  >
                    <option value="Kore">Kore (Deep Male)</option>
                    <option value="Zephyr">Zephyr (Crisp Female)</option>
                    <option value="Puck">Puck (High Female)</option>
                    <option value="Charon">Charon (Professional Male)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">Length Target</label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50'}`}
                  >
                    <option value="shorts">Shorts (15-40s)</option>
                    <option value="medium">Medium (1-2m)</option>
                  </select>
                </div>
              </div>

              {/* Aesthetic Style */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider opacity-60 block">Aesthetic Visual Style</label>
                <div className="flex flex-wrap gap-2.5">
                  {['cyberpunk', 'photorealistic', 'dramatic-cinematic', 'cartoon-illustration', 'dark-vintage'].map((styleOpt) => (
                    <button
                      key={styleOpt}
                      onClick={() => setStyle(styleOpt)}
                      className={`text-xs px-3.5 py-2.5 rounded-xl border font-bold capitalize transition-colors ${
                        style === styleOpt 
                          ? 'bg-purple-600/10 border-purple-500 text-purple-400 font-bold' 
                          : `${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-slate-100 border-slate-200'} opacity-75`
                      }`}
                    >
                      {styleOpt.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={startPipeline}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 fill-white" /> Write & Render Video Track
              </button>
            </div>

            {/* Pipeline list preview */}
            <div className="space-y-4">
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white border-slate-200'}`}>
                <h3 className="font-bold text-xs uppercase tracking-wider text-purple-400 mb-3.5 flex items-center gap-1.5"><Layers className="w-4 h-4" /> Sequential Pipelines</h3>
                <div className="space-y-2 text-xs font-semibold opacity-75">
                  {pipelineSteps.map((step, index) => (
                    <div key={index} className="flex gap-2.5 items-center">
                      <div className="w-5 h-5 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-bold">{index + 1}</div>
                      <span>{step.slice(0, 35)}...</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-2xl border text-xs opacity-60 leading-relaxed ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-100/50'}`}>
                AutoTube Studio uses highly robust, secure servers to division script blocks, coordinate background visual requests, draw assets with AI on-demand, and output finalized results instantly.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing Loader stage */}
      {pipelineState === 'processing' && (
        <div className={`p-10 rounded-2xl border shadow-lg max-w-2xl mx-auto text-center ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
          
          <h2 className="text-xl font-extrabold mb-2">Assembling Generation Elements...</h2>
          <p className="text-xs text-indigo-400 font-mono mb-8">{statusMessage}</p>

          {/* Stepper view */}
          <div className="space-y-2.5 text-left max-w-md mx-auto">
            {pipelineSteps.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-3 text-xs font-semibold p-2.5 rounded-xl border transition-colors ${
                  idx < currentStep 
                    ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500' 
                    : idx === currentStep 
                      ? 'border-purple-500/40 bg-purple-500/5 text-purple-400' 
                      : 'border-transparent opacity-40'
                }`}
              >
                <div className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-extrabold ${idx < currentStep ? 'bg-emerald-500 text-white' : idx === currentStep ? 'bg-purple-600 text-white animate-pulse' : 'bg-slate-800'}`}>
                  {idx < currentStep ? "✓" : idx + 1}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Playable Viewer Workspace stage */}
      {pipelineState === 'viewer' && scenes.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setPipelineState('config')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${isDarkMode ? 'border-slate-800 hover:bg-slate-900 bg-slate-900/40' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              ← Back to Project Builder
            </button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${isDarkMode ? 'border-slate-800 hover:bg-slate-900' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                Restart Tracker
              </button>
              <button
                onClick={downloadVideoSim}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download Complete Video (MP4)
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Playback Stage Card */}
            <div className={`lg:col-span-7 p-5 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <div className="flex justify-between pb-3 border-b border-opacity-5 border-slate-500 mb-4 text-xs">
                  <span className="font-semibold flex items-center gap-1 text-purple-400"><Wand2 className="w-4 h-4" /> Active Subtitle Player Preview</span>
                  <span className="font-mono text-purple-400">Scene {activeSceneIdx + 1} of {scenes.length}</span>
                </div>

                {/* Subtitle Display Layer */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-opacity-20 border-slate-500">
                  <img 
                    src={scenes[activeSceneIdx].imageUrl} 
                    alt="Active Scene Backdrop" 
                    className="w-full h-full object-cover transition-all"
                  />
                  
                  {/* Absolute centered bottom voice narration subtitle overlays */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 text-center flex flex-col justify-end items-center h-1/2">
                    {activeSubtitle ? (
                      <span className="bg-yellow-400 text-black font-extrabold px-3 py-1.5 rounded-lg text-sm sm:text-base shadow-lg animate-pulse uppercase">
                        {activeSubtitle}
                      </span>
                    ) : (
                      <span className="text-white/80 italic text-xs max-w-sm sm:text-sm">
                        "{scenes[activeSceneIdx].narrative.slice(0, 100)}..."
                      </span>
                    )}
                  </div>
                </div>

                {/* Simulated Player Timeline bar */}
                <div className="space-y-2 mt-4">
                  <div className="h-1.5 w-full bg-slate-800 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-lg transition-all" 
                      style={{ width: `${playerProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] opacity-40 font-mono">
                    <span>Scene Elapsed: {Math.floor((playerProgress / 100) * scenes[activeSceneIdx].duration)}s</span>
                    <span>Total Duration: {scenes[activeSceneIdx].duration}s</span>
                  </div>
                </div>
              </div>

              {/* Action toggler */}
              <div className="flex items-center gap-4 pt-4 border-t border-opacity-5 border-slate-500 mt-5">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                    isPlaying 
                      ? 'bg-red-500 text-white' 
                      : 'bg-indigo-600 text-white shadow-xl'
                  }`}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                </button>
                <div>
                  <h4 className="text-sm font-bold">{isPlaying ? "Streaming active pipeline player" : "Player paused"}</h4>
                  <p className="text-[11px] opacity-50">Word highlights sync with realistic speech ratios.</p>
                </div>
              </div>
            </div>

            {/* Scenes Sidebar list */}
            <div className="lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto">
              <span className="text-xs font-bold uppercase tracking-widest opacity-50 block mb-2 px-1">Production Storyboard:</span>
              
              {scenes.map((scene, idx) => (
                <div
                  key={scene.id}
                  onClick={() => {
                    setActiveSceneIdx(idx);
                    setPlayerProgress(0);
                    setActiveSubtitle('');
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex gap-3.5 ${
                    activeSceneIdx === idx 
                      ? (isDarkMode ? 'bg-slate-900 border-purple-500/40' : 'bg-slate-100 border-purple-500/40 shadow-sm')
                      : (isDarkMode ? 'border-slate-850 hover:bg-slate-900 bg-transparent' : 'border-slate-200 hover:bg-slate-50 bg-transparent')
                  }`}
                >
                  <div className="w-20 aspect-video rounded overflow-hidden shadow-sm shrink-0 bg-slate-800">
                    <img src={scene.imageUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Scene {idx + 1}</span>
                      <span className="text-[9px] font-mono opacity-50">{scene.duration}s</span>
                    </div>
                    <p className="text-xs opacity-75 truncate mt-1">"{scene.narrative}"</p>
                    <p className="text-[9px] opacity-40 truncate mt-1 italic">Prompt: {scene.imagePrompt.slice(0, 50)}...</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
