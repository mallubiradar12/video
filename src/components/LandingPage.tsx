import React, { useState } from 'react';
import { 
  Play, Sparkles, Wand2, Volume2, Image as ImageIcon, 
  Search, ShieldAlert, BadgeCheck, FileText, Download, 
  Layers, ArrowRight, Zap, CheckCircle2, ChevronDown, MessageSquare, Star
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  isDarkMode: boolean;
}

export default function LandingPage({ onGetStarted, onLogin, isDarkMode }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<'script' | 'images' | 'voice' | 'editor'>('script');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const demoTabs = {
    script: {
      title: "AI Script Studio",
      icon: <FileText className="w-5 h-5 text-purple-500" />,
      desc: "Generates fully timed hooks, intros, bodily arguments, outro paragraphs, and call-to-actions tailored for retention algorithms.",
      content: [
        { label: "Viral Hook", text: "Did you know that 87% of creators fail because they lose viewers in the first 3 seconds? Let's fix that." },
        { label: "The Intro", text: "Welcome back! Today, we are breaking down the exact mechanics behind the world's most profitable faceless channels." },
        { label: "Detailed Arguments", text: "1. Content Velocity: Generating consistent, high-yield videos. \n2. Context Retention: Feeding visual curiosity. \n3. Acoustic Polish: Perfect studio voices." }
      ]
    },
    images: {
      title: "Scene Visualizer",
      icon: <ImageIcon className="w-5 h-5 text-blue-500" />,
      desc: "Synthesizes stunning, ultra-creative cinematic illustrations or realistic backdrops frame-by-frame tailored to match your script narration.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
    },
    voice: {
      title: "Voice Synth",
      icon: <Volume2 className="w-5 h-5 text-emerald-500" />,
      desc: "Instant text-to-speech rendering high-fidelity, organic prebuilt human voices. Complete speed, posture, and pitch parameters adjusted live.",
      audio: "Demo Audio Voiceover file ready for previewing"
    },
    editor: {
      title: "Direct MP4 Renderer",
      icon: <Layers className="w-5 h-5 text-amber-500" />,
      desc: "Direct browser-integrated timeline player overlays custom styles, subtitles with word-by-word highlights, and merges them all into a portable download.",
      video: true
    }
  };

  const FAQs = [
    {
      q: "How does AutoTube Studio generate videos?",
      a: "AutoTube Studio orchestrates high-end AI micro-services. It writes dynamic retention-optimized scripts with Gemini, suggests scene transitions, gathers stunning stylistic images from lightning-fast generators, generates pristine voice overs, overlays subtitle tracks, and enables downloading high-fidelity project outputs directly from your dashboard."
    },
    {
      q: "Can I use my own API keys?",
      a: "Absolutely! AutoTube Studio is highly flexible. In the Settings tab, you can add and securely store your own Gemini, OpenRouter, or Hugging Face API tokens. These keys are locally encrypted."
    },
    {
      q: "Are the generated videos copyright-free for monetization?",
      a: "Yes! All scripts, generated voice assets via our synthesis engines, and visual assets are uniquely synthesized on-demand, which means they are fully customized for you and cleared for commercial use and YouTube Partner monetization."
    }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20">
              <Play className="fill-white w-4 h-4 ml-0.5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">AutoTube</span>
              <span className="text-xs font-semibold uppercase tracking-wider opacity-60 ml-1">Studio</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-80">
            <a href="#features" className="hover:opacity-100 transition-opacity">Features</a>
            <a href="#demo" className="hover:opacity-100 transition-opacity">Interactive Demo</a>
            <a href="#pricing" className="hover:opacity-100 transition-opacity">Pricing</a>
            <a href="#faq" className="hover:opacity-100 transition-opacity">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <button 
              onClick={onLogin}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}
            >
              Sign In
            </button>
            <button 
              onClick={onGetStarted}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-indigo-500/10 transition-all flex items-center gap-1.5"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-24 pb-16 px-6 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6 ${isDarkMode ? 'bg-purple-950/60 border border-purple-800/50 text-purple-300' : 'bg-purple-50 border border-purple-200 text-purple-800'}`}>
            <Sparkles className="w-3.5 h-3.5" /> First-ever fully localized premium faceless creator pipeline
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Generate Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">Faceless YouTube Videos</span> in Seconds
          </h1>
          <p className="text-lg sm:text-xl opacity-75 max-w-3xl mx-auto mb-10 leading-relaxed">
            Write timed retention-optimized scripts, draw artistic custom scenes, synthesize studio voiceovers with speed control, and download final packages optimized to go viral.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 transition-all text-base flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-white" /> Create a Video Free
            </button>
            <a
              href="#demo"
              className={`w-full sm:w-auto font-medium px-6 py-4 rounded-xl border transition-all text-base flex items-center justify-center gap-2 ${isDarkMode ? 'border-slate-800 hover:bg-slate-900 bg-slate-900/30' : 'border-slate-200 hover:bg-slate-100 bg-white'}`}
            >
              See Studio Demo
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-dashed border-opacity-30 border-slate-500">
            <div>
              <div className="text-3xl font-extrabold text-indigo-500">54,200+</div>
              <div className="text-sm opacity-60 mt-1">Videos Generated</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-purple-500">1.2M+</div>
              <div className="text-sm opacity-60 mt-1">Downloads Complete</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-500">99.4%</div>
              <div className="text-sm opacity-60 mt-1">Voice Organic Score</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-amber-500">&lt; 3 mins</div>
              <div className="text-sm opacity-60 mt-1">Rendering Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Showcase Section */}
      <section id="demo" className={`py-20 px-6 border-y ${isDarkMode ? 'bg-slate-900/40 border-slate-900' : 'bg-slate-100/50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Inside the AutoTube Workspace</h2>
            <p className="opacity-70 text-lg">Click the studio modes below to preview how our automated workflow transforms simple topics into viral assets.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            {/* Sidebar toggle */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {(Object.keys(demoTabs) as Array<keyof typeof demoTabs>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`p-4 rounded-xl border text-left transition-all flex gap-4 ${
                    activeTab === key 
                      ? (isDarkMode ? 'bg-slate-800 border-purple-500/50 shadow-md' : 'bg-white border-purple-500/50 shadow-md')
                      : (isDarkMode ? 'border-slate-800/70 hover:bg-slate-800/40 bg-transparent' : 'border-slate-200 hover:bg-slate-200/50 bg-transparent')
                  }`}
                >
                  <div className={`p-2.5 rounded-lg ${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-100'}`}>
                    {demoTabs[key].icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{demoTabs[key].title}</h3>
                    <p className="text-xs opacity-60 mt-0.5 line-clamp-2">{demoTabs[key].desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Stage Preview area */}
            <div className={`lg:col-span-8 rounded-2xl border p-6 flex flex-col justify-between transition-colors shadow-sm min-h-[380px] ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-opacity-20 border-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono opacity-50 ml-2">studio_simulation_{activeTab}.mp4</span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">Active Studio Mode</span>
                </div>

                <p className="text-sm opacity-80 mb-4 font-semibold text-purple-400">{demoTabs[activeTab].title} Preview:</p>
                
                {/* Content based on tab */}
                {activeTab === 'script' && (
                  <div className="space-y-3 font-sans text-sm">
                    {demoTabs.script.content.map((item, i) => (
                      <div key={i} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">{item.label}</div>
                        <p className="opacity-80 italic">"{item.text}"</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'images' && (
                  <div className="relative rounded-xl overflow-hidden aspect-video max-h-[220px] bg-slate-900 flex items-center justify-center">
                    <img 
                      src={demoTabs.images.image} 
                      alt="AI Scene Representation"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                      <span className="text-sm font-semibold text-white italic">"Cinematic abstract composition representing quantum energy..."</span>
                    </div>
                  </div>
                )}

                {activeTab === 'voice' && (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                          <Volume2 className="text-indigo-500 w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Organic Voice Engine (Male Voice - Kore)</p>
                          <p className="text-xs opacity-60">Pitch: Normal (1.0) | Speed: 1.1x speed</p>
                        </div>
                      </div>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                        <Play className="fill-white w-3 h-3" /> Preview Voice
                      </button>
                    </div>
                    <p className="text-xs opacity-50 italic">Generated dynamically using on-demand audio synthesis models.</p>
                  </div>
                )}

                {activeTab === 'editor' && (
                  <div className={`p-6 rounded-xl border border-dashed flex flex-col items-center justify-center text-center py-10 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-500">
                      <Download className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold mb-1">Interactive FFmpeg Rendering Core</h4>
                    <p className="text-xs opacity-60 max-w-sm mb-4">Merges customized narrative subtitles, dynamic visuals, and voiceovers into a single high-definition video track.</p>
                    <button 
                      onClick={onGetStarted}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Start Generating
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-opacity-10 border-slate-500 mt-6 flex items-center justify-between text-xs opacity-60">
                <span>AutoTube Studio v1.2</span>
                <span className="flex items-center gap-1"><BadgeCheck className="text-indigo-500 w-4 h-4" /> Ready to Render</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">Infinite Creator Value</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Everything You Need is Already Inside</h2>
          <p className="opacity-70">A comprehensive suite designed for faceless channels to build automated traffic on global networks.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'}`}>
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-5">
              <Wand2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Automated Script Generation</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Input any topic. Gettimed, retention-optimized viral text blocks matching the exact structure used by YouTube leaders to lock viewer attention.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'}`}>
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-5">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Creative Thumbnail Design</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Drag-and-drop overlays, scale text fields, add colored backdrops, and download highly conversion-optimized PNG thumbnails on our custom canvas frame.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'}`}>
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-5">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Deep Speech Pitch Synth</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Support pre-configured organic voice formats. Adjust pronunciation speeds, control Pitch modulators, review live, and instantly download raw MP3 files.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'}`}>
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-5">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Viral SEO Metadata</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Suggest catchy titles, tag arrays, trending search tags, and fully formatted descriptions rich in semantic indicators for rapid video placement.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'}`}>
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-5">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Project Asset Management</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Save scripts, thumbnails, scenes, custom voice configurations and timed subtitle coordinates inside a unified download center.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'}`}>
            <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Custom Developer Key Slots</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Fully input your custom Gemini or Hugging Face tokens. Encrypted locally and executed client-directly or server-proxied to save query fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={`py-20 px-6 border-t ${isDarkMode ? 'bg-slate-900/20 border-slate-900' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">Flexible SaaS Subscriptions</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 font-sans text-center">Unleash Uncapped Production</h2>
            <p className="opacity-70">Start free with demo modules, scale effortlessly using your own tokens or premium tier renders.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className={`p-8 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950/70 border-slate-800/80' : 'bg-white border-slate-200'}`}>
              <div>
                <h3 className="font-bold text-lg mb-2">Hobby Starter</h3>
                <p className="text-xs opacity-60 mb-6">Explore the automated video pipeline</p>
                <div className="text-4xl font-extrabold mb-1">$0</div>
                <p className="text-xs opacity-50 mb-6 font-medium">Free Forever</p>
                <ul className="space-y-3.5 text-sm opacity-80 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> standard script drafts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> 3 voice overs per day</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> Interactive Thumbnail Canvas</li>
                  <li className="flex items-center gap-2 text-red-500/70"><XCircleIcon className="w-4 h-4 shrink-0" /> No bulk MP4 rendering</li>
                </ul>
              </div>
              <button 
                onClick={onGetStarted}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
              >
                Sign Up Workspace
              </button>
            </div>

            {/* Creator */}
            <div className={`p-8 rounded-2xl border relative flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 border-purple-500/50 shadow-purple-950/30 shadow-lg' : 'bg-white border-purple-500/50 shadow-xl'}`}>
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
                Most Popular
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-purple-400">Creator Master</h3>
                <p className="text-xs opacity-60 mb-6">Perfect for scaling multiple faceless accounts</p>
                <div className="text-4xl font-extrabold mb-1">$29</div>
                <p className="text-xs opacity-50 mb-6 font-medium">per month / billed yearly</p>
                <ul className="space-y-3.5 text-sm opacity-80 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> Uncapped timing script models</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> Unlimited high-fidelity Voice Synth</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> Custom Scene visual draws</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> Fully timed Subtitle track overlays</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> Custom API Token slots enabled</li>
                </ul>
              </div>
              <button 
                onClick={onGetStarted}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-colors"
              >
                Start Creator Free
              </button>
            </div>

            {/* Agency */}
            <div className={`p-8 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950/70 border-slate-800/80' : 'bg-white border-slate-200'}`}>
              <div>
                <h3 className="font-bold text-lg mb-2">Agency Empire</h3>
                <p className="text-xs opacity-60 mb-6">Designed for automation multi-users</p>
                <div className="text-4xl font-extrabold mb-1">$79</div>
                <p className="text-xs opacity-50 mb-6 font-medium">per month</p>
                <ul className="space-y-3.5 text-sm opacity-80 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> Up to 5 sub-accounts slots</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> Bulk priority server synthesis</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> Dedicated HD timeline players</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="text-indigo-500 w-4 h-4 shrink-0" /> 24/7 priority developer assistance</li>
                </ul>
              </div>
              <button 
                onClick={onGetStarted}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
              >
                Inquire Empire
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Frequently Answered Contexts</h2>
        
        <div className="space-y-4">
          {FAQs.map((faq, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-xl border transition-colors ${isDarkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white border-slate-200'}`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center text-left font-bold"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <p className="mt-3.5 text-sm opacity-70 leading-relaxed pt-3 border-t border-opacity-10 border-slate-500">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 px-6 border-t ${isDarkMode ? 'bg-slate-900/30 border-slate-900' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold">Recommended By Digital Automation Pioneers</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex gap-1.5 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
              </div>
              <p className="text-sm opacity-80 mb-6 italic">"AutoTube Studio completely overhauled our pipeline. We went from taking 4 hours per Shorts edit to generating fully customizable assets in 3 clicks."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-400" />
                <div>
                  <h4 className="text-xs font-bold">Liam Peterson</h4>
                  <p className="text-[10px] opacity-50">Creator, 1.4M sub-accounts</p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex gap-1.5 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
              </div>
              <p className="text-sm opacity-80 mb-6 italic">"Being able to review voiceover script files directly alongside beautiful image prompts changed my faceless channel. Super fluid workflow!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-400" />
                <div>
                  <h4 className="text-xs font-bold">Sophia Martinez</h4>
                  <p className="text-[10px] opacity-50">Automated Network Operator</p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex gap-1.5 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
              </div>
              <p className="text-sm opacity-80 mb-6 italic">"The on-demand thumbnail creator is incredible. Adding text overlays overlaying beautiful customizable stickers works beautifully."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-400" />
                <div>
                  <h4 className="text-xs font-bold">Marcus Chen</h4>
                  <p className="text-[10px] opacity-50">Digital Marketing Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t px-6 text-sm opacity-80 transition-colors ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="font-bold">AutoTube Studio</span>
          </div>
          <p className="text-xs opacity-60">© 2026 AutoTube Studio. Production-Ready Platform for Intelligent Creators.</p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:opacity-100">Terms of Use</a>
            <a href="#" className="hover:opacity-100">Cookie Protocol</a>
            <a href="#" className="hover:opacity-100">Developer API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Minimal missing component definitions
function XCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
