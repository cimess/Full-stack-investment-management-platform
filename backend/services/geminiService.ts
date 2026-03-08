// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize the client with the API key from the environment
// const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
// const model = genAI.getGenerativeModel({ 
//   model: "gemini-1.5-flash",
//   systemInstruction: "You are an expert financial analyst for NovaInvest, a premium investment platform. Provide concise, professional, and data-driven insights about investment concepts. Do not give specific financial advice (buy/sell recommendations), but rather explain concepts, trends, and risk management strategies. Keep responses under 150 words.",
// });

// export const getInvestmentInsights = async (query: string): Promise<string> => {
//   try {
//     const result = await model.generateContent(query);
//     const response = await result.response;
//     return response.text() || "Unable to generate insights at this time.";
//   } catch (error) {
//     console.error("Error fetching AI insights:", error);
//     throw new Error("Failed to connect to NovaInvest AI.");
//   }
// };