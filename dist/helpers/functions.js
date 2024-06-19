"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJson = void 0;
const extractJson = (text) => {
    text = text.replace('json', '').trim();
    const jsonStart = text.indexOf('```') + 3;
    const jsonEnd = text.lastIndexOf('```');
    const jsonString = text.substring(jsonStart, jsonEnd);
    const roadmapArray = JSON.parse(jsonString);
    return roadmapArray;
};
exports.extractJson = extractJson;
//# sourceMappingURL=functions.js.map