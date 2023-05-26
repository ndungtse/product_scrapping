import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class AmazonService {
  async search(searchTerm: string) {
    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      headless: 'new',
    });
    try {
      const page = await browser.newPage();
      await page.goto(`https://www.amazon.com/s?k=${searchTerm}`);
      const products = await page.evaluate(() => {
        const productNodes = document.querySelectorAll('.s-result-item');
        const productArray = Array.from(productNodes);
        const products = productArray.map((product) => {
          const title = product.querySelector('h2').innerText;
          const price = (product.querySelector('.a-price-whole') as any)
            .innerText;
          const image = product.querySelector('img').src;
          const url = product.querySelector('a').href;
          const dataAsin = product.getAttribute('data-asin');
          return { title, price, image, url, id: dataAsin };
        });
        return products;
      });
      return { message: 'Amazon Search', data: products, success: true };
    } catch (error) {
      console.log(error);
      return { message: 'Amazon Search', data: null, success: false };
    } finally {
      await browser.close();
    }
  }

  async getProductDetails(url: string) {
    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      headless: 'new',
    });
    try {
      const page = await browser.newPage();
      await page.goto(url);
      const product = await page.evaluate(() => {
        const title = (document.querySelector('#productTitle') as any)
          .innerText;
        const price = (document.querySelector('#priceblock_ourprice') as any)
          .innerText;
        const image = (
          document.querySelector('#landingImage') as HTMLImageElement
        ).src;
        // get product specs from table
        const specDiv = document.querySelector('.productOverview_feature_div');
        const specTable = specDiv.querySelector('table');
        const specRows = specTable.querySelectorAll('tr');
        const specs = Array.from(specRows).map((row) => {
          const spans = row.querySelectorAll('span');
          const key = spans[0].innerText;
          const value = spans[1].innerText;
          return { key, value };
        });
        const aboutDiv = document.querySelector('#feature-bullets');
        const aboutSpans = aboutDiv.querySelectorAll('span');
        const about = Array.from(aboutSpans).map((span) => span.innerText);
        // get alt images
        const altDiv = document.querySelector('#altImages');
        const altImages = altDiv.querySelectorAll('img');
        const altImageArray = Array.from(altImages);
        const altImageSrcs = altImageArray.map((img) => img.src);
        return { title, price, image, specs, about, altImageSrcs };
      });
      return { message: 'Amazon Product', data: product, success: true };
    } catch (error) {
      return { message: 'Amazon Product', data: null, success: false };
    } finally {
      await browser.close();
    }
  }
}
