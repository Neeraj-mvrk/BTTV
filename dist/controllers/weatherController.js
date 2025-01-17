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
exports.getWeather = getWeather;
exports.getDailyWeather = getDailyWeather;
const weatherService_1 = require("../services/weatherService");
const response_1 = require("../utils/response");
function getWeather(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract lat and lon from query and cast to string
        const lat = req.query.lat;
        const lon = req.query.lon;
        // Validate latitude and longitude parameters
        if (!lat || !lon) {
            (0, response_1.sendBadRequest)(res, "Latitude and Longitude are required.");
            return; // Exit the function after sending a response
        }
        try {
            // Call the service to fetch weather data
            const weatherData = yield (0, weatherService_1.fetchWeatherData)(lat, lon);
            (0, response_1.sendSuccess)(res, "Weather data fetched successfully", weatherData); // Send a success response with weather data
        }
        catch (error) {
            console.error(error);
            (0, response_1.sendError)(res, "Error fetching weather data");
        }
    });
}
function getDailyWeather(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Call the service to fetch weather data
            const weatherData = yield (0, weatherService_1.fetchDailyWeatherData)();
            (0, response_1.sendSuccess)(res, "Weather data fetched successfully", weatherData); // Send a success response with weather data
        }
        catch (error) {
            console.error(error);
            (0, response_1.sendError)(res, "Error fetching weather data");
        }
    });
}
