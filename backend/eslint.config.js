module.exports = [
    {
      ignores: ["node_modules/"],
    },
    {
      files: ["**/*.js"],
      languageOptions: {
        sourceType: "module",
      },
      rules: {
        "no-unused-vars": "warn",
        "no-console": "off"
      }
    }
  ];
  