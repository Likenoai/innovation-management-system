export default {
  // 与ESLint保持一致的规则
  tabWidth: 2,
  useTabs: true,
  singleQuote: true,
  semi: true,
  overrides: [
    {
      files: "*.vue",
      options: {
        htmlWhitespaceSensitivity: "ignore",
          },
    },
  ],
};
