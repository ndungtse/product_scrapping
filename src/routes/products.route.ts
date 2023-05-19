import { Router, Response } from "express";
// import { Browser } from "../utils/shared";
import { ApiResponse } from "../utils/ApiResponse";
import puppeteer from "puppeteer";

const router = Router();

const getGlobalDealsAPis = async (res: Response, category?: string) => {
  const browser = await puppeteer.launch({
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
      const products = document.querySelectorAll(
        ".ebayui-dne-item-featured-card .row .col"
      );
      const productsArray = Array.from(products)!;
      console.log("Products", productsArray);
      return productsArray.map((product) => {
        const id = product
          .querySelector(".dne-itemtile")
          ?.getAttribute("data-listing-id");
        const title = product.querySelector(
          ".dne-itemtile-title span span"
        )?.textContent;
        const price = product.querySelector(
          ".dne-itemtile-price .first"
        )?.textContent;
        const image = (
          product.querySelector(".slashui-image-cntr")
            ?.children[0] as HTMLImageElement
        )?.src;
        return { id, title, price, image };
      });
    });
    res.json(new ApiResponse("Global Deals", data, true));
  } catch (error) {
    console.log("Error", error);
    res.json(new ApiResponse("Global Deals", null, false));
  } finally {
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

export default router;
