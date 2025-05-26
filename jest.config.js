module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    ".*\\.e2e\\.spec\\.ts$",
    ".*\\.functional\\.spec\\.ts$",
  ],
  transform: {
    "^.+\\.ts$": "ts-jest", // Only transform .ts files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!flat)/", // Exclude modules except 'flat' from transformation
  ],
  globalSetup: "jest-preset-angular/global-setup",
};
