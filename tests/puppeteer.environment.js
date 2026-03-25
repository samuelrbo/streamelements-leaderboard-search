const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");
const NodeEnvironment = require("jest-environment-node").TestEnvironment;
require("dotenv").config();

class PuppeteerEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    const browserPath = process.env.BROWSER_PATH;
    const extensionPath = path.resolve(__dirname, "../extension");

    // 1. Validate env variable
    if (!browserPath || browserPath.trim() === "") {
      console.error("\n❌ ERROR: BROWSER_PATH is not defined in your .env file.\n");
      console.error("Create a .env file based on .env.sample and set the path to your browser executable.\n");
      this.global.browser = null;
      return;
    }

    // 2. Validate file existence
    if (!fs.existsSync(browserPath)) {
      console.error(`\n❌ ERROR: The browser executable defined in BROWSER_PATH does not exist:\n${browserPath}\n`);
      console.error("Check your .env file. Refer to .env.sample for examples.\n");
      this.global.browser = null;
      return;
    }

    try {
      this.global.browser = await puppeteer.launch({
        executablePath: browserPath,
        headless: false,
        args: [
          `--disable-extensions-except=${extensionPath}`,
          `--load-extension=${extensionPath}`
        ]
      });

      const pages = await this.global.browser.pages();
      this.global.page = pages[0];

    } catch (err) {
      console.error("\n❌ Puppeteer setup failed:\n", err, "\n");
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