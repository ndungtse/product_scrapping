import puppeteer from "puppeteer";
import { Builder, By, Key, until } from "selenium-webdriver";
import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

async function example(query) {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to a website
    await driver.get(`https://www.nike.com/gb/w?q=${query}&vst=${query}`);

    // Enter a search query
    // await driver.findElement(By.name("q")).sendKeys("nike air max 97", Key.RETURN);

    // Wait for the results to appear
    // await driver.wait(
    //   until.elementLocated(By.className("subheading__result-count")),
    //   10000
    // );

    // Get the results
    let results = await driver.findElements(
      By.className("product-card__title")
    );

    // Print the results
    const data = [];
    console.log("results", results.length);
    for (let result of results) {
      console.log(await result.getText());
      data.push(await result.getText());
    }
    return data;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await driver.quit();
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/search", async (req, res) => {
  console.log(req.body);
  try {
    const results = await example(req.body.query);
    res.status(200).json({ data: results, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error", error: error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  example("nike air max 97");
});
