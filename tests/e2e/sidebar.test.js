const { mockStreamElementsAPI } = require("./mocks/api");
const { mockStreamElementsDOM } = require("./mocks/dom");

describe("Sidebar points loader", () => {
  test("injects personal points into sidebar", async () => {
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

    await page.waitForSelector("#personal-points", { timeout: 10000 });

    const text = await page.$eval("#personal-points", el => el.textContent);

    expect(text).toContain("#42");
    expect(text).toContain("samzuka");
    expect(text).toContain("12,345");
  });
});
