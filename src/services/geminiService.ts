import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeSentiment(content: string): Promise<string> {
  if (!content || content.length < 5) return 'Neutral';
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the sentiment of this journal entry in one word (e.g., Positive, Negative, Anxious, Calm, Sad): "${content}"`,
    });
    
    return response.text?.trim() || 'Neutral';
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return 'Analysis unavailable';
  }
}

export async function getHealthTips(mood: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 3 short, calming, and practical mental health tips for someone feeling ${mood}. Keep it supportive and brief.`,
    });
    
    return response.text || 'Take a deep breath and stay hydrated.';
  } catch (error) {
    return 'Take a deep breath and stay hydrated.';
  }
}
