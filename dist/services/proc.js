"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResult = void 0;
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, } = require("@google/generative-ai");
const helpers_1 = require("../helpers");
const helpers_2 = require("../helpers");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
const generateResult = async (input, level) => {
    try {
        const MODEL_PROMPT = await (0, helpers_2.getSecret)().then((response) => response.MODEL_PROMPT) || process.env.MODEL_PROMPT;
        const GENERATION_CONFIG = await (0, helpers_2.getSecret)().then((response) => response.GENERATION_CONFIG) || process.env.GENERATION_CONFIG;
        const SAFETY_SETTINGS = await (0, helpers_2.getSecret)().then((response) => response.SAFETY_SETTINGS) || process.env.SAFETY_SETTINGS;
        const prompt = MODEL_PROMPT + input + ', Level: ' + level;
        const result = await model.generateContent(prompt, GENERATION_CONFIG, SAFETY_SETTINGS);
        let text = await result.response.text();
        return await (0, helpers_1.extractJson)(text);
    }
    catch (error) {
        if (error.message.includes('SAFETY')) {
            return { error: 'Response blocked due to Safety Reasons.' };
        }
        else
            return { error: error.message };
    }
};
exports.generateResult = generateResult;
//# sourceMappingURL=proc.js.map