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
exports.testController = exports.generateMapController = void 0;
const proc_1 = require("../services/proc");
const generateMapController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, level } = req.body;
        if (!text || !level) {
            res.status(400).json({ error: 'Fields are required.' });
            return;
        }
        const result = yield (0, proc_1.generateResult)(text, level);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.generateMapController = generateMapController;
const testController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: 'Test successful' });
});
exports.testController = testController;
//# sourceMappingURL=proc.js.map