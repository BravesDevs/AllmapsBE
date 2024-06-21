"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResult = void 0;
const { GoogleGenerativeAI, } = require("@google/generative-ai");
const helpers_1 = require("../helpers");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
const generateResult = (input, level) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MODEL_PROMPT = process.env.MODEL_PROMPT;
        const GENERATION_CONFIG = process.env.GENERATION_CONFIG;
        const SAFETY_SETTINGS = process.env.SAFETY_SETTINGS;
        const prompt = MODEL_PROMPT + input + ', Level: ' + level;
        const result = yield model.generateContent(prompt, GENERATION_CONFIG, SAFETY_SETTINGS);
        let text = result.response.text();
        return yield (0, helpers_1.extractJson)(text);
    }
    catch (error) {
        if (error.message.includes('SAFETY')) {
            return { error: 'Response blocked due to Safety Reasons.' };
        }
        else
            return { error: error.message };
    }
});
exports.generateResult = generateResult;
//# sourceMappingURL=proc.js.map