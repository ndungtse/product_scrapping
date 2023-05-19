"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    message;
    data;
    success;
    constructor(message, data = null, success) {
        this.message = message;
        this.data = data;
        this.success = success;
    }
}
exports.ApiResponse = ApiResponse;
