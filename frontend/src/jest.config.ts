module.exports = {
  testEnvironment: "jsdom",

  testMatch: ["**/__tests__/**/*.test.ts"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
