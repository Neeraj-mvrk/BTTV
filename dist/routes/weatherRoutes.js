"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weatherController_1 = require("../controllers/weatherController");
const router = express_1.default.Router();
// Define the route and link to the controller
router.get('/', weatherController_1.getWeather);
router.get('/daily', weatherController_1.getDailyWeather);
exports.default = router;
