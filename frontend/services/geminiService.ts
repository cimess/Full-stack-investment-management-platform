import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from the environment
// Note: In a production frontend, ensure you have proper proxying or restrictions 
// if exposing keys, but for this demo environment we use process.env directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getInvestmentInsights = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: "You are an expert financial analyst for NovaInvest, a premium investment platform. Provide concise, professional, and data-driven insights about investment concepts. Do not give specific financial advice (buy/sell recommendations), but rather explain concepts, trends, and risk management strategies. Keep responses under 150 words.",
      }
    });
    
    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    throw new Error("Failed to connect to NovaInvest AI.");
  }
};