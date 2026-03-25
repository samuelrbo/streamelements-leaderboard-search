const NodeEnvironment = require("jest-environment-node").TestEnvironment;
const puppeteer = require("puppeteer");

class PuppeteerEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    this.global.browser = await puppeteer.launch({
      headless: false,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote",
        "--single-process",
        "--disable-extensions-except=/app/extension",
        "--load-extension=/app/extension"
      ]
    });

    const pages = await this.global.browser.pages();
    this.global.page = pages[0];
  }

  async teardown() {
    if (this.global.browser) {
      await this.global.browser.close();
    }
    await super.teardown();
  }
}

module.exports = PuppeteerEnvironment;
