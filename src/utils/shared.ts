import puppeteer from 'puppeteer';

export const Browser = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    // args: ["--no-sandbox"],
  });
  return browser;
};
