const {
  commafy,
  getStreamerChannelName,
  extractTimeToMs
} = require("../../extension/scripts/utils.js");

describe("Utility functions", () => {
  test("commafy formats numbers correctly", () => {
    expect(commafy(1000)).toBe("1,000");
    expect(commafy(1000000)).toBe("1,000,000");
  });

  test("getStreamerChannelName extracts channel name", () => {
    expect(getStreamerChannelName("https://streamelements.com/samuelrbo"))
      .toBe("samuelrbo");
  });

  test("extractTimeToMs parses time correctly", () => {
    const text = "Earn points every 5 minutes";
    expect(extractTimeToMs(text)).toBe(5 * 60 * 1000);
  });
});
