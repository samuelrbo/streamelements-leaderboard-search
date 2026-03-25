const { mockStreamElementsAPI } = require("./mocks/api");
const { mockStreamElementsDOM } = require("./mocks/dom");

describe("Content script initialization", () => {
  test("injects search container into the page", async () => {
    const page = await browser.newPage();

    await page.goto('https://streamelements.com/samzuka', { waitUntil: 'domcontentloaded' });

    await mockStreamElementsAPI(page);
    await mockStreamElementsDOM(page);

    await page.evaluate(() => {
      window.chrome = {
        i18n: { getMessage: (k) => k },
        runtime: { sendMessage: () => {} }
      };
      window.require = (n) => ({}); // Evita quebra se as dependências falharem
    });

    await page.addScriptTag({ path: "/app/extension/scripts/constants.js" });
    await page.addScriptTag({ path: "/app/extension/scripts/utils.js" });
    await page.addScriptTag({ path: "/app/extension/scripts/content.js" });

    await page.waitForSelector("#search-container", { timeout: 5000 });

    const exists = await page.$("#search-container");
    expect(exists).not.toBeNull();
  });
});
