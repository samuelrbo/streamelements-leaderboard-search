module.exports = {
  testTimeout: 30000,

  projects: [
    {
      displayName: "unit",
      testMatch: ["<rootDir>/tests/unit/**/*.test.js"],
      testEnvironment: "jest-environment-jsdom"
    },
    {
      displayName: "e2e",
      testMatch: ["<rootDir>/tests/e2e/**/*.test.js"],
      testEnvironment: "<rootDir>/tests/puppeteer.environment.js"
    }
  ]
};
