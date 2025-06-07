// eslint.config.js (ES-modul)
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactNativePlugin from "eslint-plugin-react-native";

export default [
  {
    files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      env: {
        browser: true,
        es2021: true,
      },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": tsPlugin,
      "react-native": reactNativePlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-native/no-inline-styles": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
