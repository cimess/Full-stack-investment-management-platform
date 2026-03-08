import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getInvestmentInsights(query: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `You are cimess, an expert financial advisor AI for the CimessInvest platform.
Answer the following investment question clearly and concisely.
Keep your response under 200 words and use plain language suitable for retail investors.

Question: ${query}`,
          },
        ],
      },
    ],
  });

  return response.text ?? 'No response generated.';
}
