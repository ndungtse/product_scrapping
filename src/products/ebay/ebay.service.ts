/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class EbayService {
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

  async scrapeSubCategories(category?: string) {
    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      headless: 'new',
    });
    try {
      const page = await browser.newPage();
      console.log('Page opened', page);
      await page.goto(`https://www.ebay.com/b/${category}/bn_7000259124`, {
        timeout: 60000,
      });

      // Wait for the section element containing categories to be visible
      await page.waitForSelector('section.b-module.b-visualnav');

      // Extract sections with categories
      const sections = await page.evaluate(() => {
        const sectionElements = Array.from(
          document.querySelectorAll('section.b-module.b-visualnav'),
        );

        return sectionElements.map((sectionElement) => {
          const heading = sectionElement.querySelector('h2').textContent;

          const categoryElements = Array.from(
            sectionElement.querySelectorAll('a.b-visualnav__tile'),
          );
          const categories = categoryElements.map((categoryElement) => {
            const title = categoryElement.querySelector(
              '.b-visualnav__title',
            ).textContent;
            const image = categoryElement
              .querySelector('.b-visualnav__img img')
              .getAttribute('src');

            return { title, image };
          });

          return { heading, categories };
        });
      });

      return { message: 'Sub Categories', data: sections, success: true };
    } catch (error) {
      console.log('Error', error);
      return { message: 'Sub Categories', data: null, success: false };
    } finally {
      await browser.close();
    }
  }
}
