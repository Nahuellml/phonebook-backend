import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      // Reglas de estilo
      "@stylistic/js/indent": ["error", 2], // Indentación de 2 espacios
      "@stylistic/js/linebreak-style": ["error", "unix"], // Estilo de salto de línea
      "@stylistic/js/quotes": ["error", "single"], // Comillas simples
      "@stylistic/js/semi": ["error", "never"], // Sin punto y coma
      
      // Reglas de buenas prácticas
      eqeqeq: "error", // Forzar triple igualdad
      "no-trailing-spaces": "error", // Sin espacios al final
      "object-curly-spacing": ["error", "always"], // Espacios en objetos
      "arrow-spacing": ["error", { before: true, after: true }], // Espacio en arrow functions
      "no-console": "off", // Permitir console.log
    },
  },
  {
    ignores: ["dist/**"],
  },
]);
