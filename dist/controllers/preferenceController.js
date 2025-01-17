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
exports.getPreferenceData = exports.savePreferenceData = void 0;
const preferenceService_1 = require("../services/preferenceService");
const response_1 = require("../utils/response");
const savePreferenceData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { location, minTemperature, maxTemperature, humidity, condition, notify, userId, lat, lon } = req.body;
    // Validate required fields
    if (!location || !minTemperature || !maxTemperature || !condition || !userId) {
        return (0, response_1.sendBadRequest)(res, 'Missing required fields.');
    }
    try {
        const preference = yield (0, preferenceService_1.savePreference)({
            location,
            minTemperature,
            maxTemperature,
            humidity,
            condition,
            notify,
            userId,
            lat,
            lon, // Include userId to save preference for the correct user
        });
        return (0, response_1.sendSuccess)(res, preference);
    }
    catch (error) {
        console.error(error);
        return (0, response_1.sendError)(res, 'An error occurred while creating the preference.');
    }
});
exports.savePreferenceData = savePreferenceData;
const getPreferenceData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preference = yield (0, preferenceService_1.getPreference)();
        return (0, response_1.sendSuccess)(res, "Fetched saved Reference", preference);
    }
    catch (error) {
        console.error(error);
        return (0, response_1.sendError)(res, 'An error occurred while creating the preference.');
    }
});
exports.getPreferenceData = getPreferenceData;
