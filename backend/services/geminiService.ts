import { GoogleGenAI } from "@google/genai";

/**
 * Service to interact with Google's Gemini AI.
 * Uses the new @google/genai SDK (replaces deprecated @google/generative-ai).
 * Model: gemini-2.5-flash-lite — available on the free tier.
 */
export const getInvestmentInsights = async (query: string): Promise<string> => {
    try {
        const apiKey = process.env.GEMINI_API_KEY || "";

        if (!apiKey) {
            console.warn("GEMINI_API_KEY is missing from environment. Using fallback message.");
            return "Investment insights are currently unavailable due to missing API configuration.";
        }

        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: query,
            config: {
                systemInstruction:
                    "You are cimess an expert financial analyst for CimessInvest, a premium investment platform. Provide concise, professional, and data-driven insights about investment concepts. Do not give specific financial advice (buy/sell recommendations), but rather explain concepts, trends, and risk management strategies. Keep responses under 150 words.",
                maxOutputTokens: 250,
                temperature: 0.3,
            },
        });

        return response.text ?? "Unable to generate insights at this time.";

    } catch (error: any) {
        console.error("Gemini API Error details:", {
            status: error.status,
            message: error.message,
            stack: error.stack,
        });

        throw new Error(error.message || "Failed to connect to NovaInvest AI.");
    }
};
