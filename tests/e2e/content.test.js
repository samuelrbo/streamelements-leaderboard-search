const { mockStreamElementsDOM } = require("./mocks/dom");

describe("Content script initialization", () => {
  test("injects search container into the page", async () => {
    const page = await browser.newPage();

    await mockStreamElementsDOM(page);

    await page.addScriptTag({ path: "/app/extension/scripts/content.js" });

    await page.waitForSelector("#search-container", { timeout: 5000 });

    const exists = await page.$("#search-container");

    expect(exists).not.toBeNull();
  });
});
