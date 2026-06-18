import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, Sparkles, Download, Move, Type, Plus, Trash2, Smile, RefreshCw } from 'lucide-react';
import { ThumbnailLayer } from '../types';

interface ThumbnailStudioProps {
  isDarkMode: boolean;
  onAddThumbnailToCenter?: (thumbObj: { name: string; url: string; size: string }) => void;
}

const DEFAULT_BACKGROUNDS = [
  { name: 'Dark Cyberpunk', url: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?q=80&w=720&auto=format&fit=crop' },
  { name: 'Quantum Energy', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=720&auto=format&fit=crop' },
  { name: 'Cinematic Space', url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=720&auto=format&fit=crop' },
  { name: 'Organic Soft Gradient', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=720&auto=format&fit=crop' }
];

const DEFAULT_STICKERS = ["🔥", "😱", "👉", "⚡", "🔴", "💯", "❌", "👑", "🚀"];

export default function ThumbnailStudio({ isDarkMode, onAddThumbnailToCenter }: ThumbnailStudioProps) {
  const [bgUrl, setBgUrl] = useState<string>(DEFAULT_BACKGROUNDS[0].url);
  const [layers, setLayers] = useState<ThumbnailLayer[]>([
    { id: '1', type: 'text', content: 'SECRET', x: 260, y: 150, fontSize: 50, color: '#facc15', bgColor: '#000000' },
    { id: '2', type: 'text', content: 'REVEALED!', x: 240, y: 220, fontSize: 40, color: '#ffffff', bgColor: '#ea580c' }
  ]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>('1');
  const [customText, setCustomText] = useState<string>('');
  const [customBgInput, setCustomBgInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Redraw canvas whenever layers or bgUrl changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = bgUrl;
    img.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw dark vignette gradient overlay for text readability
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 100, 
        canvas.width / 2, canvas.height / 2, canvas.width / 1.5
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0.1)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.65)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Layers
      layers.forEach((layer) => {
        ctx.save();
        if (layer.type === 'text') {
          const fontSize = layer.fontSize || 36;
          ctx.font = `bold ${fontSize}px "Space Grotesk", "Helvetica Neue", sans-serif`;
          const textWidth = ctx.measureText(layer.content).width;
          const padding = 12;

          // Draw layer background if exists
          if (layer.bgColor) {
            ctx.fillStyle = layer.bgColor;
            ctx.fillRect(
              layer.x - padding, 
              layer.y - fontSize + 3, 
              textWidth + padding * 2, 
              fontSize + padding
            );
          }

          // Text content
          ctx.fillStyle = layer.color || '#ffffff';
          ctx.fillText(layer.content, layer.x, layer.y);

          // Render selection highlight border
          if (selectedLayerId === layer.id) {
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 2;
            ctx.strokeRect(
              layer.x - padding - 4,
              layer.y - fontSize - 2,
              textWidth + padding * 2 + 8,
              fontSize + padding + 6
            );
          }
        } else if (layer.type === 'sticker') {
          ctx.font = `48px sans-serif`;
          ctx.fillText(layer.content, layer.x, layer.y);

          if (selectedLayerId === layer.id) {
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(layer.x - 5, layer.y - 40, 60, 50);
          }
        }
        ctx.restore();
      });

      // Save as latest snapshot
      try {
        const urlSnapshot = canvas.toDataURL("image/png");
        setImageUrl(urlSnapshot);
      } catch (e) {
        console.warn("Base64 snapshot blocked due to cross-origin image policy.", e);
      }
    };
  }, [layers, bgUrl, selectedLayerId]);

  const addTextLayer = () => {
    const textVal = customText.trim() || 'NEW TEXT';
    const newLayer: ThumbnailLayer = {
      id: Date.now().toString(),
      type: 'text',
      content: textVal,
      x: 150 + Math.random() * 100,
      y: 150 + Math.random() * 100,
      fontSize: 36,
      color: '#ffffff',
      bgColor: '#ea580c'
    };
    setLayers(prev => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
    setCustomText('');
  };

  const addStickerLayer = (stickerStr: string) => {
    const newLayer: ThumbnailLayer = {
      id: Date.now().toString(),
      type: 'sticker',
      content: stickerStr,
      x: 200 + Math.random() * 150,
      y: 200 + Math.random() * 100
    };
    setLayers(prev => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  const deleteSelectedLayer = () => {
    if (!selectedLayerId) return;
    setLayers(prev => prev.filter(l => l.id !== selectedLayerId));
    setSelectedLayerId(null);
  };

  const updateSelectedLayerProperty = (property: keyof ThumbnailLayer, value: any) => {
    if (!selectedLayerId) return;
    setLayers(prev => prev.map(layer => {
      if (layer.id === selectedLayerId) {
        return { ...layer, [property]: value };
      }
      return layer;
    }));
  };

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    try {
      const dataUrl = canvas.toDataURL("image/png");
      const name = `AutoTube_Thumbnail_${Date.now().toString().slice(-4)}.png`;
      
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = name;
      link.click();

      if (onAddThumbnailToCenter) {
        onAddThumbnailToCenter({
          name: name,
          url: dataUrl,
          size: "244 KB"
        });
      }
    } catch (e) {
      // Cross origin workaround: open in new tab
      alert("Opening generated design in a separate window. Right click to save as image.");
      const newWin = window.open();
      if (newWin) {
        newWin.document.write(`<img src="${imageUrl}" style="max-width:100%; border-radius:12px; margin:20px; box-shadow:0 10px 25px rgba(0,0,0,0.2)"/>`);
      }
    }
  };

  const selectedLayer = layers.find(l => l.id === selectedLayerId);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3.5 pb-5 border-b border-opacity-10 border-slate-500">
        <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-sm">
          <ImageIcon className="w-5.5 h-5.5" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Thumbnail Designer Studio</h1>
          <p className="text-sm opacity-60">Design and export custom high-CTR thumbnails directly inside your workspace.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Editor Settings Sidebar */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Add Text */}
          <div className={`p-4 rounded-xl border space-y-3.5 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-65 flex items-center gap-1.5"><Type className="w-4 h-4 text-purple-400" /> Layer Composer</h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Insert custom text overlay..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className={`flex-1 text-xs px-3 py-2 rounded-lg border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 focus:border-purple-500' : 'bg-slate-50'}`}
                onKeyDown={(e) => { if (e.key === 'Enter') addTextLayer(); }}
              />
              <button
                onClick={addTextLayer}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 rounded-lg flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Stickers List */}
            <div className="space-y-1.5">
              <span className="text-[10px] opacity-50 uppercase tracking-widest font-semibold flex items-center gap-1"><Smile className="w-3.5 h-3.5" /> Stamp Sticker Overlays</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {DEFAULT_STICKERS.map((sticker) => (
                  <button
                    key={sticker}
                    onClick={() => addStickerLayer(sticker)}
                    className={`w-9 h-9 text-lg rounded-lg border hover:scale-105 transition-transform flex items-center justify-center ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100'}`}
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Layer Properties */}
          {selectedLayer ? (
            <div className={`p-5 rounded-xl border space-y-4 ${isDarkMode ? 'bg-slate-950 border-indigo-500/20' : 'bg-white border-indigo-500/20 shadow-md'}`}>
              <div className="flex items-center justify-between pb-2 border-b border-opacity-10 border-slate-500">
                <span className="text-xs font-bold text-indigo-400">Layer Settings: "{selectedLayer.content.slice(0, 15)}"</span>
                <button
                  onClick={deleteSelectedLayer}
                  className="text-red-500 hover:text-red-400 text-xs font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              {/* Position controls */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] opacity-50 uppercase tracking-wider font-semibold">Position Left/Right</span>
                  <input
                    type="range"
                    min="10"
                    max="600"
                    value={selectedLayer.x}
                    onChange={(e) => updateSelectedLayerProperty('x', parseInt(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] opacity-50 uppercase tracking-wider font-semibold">Position Up/Down</span>
                  <input
                    type="range"
                    min="30"
                    max="450"
                    value={selectedLayer.y}
                    onChange={(e) => updateSelectedLayerProperty('y', parseInt(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>

              {selectedLayer.type === 'text' && (
                <>
                  {/* size and colors controls */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="opacity-50 uppercase tracking-wider">Font Size</span>
                      <span className="text-indigo-400">{selectedLayer.fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="14"
                      max="100"
                      value={selectedLayer.fontSize || 36}
                      onChange={(e) => updateSelectedLayerProperty('fontSize', parseInt(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] opacity-50 uppercase font-bold">Font Color</span>
                      <input
                        type="color"
                        value={selectedLayer.color || '#ffffff'}
                        onChange={(e) => updateSelectedLayerProperty('color', e.target.value)}
                        className="w-full h-8 rounded-lg cursor-pointer bg-transparent border border-opacity-10 border-slate-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] opacity-50 uppercase font-bold">Backdrop Color</span>
                      <input
                        type="color"
                        value={selectedLayer.bgColor || '#000000'}
                        onChange={(e) => updateSelectedLayerProperty('bgColor', e.target.value)}
                        className="w-full h-8 rounded-lg cursor-pointer bg-transparent border border-opacity-10 border-slate-500"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={`p-4 rounded-xl border text-center text-xs opacity-50 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              Click a layer overlay on the visual display container to toggle positioning sliders.
            </div>
          )}

          {/* Background Selection */}
          <div className={`p-4 rounded-xl border space-y-3 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-65 flex items-center gap-1.5"><ImageIcon className="w-4 h-4" /> Canvas Backgrounds</h3>
            
            <div className="grid grid-cols-2 gap-2">
              {DEFAULT_BACKGROUNDS.map((bg) => (
                <button
                  key={bg.name}
                  onClick={() => setBgUrl(bg.url)}
                  className={`p-1.5 rounded-lg border text-left overflow-hidden hover:opacity-90 relative transition-transform ${bgUrl === bg.url ? 'border-indigo-500' : 'border-transparent'}`}
                >
                  <img src={bg.url} alt={bg.name} className="w-full h-10 object-cover rounded" />
                  <span className="text-[9px] font-semibold mt-1 block truncate opacity-80">{bg.name}</span>
                </button>
              ))}
            </div>

            {/* Custom Background URL input */}
            <div className="space-y-1 pt-2 border-t border-opacity-5 border-slate-500">
              <span className="text-[10px] opacity-40 uppercase tracking-widest font-semibold">Web Background URL:</span>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Paste direct visual link..."
                  value={customBgInput}
                  onChange={(e) => setCustomBgInput(e.target.value)}
                  className={`flex-1 text-[11px] px-2.5 py-1.5 rounded border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50'}`}
                />
                <button
                  onClick={() => { if (customBgInput) { setBgUrl(customBgInput); setCustomBgInput(''); } }}
                  className="bg-indigo-600 px-3 rounded text-[10px] font-bold text-white shrink-0"
                >
                  Load
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Live Canvas Workspace */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center relative shadow-sm ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            
            {/* Visual Guide Header */}
            <div className="w-full flex items-center justify-between pb-3.5 border-b border-opacity-5 border-slate-500 mb-4 text-xs">
              <span className="font-semibold flex items-center gap-1 opacity-70"><Move className="w-3.5 h-3.5 text-indigo-400" /> Active Layer Dragging / Layout Frame</span>
              <span className="font-mono text-[10px] font-bold uppercase py-0.5 px-2 bg-indigo-500/10 text-indigo-400 rounded-full">16:9 Standard</span>
            </div>

            {/* Hidden canvas renderer */}
            <canvas 
              ref={canvasRef} 
              width={768} 
              height={432} 
              className="hidden" 
            />

            {/* Interactive container */}
            <div className="relative border border-opacity-30 border-slate-500 rounded-xl overflow-hidden aspect-video w-full bg-slate-900 group">
              <img 
                src={imageUrl || bgUrl} 
                alt="Interactive Thumbnail Layer" 
                className="w-full h-full object-cover" 
              />

              {/* Layer Draggable / Selector overlays directly */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {layers.map((layer) => (
                  <div
                    key={layer.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLayerId(layer.id);
                    }}
                    className={`absolute p-1 border rounded cursor-pointer pointer-events-auto select-none transition-colors ${
                      selectedLayerId === layer.id 
                        ? 'border-indigo-500' 
                        : 'border-transparent group-hover:border-white/35'
                    }`}
                    style={{
                      left: `${(layer.x / 768) * 100}%`,
                      top: `${(layer.y / 432) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      fontSize: layer.type === 'text' ? `${((layer.fontSize || 36) / 432) * 100}cqh` : '3cqh'
                    }}
                  >
                    {/* Visual target pointer */}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] opacity-40 text-center mt-3 leading-relaxed">
              *All text and sticker boundaries can be fine-tuned chronologically using properties panel sliders.
            </p>
          </div>

          {/* Core Save controls */}
          <div className="flex justify-between items-center bg-slate-900/10 p-2.5 rounded-xl border border-dashed border-opacity-30 border-slate-500">
            <span className="text-xs opacity-60 flex items-center gap-1"><Sparkles className="w-4 h-4 text-indigo-400" /> Layer Composer v2.1</span>
            <button
              onClick={downloadPng}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-4 h-4" /> Save Thumbnail PNG
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
