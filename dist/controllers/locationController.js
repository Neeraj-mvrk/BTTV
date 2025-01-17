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
exports.getLocation = getLocation;
const locationService_1 = require("../services/locationService");
const response_1 = require("../utils/response");
function getLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract search keyword from request 
        const keyword = req.query.keyword;
        // Validate latitude and longitude parameters
        if (!keyword) {
            (0, response_1.sendBadRequest)(res, "Keyword required.");
            return; // Exit the function after sending a response
        }
        try {
            // Call the service to fetch weather data
            const locationData = yield (0, locationService_1.fetchLocationData)(keyword);
            (0, response_1.sendSuccess)(res, "Location data fetched successfully", locationData); // Send success response with data
        }
        catch (error) {
            console.error(error);
            (0, response_1.sendError)(res, "Error fetching location data"); // Send error response
        }
    });
}
