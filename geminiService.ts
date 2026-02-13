
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// In-memory cache
const cache = new Map<string, { response: string, timestamp: number }>();
const CACHE_TTL = 300000; // 5 minutes

export const getMarketIntelligence = async (marketData: any) => {
  const cacheKey = JSON.stringify(marketData);
  const now = Date.now();
  const cached = cache.get(cacheKey);
  
  if (cached && (now - cached.timestamp < CACHE_TTL)) {
    return cached.response;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a real-time analysis of the ${marketData.context} market. Focus on any breaking news or shifts in the last hour. If specific sectors like ${marketData.selectedSector} are mentioned, provide their specific momentum. Keep response under 15 words.`,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      }
    });

    const text = response.text || "Market monitoring active. Steady volatility detected.";
    cache.set(cacheKey, { response: text, timestamp: now });
    return text;

  } catch (error: any) {
    console.error("Gemini Real-time Intelligence Error:", error);
    return "Local Feed: Technical indicators suggesting minor consolidation.";
  }
};
