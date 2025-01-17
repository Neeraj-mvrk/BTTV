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
exports.getPreference = exports.savePreference = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const savePreference = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data, "DATA");
        const preference = yield prisma_1.default.preferences.create({
            data: {
                location: data.location,
                minTemperature: data.minTemperature,
                maxTemperature: data.maxTemperature,
                humidity: data.humidity,
                condition: data.condition,
                notify: data.notify,
                userId: data.userId,
                lat: data.lat, // Save the userId to associate the preference with a user
                lon: data.lon,
            },
        });
        return preference;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error creating preference');
    }
});
exports.savePreference = savePreference;
const getPreference = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preference = yield prisma_1.default.preferences.findMany({ where: { userId: 1 } });
        return preference;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error creating preference');
    }
});
exports.getPreference = getPreference;
