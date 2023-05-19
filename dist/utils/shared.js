"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Browser = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const Browser = async () => {
    const browser = await puppeteer_1.default.launch({
        headless: 'new',
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        // args: ["--no-sandbox"],
    });
    return browser;
};
exports.Browser = Browser;
