const express = require('express');
import { generateMapController, testController } from '../controllers';
export const router = express.Router();


router.route('/gen').post(generateMapController);
router.route('/').get(testController);