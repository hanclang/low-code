const { isDevelopment, isProduction } = require("./config/env");

module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["alloy", "alloy/react", "alloy/typescript"],
  rules: {
    quotes: [1, "double"],
    semi: [2, "always"], // 语句强制分号结尾
    "no-console": isDevelopment ? "warn" : "off",
    "no-debugger": isProduction ? "warn" : "off",
    "@typescript-eslint/no-require-imports": "off"
  },
};
