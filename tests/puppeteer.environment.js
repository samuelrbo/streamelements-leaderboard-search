const NodeEnvironment = require("jest-environment-node").TestEnvironment;
const puppeteer = require("puppeteer");
const path = require("path");

class PuppeteerEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    try {
      const extensionPath = path.resolve(__dirname, "../extension");

      this.global.browser = await puppeteer.launch({
        headless: "new",
        args: [
          `--disable-extensions-except=${extensionPath}`,
          `--load-extension=${extensionPath}`,
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-gpu",
          "--disable-dev-shm-usage"
        ]
      });

      const pages = await this.global.browser.pages();
      this.global.page = pages[0];

    } catch (err) {
      console.error("Puppeteer setup failed:", err);
      this.global.browser = null;
    }
  }

  async teardown() {
    try {
      if (this.global.browser) {
        await this.global.browser.close();
      }
    } catch (err) {
      console.error("Puppeteer teardown failed:", err);
    }

    await super.teardown();
  }
}

module.exports = PuppeteerEnvironment;
