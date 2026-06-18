import React, { useState, useEffect } from 'react';
import { 
  Play, Sparkles, Video, Download, Layers, ShieldCheck, 
  ArrowRight, FileText, Volume2, Image as ImageIcon, Zap, 
  Clock, ShieldAlert, LogOut, Moon, Sun, Monitor, Menu, X, CheckSquare, Search, Key, HelpCircle
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import VideoGenerator from './components/VideoGenerator';
import ScriptStudio from './components/ScriptStudio';
import VoiceStudio from './components/VoiceStudio';
import ThumbnailStudio from './components/ThumbnailStudio';
import SEOStudio from './components/SEOStudio';
import DownloadsCenter from './components/DownloadsCenter';
import Settings from './components/Settings';

import { Project, UserSettings, UserProfile } from './types';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Authentication status
  const [authMode, setAuthMode] = useState<'landing' | 'login' | 'signup' | 'forgot_password' | 'workspace'>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile>({ email: '', isLoggedIn: false });
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [fullNameInput, setFullNameInput] = useState<string>('');

  // App workspace active tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Unified global stores for direct mock / full-stack downloads synchronisation
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'demo-1',
      title: 'Secret History of Rome',
      topic: 'Roman Legions Secrets',
      language: 'English',
      length: 'shorts',
      voiceType: 'Kore',
      style: 'dramatic-cinematic',
      createdAt: '2026-06-18',
      status: 'completed',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=720&auto=format&fit=crop'
    },
    {
      id: 'demo-2',
      title: 'Stoicism vs Panic',
      topic: 'Ancient philosophy tips',
      language: 'English',
      length: 'shorts',
      voiceType: 'Zephyr',
      style: 'cyberpunk',
      createdAt: '2026-06-18',
      status: 'draft'
    }
  ]);
  const [savedScripts, setSavedScripts] = useState<{ name: string; content: string; size: string }[]>([]);
  const [savedAudioFiles, setSavedAudioFiles] = useState<{ name: string; url: string; size: string }[]>([]);
  const [savedThumbnails, setSavedThumbnails] = useState<{ name: string; url: string; size: string }[]>([]);
  const [savedVideos, setSavedVideos] = useState<{ name: string; url: string; size: string; timestamp: string }[]>([
    {
      name: "AutoTube_Completed_Rome_Sim.mp4",
      url: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4",
      size: "4.8 MB",
      timestamp: "Today"
    }
  ]);

  // Keys parameters state
  const [userSettings, setUserSettings] = useState<UserSettings>({
    geminiKey: '',
    openRouterKey: '',
    huggingFaceKey: ''
  });

  // Mobile menu parameters
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Load credential parameters on load
  useEffect(() => {
    const savedKeys = localStorage.getItem('autotube_encrypted_settings');
    if (savedKeys) {
      try {
        setUserSettings(JSON.parse(savedKeys));
      } catch (e) {
        console.warn("Could not load stored keys", e);
      }
    }
  }, []);

  const handleSaveSettings = (newSet: UserSettings) => {
    setUserSettings(newSet);
    localStorage.setItem('autotube_encrypted_settings', JSON.stringify(newSet));
  };

  // Auth Operations
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!emailInput.trim()) {
      alert("Please specify a valid email address!");
      return;
    }
    setUserProfile({
      email: emailInput,
      isLoggedIn: true,
      name: fullNameInput || emailInput.split('@')[0]
    });
    setAuthMode('workspace');
    setActiveTab('dashboard');
  };

  const handleGoogleLogin = () => {
    setUserProfile({
      email: 'muttubiradar2325@gmail.com',
      isLoggedIn: true,
      name: 'Muttu Biradar'
    });
    setAuthMode('workspace');
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    if (confirm("Logout from current AutoTube Studio workspace session?")) {
      setUserProfile({ email: '', isLoggedIn: false });
      setAuthMode('landing');
    }
  };

  // Launch a video direct creation
  const handleCreateQuickVideo = (topicStr: string) => {
    setActiveTab('create');
    // We could pre-populate or set a timer
  };

  // Project select transition
  const handleSelectProject = (project: Project) => {
    if (project.status === 'completed') {
      setActiveTab('downloads');
    } else {
      setActiveTab('create');
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className={`min-h-screen transition-colors duration-200 font-sans ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        
        {/* LANDING VIEW */}
        {authMode === 'landing' && (
          <LandingPage
            onGetStarted={() => setAuthMode('signup')}
            onLogin={() => setAuthMode('login')}
            isDarkMode={isDarkMode}
          />
        )}

        {/* LOGIN FORM VIEW */}
        {authMode === 'login' && (
          <div className="min-h-screen flex items-center justify-center p-6 relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-xl border">
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={() => setAuthMode('landing')} className="text-xs font-semibold px-4 py-2 rounded-xl border">
                ← Back
              </button>
            </div>
            
            <div className={`w-full max-w-md p-8 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
              <div className="text-center space-y-2 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold mx-auto">
                  <Play className="fill-white w-5 h-5 ml-0.5" />
                </div>
                <h2 className="font-extrabold text-2xl tracking-tight">Welcome Back Creator</h2>
                <p className="text-xs opacity-60">Log in to coordinate your automated channel pipeline.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">Your Email</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. muttubiradar2325@gmail.com"
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 focus:border-purple-500' : 'bg-slate-50 border-slate-250'}`}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="uppercase tracking-wider opacity-60">Password</span>
                    <button type="button" onClick={() => setAuthMode('forgot_password')} className="text-indigo-400 hover:underline">Forgot?</button>
                  </div>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter account security key"
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 focus:border-purple-500' : 'bg-slate-50 border-slate-250'}`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-3 rounded-xl shadow-md transition-all mt-6"
                >
                  Verify Workspace Login
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-opacity-10 border-slate-400" /></div>
                <span className="relative bg-transparent text-[10px] uppercase font-bold tracking-widest px-3 opacity-40">Or Connect</span>
              </div>

              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                className={`w-full text-xs font-bold py-3.5 rounded-xl border flex items-center justify-center gap-2.5 transition-all ${isDarkMode ? 'border-slate-800 hover:bg-slate-950' : 'border-slate-250 hover:bg-slate-55'}`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.64l3.15-3.15C17.45 1.84 14.91 1 12 1 7.35 1 3.39 3.65 1.5 7.5l3.6 2.8C6.01 7.04 8.79 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.47-1.11 2.72-2.36 3.56v2.96h3.81c2.23-2.05 3.6-5.07 3.6-8.63z" />
                  <path fill="#FBBC05" d="M5.1 14.7c-.22-.67-.35-1.39-.35-2.13s.13-1.46.35-2.13l-3.6-2.8C.54 9.12 0 10.5 0 12s.54 2.88 1.5 4.37l3.6-2.7z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.81-2.96c-1.05.71-2.4 1.14-4.15 1.14-3.21 0-5.99-2-6.96-5.26l-3.6 2.8C3.39 20.35 7.35 23 12 23z" />
                </svg>
                Google Connect Access
              </button>

              <div className="text-center text-[11px] opacity-60 mt-6">
                Don't have a workspace? <button onClick={() => setAuthMode('signup')} className="text-indigo-400 font-bold hover:underline">Sign up</button>
              </div>
            </div>
          </div>
        )}

        {/* REGISTER VIEW */}
        {authMode === 'signup' && (
          <div className="min-h-screen flex items-center justify-center p-6 relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-xl border">
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={() => setAuthMode('landing')} className="text-xs font-semibold px-4 py-2 rounded-xl border">
                ← Back
              </button>
            </div>

            <div className={`w-full max-w-md p-8 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
              <div className="text-center space-y-2 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold mx-auto">
                  <Play className="fill-white w-5 h-5 ml-0.5" />
                </div>
                <h2 className="font-extrabold text-2xl tracking-tight">Create Creator Workspace</h2>
                <p className="text-xs opacity-60">Join AutoTube Studio and automate high-yield YouTube tracks.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullNameInput}
                    onChange={(e) => setFullNameInput(e.target.value)}
                    placeholder="e.g. Muttu Biradar"
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 focus:border-purple-500' : 'bg-slate-50'}`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">Your Email Address</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. muttubiradar2325@gmail.com"
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50'}`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">Create Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 6 characters"
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50'}`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs py-3 rounded-xl shadow-md transition-all mt-6"
                >
                  Configure Free Creator Account
                </button>
              </form>

              <div className="text-center text-[11px] opacity-60 mt-6">
                Already registered? <button onClick={() => setAuthMode('login')} className="text-indigo-400 font-bold hover:underline">Log in</button>
              </div>
            </div>
          </div>
        )}

        {/* FORGOT PASSWORD VIEW */}
        {authMode === 'forgot_password' && (
          <div className="min-h-screen flex items-center justify-center p-6 relative">
            <div className={`w-full max-w-sm p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-200'}`}>
              <h2 className="font-bold text-lg mb-2">Reset Account Access</h2>
              <p className="text-xs opacity-60 mb-4">Provide your workspace email address to receive secure bypass recovery passwords.</p>
              
              <input
                type="email"
                placeholder="muttubiradar2325@gmail.com"
                className={`w-full text-xs p-2.5 rounded-lg border mb-4 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50'}`}
              />

              <div className="flex gap-2">
                <button onClick={() => setAuthMode('login')} className="flex-1 text-xs font-semibold py-2 rounded-xl border">Cancel</button>
                <button onClick={() => { alert("Password bypass link emitted successfully!"); setAuthMode('login'); }} className="flex-1 bg-indigo-600 text-white font-semibold text-xs py-2 rounded-xl">Emit recovery</button>
              </div>
            </div>
          </div>
        )}

        {/* WORKSPACE GRAPHIC CONTROL PANEL LAYER */}
        {authMode === 'workspace' && (
          <div className="flex min-h-screen flex-col md:flex-row items-stretch">
            
            {/* Sidebar Navigation */}
            <aside className={`w-full md:w-64 border-r flex flex-col justify-between shrink-0 transition-colors ${
              isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'
            }`}>
              <div>
                {/* Brand Header */}
                <div className="p-5 border-b border-opacity-5 border-slate-500 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      <Play className="fill-white w-3.5 h-3.5 ml-0.5" />
                    </div>
                    <div>
                      <span className="font-extrabold text-sm bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">AutoTube</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">Studio</span>
                    </div>
                  </div>
                  
                  {/* Theme Switcher */}
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-1.5 rounded-lg border ${isDarkMode ? 'border-slate-800 bg-slate-900 text-amber-400' : 'border-slate-250 bg-slate-50'}`}
                    title="Toggle Interface Palette"
                  >
                    {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Profile Panel */}
                <div className="px-5 py-4 border-b border-opacity-5 border-slate-500 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    {userProfile.name ? userProfile.name[0].toUpperCase() : 'C'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate leading-none">{userProfile.name || 'Account Settings'}</p>
                    <p className="text-[9px] opacity-50 truncate mt-1">{userProfile.email || 'muttubiradar2325@gmail.com'}</p>
                  </div>
                </div>

                {/* Nav list */}
                <nav className="p-3 space-y-1">
                  {[
                    { id: 'dashboard', label: 'Console Dashboard', icon: <Monitor className="w-4 h-4" /> },
                    { id: 'create', label: 'Create Video Pipeline', icon: <Video className="w-4 h-4" /> },
                    { id: 'script', label: 'Script Studio', icon: <FileText className="w-4 h-4" /> },
                    { id: 'voice', label: 'Voice Synth Studio', icon: <Volume2 className="w-4 h-4" /> },
                    { id: 'thumbnail', label: 'Thumbnail Designer', icon: <ImageIcon className="w-4 h-4" /> },
                    { id: 'seo', label: 'Viral SEO Studio', icon: <Search className="w-4 h-4" /> },
                    { id: 'downloads', label: 'Asset Vault', icon: <Download className="w-4 h-4" /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                        activeTab === tab.id 
                          ? 'bg-purple-600/10 text-purple-400 font-bold border-l-2 border-purple-500' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Sidebar Footer settings / logout */}
              <div className="p-3 border-t border-opacity-5 border-slate-500 space-y-1">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full py-2 px-3.5 rounded-xl text-left text-xs font-bold flex items-center gap-2.5 transition-all ${
                    activeTab === 'settings' ? 'bg-purple-600/10 text-purple-400 border-l-2 border-purple-500' : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <Key className="w-4 h-4" /> Storage Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-3.5 rounded-xl text-left text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-2.5 opacity-75 hover:opacity-100"
                >
                  <LogOut className="w-4 h-4" /> Leave Workspace
                </button>
              </div>

            </aside>

            {/* Dynamic Board viewport */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
              
              {activeTab === 'dashboard' && (
                <Dashboard
                  isDarkMode={isDarkMode}
                  projects={projects}
                  onCreateQuickVideo={handleCreateQuickVideo}
                  onNavigateToTab={(tabId) => setActiveTab(tabId)}
                  onSelectProject={handleSelectProject}
                />
              )}

              {activeTab === 'create' && (
                <VideoGenerator
                  isDarkMode={isDarkMode}
                  settings={userSettings}
                  onAddVideoToCenter={(v) => setSavedVideos(prev => [v, ...prev])}
                  onAddScriptToCenter={(s) => setSavedScripts(prev => [s, ...prev])}
                  onAddAudioToCenter={(a) => setSavedAudioFiles(prev => [a, ...prev])}
                  onAddThumbnailToCenter={(t) => setSavedThumbnails(prev => [t, ...prev])}
                />
              )}

              {activeTab === 'script' && (
                <ScriptStudio
                  isDarkMode={isDarkMode}
                  settings={userSettings}
                  onAddScriptToCenter={(s) => setSavedScripts(prev => [s, ...prev])}
                />
              )}

              {activeTab === 'voice' && (
                <VoiceStudio
                  isDarkMode={isDarkMode}
                  settings={userSettings}
                  onAddAudioToCenter={(a) => setSavedAudioFiles(prev => [a, ...prev])}
                />
              )}

              {activeTab === 'thumbnail' && (
                <ThumbnailStudio
                  isDarkMode={isDarkMode}
                  onAddThumbnailToCenter={(t) => setSavedThumbnails(prev => [t, ...prev])}
                />
              )}

              {activeTab === 'seo' && (
                <SEOStudio
                  isDarkMode={isDarkMode}
                  settings={userSettings}
                />
              )}

              {activeTab === 'downloads' && (
                <DownloadsCenter
                  isDarkMode={isDarkMode}
                  scripts={savedScripts}
                  audioFiles={savedAudioFiles}
                  thumbnails={savedThumbnails}
                  videos={savedVideos}
                  onRemoveScript={(idx) => setSavedScripts(prev => prev.filter((_, i) => i !== idx))}
                  onRemoveAudio={(idx) => setSavedAudioFiles(prev => prev.filter((_, i) => i !== idx))}
                  onRemoveThumbnail={(idx) => setSavedThumbnails(prev => prev.filter((_, i) => i !== idx))}
                  onRemoveVideo={(idx) => setSavedVideos(prev => prev.filter((_, i) => i !== idx))}
                />
              )}

              {activeTab === 'settings' && (
                <Settings
                  isDarkMode={isDarkMode}
                  settings={userSettings}
                  onSaveSettings={handleSaveSettings}
                />
              )}

            </main>

          </div>
        )}

      </div>
    </div>
  );
}
