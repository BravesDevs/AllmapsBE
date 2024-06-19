"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testController = exports.generateMapController = void 0;
const proc_1 = require("../services/proc");
const generateMapController = async (req, res) => {
    try {
        const { text, level } = req.body;
        if (!text || !level) {
            res.status(400).json({ error: 'Fields are required.' });
            return;
        }
        const result = await (0, proc_1.generateResult)(text, level);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.generateMapController = generateMapController;
const testController = async (req, res) => {
    res.status(200).json({ message: 'Test successful' });
};
exports.testController = testController;
//# sourceMappingURL=proc.js.map