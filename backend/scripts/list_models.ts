import dotenv from "dotenv";

dotenv.config();

/**
 * Directly queries the Google Gemini API to list all available models
 * for your current GEMINI_API_KEY.
 */
const listModels = async () => {
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
        console.error("Error: GEMINI_API_KEY not found in .env file.");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models`;

    try {
        console.log("Fetching available models from Google via secure headers...");
        const response = await fetch(url, {
            headers: {
                'x-goog-api-key': API_KEY
            }
        });
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", data.error.message);
            return;
        }

        console.log("\n--- Available Gemini Models ---");
        data.models.forEach((model: any) => {
            console.log(`\nModel: ${model.name}`);
            console.log(`Display Name: ${model.displayName}`);
            console.log(`Description: ${model.description}`);
            console.log(`Supported Methods: ${model.supportedGenerationMethods.join(", ")}`);
        });

    } catch (error) {
        console.error("Error during fetch:", error);
    }
};

listModels();
