// utils/responses.ts

import { Response } from 'express';

interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T | null;
}

interface ErrorResponse {
  success: false;
  message: string;
  error: unknown;
}

/**
 * Send a success response with an optional data payload.
 *
 * @param res - Express Response object
 * @param message - A short description of the success
 * @param data - Data to be sent back to the client (default: null)
 * @param code - HTTP status code (default: 200)
 */
export function sendSuccess<T>(
  res: Response,
  message: string,
  data: T | null = null,
  code = 200
): Response<SuccessResponse<T>> {
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
export function sendError(
  res: Response,
  error: string | unknown,
  code = 500
): Response<ErrorResponse> {
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
export function sendCreated<T>(
  res: Response,
  data: T | null = null
): Response<SuccessResponse<T>> {
  return sendSuccess(res, 'Created', data, 201);
}

/**
 * Send a 'Bad Request' (400) error response.
 *
 * @param res - Express Response object
 * @param error - The error message or object (optional)
 */
export function sendBadRequest(
  res: Response,
  error?: string | unknown
): Response<ErrorResponse> {
  return sendError(res, error || 'Bad Request', 400);
}

/**
 * Send an 'Unauthorized' (401) error response.
 *
 * @param res - Express Response object
 * @param error - The error message or object (optional)
 */
export function sendUnauthorized(
  res: Response,
  error?: string | unknown
): Response<ErrorResponse> {
  return sendError(res, error || 'Unauthorized', 401);
}

/**
 * Send a 'Forbidden' (403) error response.
 *
 * @param res - Express Response object
 * @param error - The error message or object (optional)
 */
export function sendForbidden(
  res: Response,
  error?: string | unknown
): Response<ErrorResponse> {
  return sendError(res, error || 'Forbidden', 403);
}

/**
 * Send a 'Not Found' (404) error response.
 *
 * @param res - Express Response object
 * @param error - The error message or object (optional)
 */
export function sendNotFound(
  res: Response,
  error?: string | unknown
): Response<ErrorResponse> {
  return sendError(res, error || 'Not Found', 404);
}

/**
 * Send a 'Conflict' (409) error response.
 *
 * @param res - Express Response object
 * @param error - The error message or object (optional)
 */
export function sendConflict(
  res: Response,
  error?: string | unknown
): Response<ErrorResponse> {
  return sendError(res, error || 'Conflict', 409);
}
