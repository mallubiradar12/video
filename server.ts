import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up JSON parsing
app.use(express.json({ limit: '10mb' }));

// Helper to initialize Gemini SDK
function getGeminiClient(customKey?: string) {
  const apiKey = customKey || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Generate Script
app.post("/api/generate-script", async (req, res) => {
  try {
    const { topic, language, length, style, customKey } = req.body;
    const ai = getGeminiClient(customKey);

    const lengthWords = length === 'shorts' ? '100-150 words' : length === 'medium' ? '300-400 words' : '800-1000 words';

    if (!ai) {
      // Fallback response if API key is not configured yet
      const fallbackScript = {
        hook: `Did you know that ${topic} is changing everything we know about this field?`,
        intro: `Hey everyone! In this video, we are diving deep into the fascinating world of ${topic} and highlighting some critical secrets you've probably never heard before.`,
        body: `Let's break it down in a ${style} perspective. First, we notice a massive growth in public attention. Many experts suggest research here is accelerating at a breaking pace. Second, the long-term impact will touch every person, streamlining workflow and opening new doors. Finally, what makes this field special is how anyone can get started today!`,
        outro: `It's fascinating to see where this is going. Hopefully this guide gave you a solid grasp of where things stand.`,
        cta: `If you enjoyed this content, hit that like button, subscribe to AutoTube Studio, and leave a comment below about what you want to see next!`
      };
      return res.json({ success: true, isDemo: true, data: fallbackScript });
    }

    const systemPrompt = `You are an expert viral YouTube scriptwriter. Write a highly engaging video script in "${language}" language about "${topic}". The script must be in ${style} style, aiming for approximately ${lengthWords} total. Return the script STRICTLY formatted in standard JSON with these exact fields: "hook", "intro", "body", "outro", "cta". Do not put any markdown styling or block wrapper except pure JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Generate the video script now.",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const scriptData = JSON.parse(text.trim());
    res.json({ success: true, data: scriptData });
  } catch (err: any) {
    console.error("Generate script error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Split Script into Scenes & Generate Image Prompts
app.post("/api/generate-scenes", async (req, res) => {
  try {
    const { script, style, customKey } = req.body;
    const ai = getGeminiClient(customKey);

    const fullScriptText = `${script.hook}\n${script.intro}\n${script.body}\n${script.outro}\n${script.cta}`;

    if (!ai) {
      // Fallback structured scenes if API key not available
      const fallbackScenes = [
        {
          sceneNumber: 1,
          narrative: script.hook,
          imagePrompt: `Cinematic ultra-realistic visual depicting a striking conceptual representation of the hook: ${script.hook.slice(0, 80)}, 8k resolution, modern highly stylized aesthetic, ${style} vibes`,
          duration: Math.max(5, Math.ceil(script.hook.split(' ').length / 2.5)),
          subtitles: script.hook.split(', ').map((phrase: string, idx: number) => ({ text: phrase, start: idx * 2.5, end: (idx + 1) * 2.5 }))
        },
        {
          sceneNumber: 2,
          narrative: script.intro,
          imagePrompt: `A dynamic friendly cinematic frame introducing the core topic, matching: ${script.intro.slice(0, 80)}, vivid color grading, detailed, ${style} aesthetic`,
          duration: Math.max(6, Math.ceil(script.intro.split(' ').length / 2.5)),
          subtitles: script.intro.split(', ').map((phrase: string, idx: number) => ({ text: phrase, start: idx * 3, end: (idx + 1) * 3 }))
        },
        {
          sceneNumber: 3,
          narrative: script.body.slice(0, Math.floor(script.body.length / 2)),
          imagePrompt: `Highly technical or engaging detailed visual illustrating: ${script.body.slice(0, 80)}, ultra-detailed, professional composition, ${style}`,
          duration: Math.max(10, Math.ceil((script.body.length / 2) / 10)),
          subtitles: [{ text: "Diving deeper into the core analysis...", start: 0, end: 5 }]
        },
        {
          sceneNumber: 4,
          narrative: script.body.slice(Math.floor(script.body.length / 2)),
          imagePrompt: `Detailed stylized concept illustration of: ${script.body.slice(Math.floor(script.body.length / 2), Math.floor(script.body.length / 2) + 80)}, crisp high-contrast, beautiful lighting, ${style}`,
          duration: Math.max(10, Math.ceil((script.body.length / 2) / 10)),
          subtitles: [{ text: "Understanding the primary factors here...", start: 0, end: 6 }]
        },
        {
          sceneNumber: 5,
          narrative: `${script.outro} ${script.cta}`,
          imagePrompt: `An elegant closing frame with AutoTube Studio aesthetic: ${script.cta.slice(0, 80)}, vibrant lighting, epic visual backdrop`,
          duration: Math.max(7, Math.ceil((script.outro.length + script.cta.length) / 12)),
          subtitles: [{ text: "Subscribe for more amazing content!", start: 0, end: 5 }]
        }
      ];
      return res.json({ success: true, isDemo: true, data: fallbackScenes });
    }

    const systemPrompt = `You are an AI video editor. Break down the following video script into 4 to 6 logical chronological visual scenes. 
For each scene, write:
1) A short matching "narrative" segment (exactly matching portions of the script).
2) An highly descriptive, vivid AI "imagePrompt" to generate an image for this scene matching the style "${style}" (e.g. realistic, cartoon, neon-neon, futuristic).
3) A reasonable custom "duration" in seconds for how long this narrative takes to speak (estimate roughly 2.5 words per second).
4) A matching Array of "subtitles" (each item having "text" string, "start" number, and "end" number).

Return the data STRICTLY formatted as a JSON Array under a "scenes" property, like: 
{ "scenes": [ { "sceneNumber": 1, "narrative": "...", "imagePrompt": "...", "duration": 5, "subtitles": [ { "text": "...", "start": 0, "end": 2.5 } ] } ] }
Do not include any extra text. Make sure start and end times do not exceed the scene duration.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Break down this script:\n${fullScriptText}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text.trim());
    res.json({ success: true, data: parsedData.scenes || [] });
  } catch (err: any) {
    console.error("Generate scenes error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Generate Voice with Gemini TTS
app.post("/api/generate-tts", async (req, res) => {
  try {
    const { text, voice, customKey } = req.body;
    const ai = getGeminiClient(customKey);

    // Default prebuilt voices supported by Gemini model
    const validVoices = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'];
    const chosenVoice = validVoices.includes(voice) ? voice : 'Kore';

    if (!ai) {
      // Demo voice response
      return res.json({ success: true, isDemo: true, note: "Key of Gemini not set. Using synthesised speech simulation." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: chosenVoice }
          }
        }
      }
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({ success: true, audioBase64: base64Audio });
    } else {
      res.status(400).json({ success: false, error: "No audio generated from the Gemini model" });
    }
  } catch (err: any) {
    console.error("Generate TTS error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Generate SEO Metadata
app.post("/api/generate-seo", async (req, res) => {
  try {
    const { topic, script, customKey } = req.body;
    const ai = getGeminiClient(customKey);

    if (!ai) {
      // Fallback SEO responses
      const fallbackSEO = {
        titles: [
          `The Ultimate Guide to ${topic} (Secrets Revealed!)`,
          `${topic} in 2026: Why Everything You Know is WRONG`,
          `How ${topic} is Quietly Changing the Whole World`,
          `AutoTube Studio: Explaining ${topic} in 5 Minutes`
        ],
        description: `In this video, we break down ${topic}. Learn what makes this topic highly valuable, the key principles of its operation, and practical use cases you can apply right away! Subscribe to AutoTube Studio for more incredible insights. \n\n#${topic.replace(/\s+/g, '')} #SaaS #AI`,
        tags: [topic, "AI", "automation", "content creator", "faceless channel", "AutoTube", "trending topic", "digital media"],
        hashtags: [`#${topic.replace(/\s+/g, '')}`, "#AIContent", "#FacelessChannel", "#Automation"]
      };
      return res.json({ success: true, isDemo: true, data: fallbackSEO });
    }

    const systemPrompt = `You are a professional YouTube SEO optimization model. For a video about "${topic}" utilizing this script summary: "${script?.hook || ''}... ${script?.body ? script.body.slice(0, 150) : ''}", provide SEO outputs.
Return a single JSON object containing:
1) "titles": array of 4 extremely high-CTR, clickworthy, viral title suggestions.
2) "description": a highly complete, keyword-optimized description (200-300 words) with call-to-actions, social plugs, and summaries.
3) "tags": array of 10-15 relevant search tags for search engine discoverability.
4) "hashtags": array of 4-6 trendy viral hashtags.

Ensure responses are strictly under those fields in JSON, with no other markdown wrappers.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Generate the SEO metadata now.",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const seoData = JSON.parse(text.trim());
    res.json({ success: true, data: seoData });
  } catch (err: any) {
    console.error("Generate SEO error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------
// MIDDLEWARE CONFIG & START
// ----------------------------------------------------

async function startServer() {
  // Vite integration for dev server or static build serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA Fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AutoTube Studio Server serving on http://localhost:${PORT}`);
  });
}

startServer();
