import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          // Allow exports in UI component library files (shadcn pattern)
          allowExportNames: [
            "buttonVariants",
            "badgeVariants",
            "toggleVariants",
            "navigationMenuTriggerStyle",
            "useFormField",
            "useMotionPreferences",
            "useMotionSafe",
            "Form",
            "FormItem",
            "FormLabel",
            "FormControl",
            "FormDescription",
            "FormMessage",
            "FormField",
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  // Disable react-refresh rule for UI components (shadcn library pattern)
  {
    files: ["**/components/ui/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  // Test files have intentional constant expressions for testing edge cases
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    rules: {
      "no-constant-binary-expression": "off",
    },
  },
);
