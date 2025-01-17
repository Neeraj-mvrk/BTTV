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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeatherData = fetchWeatherData;
exports.fetchDailyWeatherData = fetchDailyWeatherData;
const axios_1 = __importDefault(require("axios"));
const prisma_1 = __importDefault(require("../db/prisma"));
function fetchWeatherData(lat, lon) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${process.env.WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`);
            return response.data;
        }
        catch (error) {
            throw new Error('Error fetching weather data');
        }
    });
}
function fetchDailyWeatherData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const preferenceData = yield prisma_1.default.preferences.findFirst({
                where: { userId: 1 },
            });
            if (preferenceData === null) {
                throw new Error('No preference data found for the user');
            }
            const params = {
                "latitude": parseFloat(preferenceData.lat),
                "longitude": parseFloat(preferenceData.lon),
                "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "uv_index_clear_sky_max", "precipitation_sum", "rain_sum", "showers_sum", "snowfall_sum", "precipitation_hours", "precipitation_probability_max"],
                "forecast_days": 16
            };
            // const url = "https://api.open-meteo.com/v1/forecast";
            const response = yield axios_1.default.get(`${process.env.OPENMEATEO_URL}`, {
                params: params
            });
            return response.data;
        }
        catch (error) {
            console.log(error, "ERROR");
            throw new Error('Error fetching weather data');
        }
    });
}
