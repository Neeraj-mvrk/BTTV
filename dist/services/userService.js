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
exports.addUser = exports.getAllUsers = void 0;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    // Example: Replace with your DB logic
    return [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
});
exports.getAllUsers = getAllUsers;
const addUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Example: Replace with your DB logic
    const newUser = Object.assign({ id: Date.now() }, userData);
    return newUser;
});
exports.addUser = addUser;
