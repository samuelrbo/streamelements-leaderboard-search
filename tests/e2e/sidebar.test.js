const { mockStreamElementsAPI } = require("./mocks/api");
const { mockStreamElementsDOM } = require("./mocks/dom");

describe("Sidebar points loader", () => {
  test("injects personal points into sidebar", async () => {
    const page = await browser.newPage();

    await mockStreamElementsDOM(page);
    await mockStreamElementsAPI(page);

    await page.addScriptTag({ path: "/app/extension/scripts/content.js" });

    await page.waitForSelector("#personal-points", { timeout: 5000 });

    const text = await page.$eval("#personal-points", el => el.textContent);

    expect(text).toContain("#42");
    expect(text).toContain("12345");
  });
});
