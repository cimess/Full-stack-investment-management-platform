import { type Request, type Response } from "express";
import { getInvestmentInsights } from "../services/geminiService.js";

/**
 * Controller to handle AI investment insights requests.
 * Extracts the 'query' from the request body and calls the Gemini service.
 */
export const getAIInsightsController = async (req: Request, res: Response) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Query is required in the request body."
            });
        }

        const insights = await getInvestmentInsights(query);

        return res.status(200).json({
            success: true,
            data: insights
        });
    } catch (error: any) {
        console.error("AI Insight Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while generating AI insights. Please try again later."
        });
    }
};
