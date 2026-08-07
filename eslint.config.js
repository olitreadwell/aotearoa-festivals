import js from "@eslint/js";

export default [
  { ignores: ["**/generated/**", "**/.next/**", "**/node_modules/**", "**/coverage/**"] },
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-undef": "off",
    },
  },
];
