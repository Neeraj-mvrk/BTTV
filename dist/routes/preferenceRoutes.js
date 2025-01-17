"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const preferenceController_1 = require("../controllers/preferenceController");
const router = express_1.default.Router();
// Define the route and link to the controller
router.post('/', preferenceController_1.savePreferenceData);
router.get('/', preferenceController_1.getPreferenceData);
exports.default = router;
