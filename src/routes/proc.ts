const express = require('express');
import { generateMapController } from '../controllers';
export const router = express.Router();


router.route('/gen').post(generateMapController);