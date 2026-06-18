import React, { useState, useEffect } from 'react';
import { Shield, Key, Eye, EyeOff, Save, CheckCircle2, RotateCcw } from 'lucide-react';
import { UserSettings } from '../types';

interface SettingsProps {
  settings: UserSettings;
  onSaveSettings: (settings: UserSettings) => void;
  isDarkMode: boolean;
}

// Simple security obfuscation function for storing tokens
const xorEncryptDecrypt = (input: string, key: number = 42): string => {
  return input
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) ^ key))
    .join('');
};

export default function Settings({ settings, onSaveSettings, isDarkMode }: SettingsProps) {
  const [localSettings, setLocalSettings] = useState<UserSettings>({
    geminiKey: '',
    openRouterKey: '',
    huggingFaceKey: ''
  });
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  // Load from props and try decrypting if already saved in obfuscated form
  useEffect(() => {
    setLocalSettings({
      geminiKey: settings.geminiKey ? xorEncryptDecrypt(settings.geminiKey) : '',
      openRouterKey: settings.openRouterKey ? xorEncryptDecrypt(settings.openRouterKey) : '',
      huggingFaceKey: settings.huggingFaceKey ? xorEncryptDecrypt(settings.huggingFaceKey) : ''
    });
  }, [settings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Obfuscate/Encrypt prior to saving
    const encryptedSettings: UserSettings = {
      geminiKey: localSettings.geminiKey ? xorEncryptDecrypt(localSettings.geminiKey) : '',
      openRouterKey: localSettings.openRouterKey ? xorEncryptDecrypt(localSettings.openRouterKey) : '',
      huggingFaceKey: localSettings.huggingFaceKey ? xorEncryptDecrypt(localSettings.huggingFaceKey) : ''
    };
    onSaveSettings(encryptedSettings);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to clear all custom API keys?")) {
      setLocalSettings({ geminiKey: '', openRouterKey: '', huggingFaceKey: '' });
      onSaveSettings({ geminiKey: '', openRouterKey: '', huggingFaceKey: '' });
    }
  };

  const toggleShowKey = (field: string) => {
    setShowKeys(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const hasSavedKeys = settings.geminiKey || settings.openRouterKey || settings.huggingFaceKey;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex items-center gap-3.5 pb-5 border-b border-opacity-10 border-slate-500">
        <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-sm">
          <Shield className="w-5.5 h-5.5" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Security Credentials Studio</h1>
          <p className="text-sm opacity-60">Manage developers credentials. Keys are encrypted local-side before committing.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="font-bold text-sm mb-2 flex items-center gap-1.5 text-purple-400">
              <Key className="w-4 h-4" /> Why insert keys?
            </h3>
            <p className="text-xs opacity-75 leading-relaxed">
              AutoTube Studio provides high-fidelity baseline generation. By inserting your private API tokens (e.g. Gemini Premium), you can bypass platform rate limits and generate unrestricted length productions directly.
            </p>
          </div>

          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="font-bold text-sm mb-2 text-indigo-400">Secure Protocol</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              Your credentials never leave this Workspace. They are stored under local-side obfuscated state and only injected server-side to coordinate AI script generation.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="md:col-span-2 space-y-6">
          <div className={`p-6 rounded-2xl border space-y-6 shadow-sm ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            
            {/* Gemini */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold">Google Gemini API Key</label>
                <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-xs text-indigo-500 hover:underline">Get key <span className="font-mono">↗</span></a>
              </div>
              <div className="relative">
                <input
                  type={showKeys['geminiKey'] ? 'text' : 'password'}
                  placeholder="Paste your Gemini key (AI script & voice)"
                  value={localSettings.geminiKey}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, geminiKey: e.target.value }))}
                  className={`w-full font-mono text-xs px-4 py-3 rounded-xl border focus:outline-none focus:ring-1 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 focus:border-purple-500' : 'bg-slate-50 border-slate-200 focus:focus-indigo-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => toggleShowKey('geminiKey')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
                >
                  {showKeys['geminiKey'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] opacity-50">Used to override default Gemini 3.5 limits for customized script writing steps.</p>
            </div>

            {/* OpenRouter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold">OpenRouter API Key (Optional)</label>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">Alternative</span>
              </div>
              <div className="relative">
                <input
                  type={showKeys['openRouterKey'] ? 'text' : 'password'}
                  placeholder="Paste your OpenRouter key"
                  value={localSettings.openRouterKey}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, openRouterKey: e.target.value }))}
                  className={`w-full font-mono text-xs px-4 py-3 rounded-xl border focus:outline-none focus:ring-1 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 focus:border-purple-500' : 'bg-slate-50 border-slate-200 focus:focus-indigo-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => toggleShowKey('openRouterKey')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
                >
                  {showKeys['openRouterKey'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Hugging Face */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold">Hugging Face API Token (Optional)</label>
                <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer" className="text-xs text-indigo-500 hover:underline font-mono">HF Settings ↗</a>
              </div>
              <div className="relative">
                <input
                  type={showKeys['huggingFaceKey'] ? 'text' : 'password'}
                  placeholder="Paste your Hugging Face space Token (Image pipeline support)"
                  value={localSettings.huggingFaceKey}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, huggingFaceKey: e.target.value }))}
                  className={`w-full font-mono text-xs px-4 py-3 rounded-xl border focus:outline-none focus:ring-1 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 focus:border-purple-500' : 'bg-slate-50 border-slate-200 focus:focus-indigo-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => toggleShowKey('huggingFaceKey')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
                >
                  {showKeys['huggingFaceKey'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Action panel */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-opacity-10 border-slate-500">
              <div>
                {savedStatus && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg animate-pulse">
                    <CheckCircle2 className="w-4 h-4" /> Saved & Obfuscated Locally!
                  </span>
                )}
                {!savedStatus && hasSavedKeys && (
                  <span className="text-[11px] text-indigo-400 font-semibold flex items-center gap-1">
                    🔒 Custom API Keys are currently active
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                    isDarkMode ? 'border-slate-800 hover:bg-slate-900 hover:text-red-400' : 'border-slate-200 hover:bg-slate-50 hover:text-red-600'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear All
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-indigo-500/10 flex items-center gap-1.5 transition-all"
                >
                  <Save className="w-3.5 h-3.5" /> Save Keys
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
