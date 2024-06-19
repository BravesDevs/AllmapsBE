"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require('express');
const controllers_1 = require("../controllers");
exports.router = express.Router();
exports.router.route('/gen').post(controllers_1.generateMapController);
exports.router.route('/').get(controllers_1.testController);
//# sourceMappingURL=proc.js.map