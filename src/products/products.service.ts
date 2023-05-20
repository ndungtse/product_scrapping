/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ProductsService {
  async getGlobalDeals(category?: string) {
    console.log(process.env.PUPPETEER_EXECUTABLE_PATH);
    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      headless: 'new',
    });
    try {
      console.log('Browser opened', browser);
      const page = await browser.newPage();
      const url = `https://ebay.com/globaldeals/${category ?? ''}`;
      console.log(url);
      await page.goto(url, {
        timeout: 60000,
      });
      console.log('Page opened', page);
      await page.waitForSelector('.row .col');
      console.log('Page loaded');
      const data = await page.evaluate(() => {
        const products = document.querySelectorAll(
          '.ebayui-dne-item-featured-card .row .col',
        );
        const productsArray = Array.from(products)!;
        console.log('Products', productsArray);
        return productsArray.map((product) => {
          const id = product
            .querySelector('.dne-itemtile')
            ?.getAttribute('data-listing-id');
          const title = product.querySelector(
            '.dne-itemtile-title span span',
          )?.textContent;
          const price = product.querySelector(
            '.dne-itemtile-price .first',
          )?.textContent;
          const image = (
            product.querySelector('.slashui-image-cntr')
              ?.children[0] as HTMLImageElement
          )?.src;
          return { id, title, price, image };
        });
      });
      return { message: 'Global Deals', data, success: true };
    } catch (error) {
      console.log('Error', error);
      return { message: 'Global Deals', data: null, success: false };
    } finally {
      await browser.close();
    }
  }
}
