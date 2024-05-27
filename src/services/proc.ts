const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
import { extractJson } from '../helpers';
require('dotenv').config();

const generationConfig = {
    temperature: 0.9,
    topK: 0,
    topP: 1,
    maxOutputTokens: 200000,
};


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });


export const generateResult = async (input: String, level: String) => {
    try {
        const prompt = process.env.MODEL_PROMPT + input + ', Level: ' + level;
        const result = await model.generateContent(prompt, process.env.GENERATION_CONFIG, process.env.SAFETY_SETTINGS);

        let text = await result.response.text();
        return await extractJson(text);

    } catch (error) {
        if (error.message.includes('SAFETY')) {
            return { error: 'Response blocked due to Safety Reasons.' };
        }
        else
            return { error: error.message };
    }
}