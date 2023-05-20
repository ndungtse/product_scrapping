import puppeteer from 'puppeteer';
import { uuid } from 'uuidv4';

export const Browser = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    // args: ["--no-sandbox"],
  });
  return browser;
};

export const categories = [
  {
    id: uuid(),
    title: 'Fashion',
    href: '/Fashion',
  },
  {
    id: uuid(),
    title: 'Electronics',
    href: '/Electronics',
  },
  {
    id: uuid(),
    title: 'Home & Garden',
    href: '/Home-Garden',
  },
  {
    id: uuid(),
    title: 'Sporting Goods',
    href: '/Sporting-Goods',
  },
  {
    id: uuid(),
    title: 'Business & Industrial',
    href: '/Business-Industrial',
  },
];
