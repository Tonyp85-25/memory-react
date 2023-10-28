module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  plugins: ["react", "react-refresh"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["test/**"],
      plugins: ["jest", "jest-dom"],
      extends: ["plugin:jest/recommended", "plugin:jest-dom/recommended"],
      rules: { "jest/prefer-expect-assertions": "off" },
    },
  ],
  settings: {
    react: {
      version: "17.0.2",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
};
