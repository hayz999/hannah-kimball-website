import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  {
    // next/core-web-vitals already registers the jsx-a11y plugin, so merge in
    // the full recommended rule set instead of spreading its config object.
    rules: jsxA11y.flatConfigs.recommended.rules,
  },
  {
    rules: {
      eqeqeq: ["error", "smart"],
      curly: ["warn", "multi-line"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",
    },
  },
  {
    // TS compiler already checks these; base JS rules don't understand types
    // and would otherwise double-report or false-positive on TS-only syntax.
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
