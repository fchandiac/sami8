module.exports = {
    extends: ["next", "next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    rules: {
      "prettier/prettier": ["error", { "endOfLine": "auto" }], // Ajustar para evitar errores de fin de línea
      "@typescript-eslint/no-unused-vars": ["warn"], // Cambiar de error a advertencia
      "@typescript-eslint/ban-ts-comment": "off", // Desactivar esta regla
      "react/jsx-curly-brace-presence": "off", // Personalizar o desactivar otras reglas según sea necesario
    },
  };
  