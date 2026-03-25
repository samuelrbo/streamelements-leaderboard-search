const { mockStreamElementsAPI } = require("./mocks/api");
const { mockStreamElementsDOM } = require("./mocks/dom");

describe("Search functionality", () => {
  test("displays rank and points after searching", async () => {
    const page = await browser.newPage();

    await mockStreamElementsDOM(page);
    await mockStreamElementsAPI(page);

    await page.addScriptTag({ path: "./extension/scripts/content.js" });

    await page.waitForSelector("#search-container input");

    await page.type("#search-container input", "samuel");

    await page.waitForSelector("#streamelements-leaderboard-search-result");

    const text = await page.$eval(
      "#streamelements-leaderboard-search-result",
      el => el.textContent
    );

    expect(text).toContain("42");
    expect(text).toContain("12345");
  });
});
