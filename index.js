// const express = require("express");
// const { scrapeLogic } = require("./scrapeLogic");
// const app = express();

// const PORT = process.env.PORT || 4000;

// app.get("/scrape", (req, res) => {
//   scrapeLogic(res);
// });

// app.get("/", (req, res) => {
//   res.send("Render Puppeteer server is up and running!");
// });

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: "new",
  });
  const page = await browser.newPage();

  await page.goto("https://developer.chrome.com/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  await page.waitForNavigation({ timeout: 3000 });
  const input = await page.waitForSelector(".search-box__input");
  console.log("input", input);
  // Type into search box
  //   await page.type(".search-box__input", "automate beyond recorder",);
  await input.type("automate beyond recorder");

  // Wait and click on first result
  const searchResultSelector = ".search-box__link";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    "text/Customize and automate"
  );
  const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();
