import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getTravelAdvice(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert travel consultant for Wanderlust Elite. Provide personalized, luxury-focused travel advice. Use markdown for formatting. Be inspiring and concise.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I couldn't get travel advice at the moment. Please try again later.";
  }
}
