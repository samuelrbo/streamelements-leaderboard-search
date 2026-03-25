const { mockStreamElementsAPI } = require("./mocks/api");
const { mockStreamElementsDOM } = require("./mocks/dom");

describe("Search functionality", () => {
  test("displays rank and points after searching", async () => {
    const page = await browser.newPage();

    await page.goto('https://streamelements.com/samzuka/leaderboard');

    await mockStreamElementsAPI(page);
    await mockStreamElementsDOM(page);

    await page.evaluate(() => {
      window.require = (module) => {
        console.log(`Mock: O script tentou dar require em "${module}"`);
        return {};
      };

      window.chrome = {
        runtime: {
          sendMessage: () => {},
          onMessage: { addListener: () => {}, removeListener: () => {} }
        },
        storage: {
          local: { get: () => {}, set: () => {} },
          sync: { get: () => {}, set: () => {} }
        }
      };
    });

    await page.addScriptTag({
      path: "/app/extension/scripts/content.js",
      type: 'module',
    });

    const inputSelector = "#search-container input";
    const resultSelector = "#streamelements-leaderboard-search-result";

    await page.waitForSelector(inputSelector, { timeout: 10000 });

    await page.type(inputSelector, "samzuka");

    await page.waitForFunction(
      (selector) => {
        const el = document.querySelector(selector);
        return el && el.textContent.includes("42");
      },
      { timeout: 5000 },
      resultSelector
    );

    const text = await page.$eval(resultSelector, el => el.textContent);

    expect(text).toContain("42");
    expect(text).toContain("samzuka");
    expect(text).toContain("12,345");
  });
});
