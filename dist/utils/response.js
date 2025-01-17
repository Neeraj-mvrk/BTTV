"use strict";
// utils/responses.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
exports.sendCreated = sendCreated;
exports.sendBadRequest = sendBadRequest;
exports.sendUnauthorized = sendUnauthorized;
exports.sendForbidden = sendForbidden;
exports.sendNotFound = sendNotFound;
exports.sendConflict = sendConflict;
/**
 * Send a success response with an optional data payload.
 *
 * @param res - Express Response object
 * @param message - A short description of the success
 * @param data - Data to be sent back to the client (default: null)
 * @param code - HTTP status code (default: 200)
 */
function sendSuccess(res, message, data = null, code = 200) {
    return res.status(code).json({
        success: true,
        message,
        data,
    });
}
/**
 * Send an error response with a specific error and status code.
 *
 * @param res - Express Response object
 * @param error - The error message or object
 * @param code - HTTP status code (default: 500)
 */
function sendError(res, error, code = 500) {
    return res.status(code).json({
        success: false,
        message: typeof error === 'string' ? error : 'Server Error',
        error: typeof error === 'string' ? null : error,
    });
}
/**
 * Send a 'Created' (201) success response.
 *
 * @param res - Express Response object
 * @param data - Data payload (optional)
 */
function sendCreated(res, data = null) {
    return sendSuccess(res, 'Created', data, 201);
}
/**
 * Send a 'Bad Request' (400) error response.
 *
 * @param res - Express Response object
 * @param error - The error message or object (optional)
 */
function sendBadRequest(res, error) {
    return sendError(res, error || 'Bad Request', 400);
}
/**
 * Send an 'Unauthorized' (401) error response.
 *
 * @param res - Express Response object
 * @param error - The error message or object (optional)
 */
function sendUnauthorized(res, error) {
    return sendError(res, error || 'Unauthorized', 401);
}
/**
 * Send a 'Forbidden' (403) error response.
 *
 * @param res - Express Response object
 * @param error - The error message or object (optional)
 */
function sendForbidden(res, error) {
    return sendError(res, error || 'Forbidden', 403);
}
/**
 * Send a 'Not Found' (404) error response.
 *
 * @param res - Express Response object
 * @param error - The error message or object (optional)
 */
function sendNotFound(res, error) {
    return sendError(res, error || 'Not Found', 404);
}
/**
 * Send a 'Conflict' (409) error response.
 *
 * @param res - Express Response object
 * @param error - The error message or object (optional)
 */
function sendConflict(res, error) {
    return sendError(res, error || 'Conflict', 409);
}
