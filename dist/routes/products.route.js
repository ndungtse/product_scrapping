"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { Browser } from "../utils/shared";
const ApiResponse_1 = require("../utils/ApiResponse");
const puppeteer_1 = __importDefault(require("puppeteer"));
const router = (0, express_1.Router)();
const getGlobalDealsAPis = async (res, category) => {
    const browser = await puppeteer_1.default.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        headless: "new",
    });
    try {
        console.log("Browser opened", browser);
        const page = await browser.newPage();
        const url = `https://ebay.com/globaldeals/${category ?? ""}`;
        console.log(url);
        await page.goto(url, {
            timeout: 60000,
        });
        console.log("Page opened", page);
        await page.waitForSelector(".row .col");
        console.log("Page loaded");
        const data = await page.evaluate(() => {
            const products = document.querySelectorAll(".ebayui-dne-item-featured-card .row .col");
            const productsArray = Array.from(products);
            console.log("Products", productsArray);
            return productsArray.map((product) => {
                const id = product
                    .querySelector(".dne-itemtile")
                    ?.getAttribute("data-listing-id");
                const title = product.querySelector(".dne-itemtile-title span span")?.textContent;
                const price = product.querySelector(".dne-itemtile-price .first")?.textContent;
                const image = product.querySelector(".slashui-image-cntr")
                    ?.children[0]?.src;
                return { id, title, price, image };
            });
        });
        res.json(new ApiResponse_1.ApiResponse("Global Deals", data, true));
    }
    catch (error) {
        console.log("Error", error);
        res.json(new ApiResponse_1.ApiResponse("Global Deals", null, false));
    }
    finally {
        await browser.close();
    }
};
router.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});
router.get("/globaldeals", async (req, res) => {
    await getGlobalDealsAPis(res);
});
router.get("/globaldeals/:category", async (req, res) => {
    const { category } = req.params;
    await getGlobalDealsAPis(res, category);
});
exports.default = router;
