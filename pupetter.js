// load puppeteer
import puppeteer from "puppeteer";
import dotenv from "dotenv";
const domain = "https://www.amazon.com";
dotenv.config();

// IIFE
export const amazon = async (res) => {
  // wrapper to catch errors
  const browser = await puppeteer.launch({
    // create a new browser instance
    //   args: [
    //     "--disable-setuid-sandbox",
    //     "--no-sandbox",
    //     "--single-process",
    //     "--no-zygote",
    //   ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: "new",
  });
  try {
    // create a page inside the browser;
    const page = await browser.newPage();
    console.log(page);
    // navigate to a website and set the viewport
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(domain, {
      timeout: 3000000,
    });

    // get the input element
    const el = await page.$("#twotabsearchtextbox");
    console.log("el", el);

    // search and wait the product list
    await page.type("#twotabsearchtextbox", "iphone x 64gb");
    await page.click("#nav-search-submit-button");
    console.log("waiting for selector");
    await page.waitForSelector(".s-image");
    console.log("selector found");
    // create a screenshots
    await page.screenshot({ path: "search-iphone-x.png" });

    const products = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll(".s-result-item"));
      return links
        .map((link) => {
          if (link.querySelector(".a-price-whole")) {
            return {
              name: link.querySelector(
                ".a-size-medium.a-color-base.a-text-normal"
              ).textContent,
              url: link.querySelector(".a-link-normal.a-text-normal").href,
              image: link.querySelector(".s-image").src,
              price: parseFloat(
                link
                  .querySelector(".a-price-whole")
                  .textContent.replace(/[,.]/g, (m) => (m === "," ? "." : ""))
              ),
            };
          }
        })
        .slice(0, 5);
    });
    console.log("products", products);
    res.json({ products: products });
    // close the browser
  } catch (error) {
    // display errors
    console.log(error);
  } finally {
    await browser.close();
  }
};
