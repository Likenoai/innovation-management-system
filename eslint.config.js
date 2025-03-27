// 新增globals导入
import globals from "globals";

// 新增vue插件导入
import vuePlugin from "eslint-plugin-vue";

// 修正后的完整导入列表
import prettierConfig from "eslint-config-prettier";
import eslintJS from "@eslint/js";

// 将 trimGlobals 函数提升到配置导出之前
const trimGlobals = (globalsObj) => {
  return Object.keys(globalsObj).reduce((acc, key) => {
    const trimmedKey = key.trim();
    acc[trimmedKey] = globalsObj[key];
    return acc;
  }, {});
};

export default [
  eslintJS.configs.recommended,

  ...vuePlugin.configs["flat/recommended"],
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...trimGlobals(globals.browser), // 现在可以正常使用
        ...trimGlobals(globals.node),
      },
      parserOptions: {
        ecmaVersion: "latest", // 最新ECMAScript特性
        sourceType: "module", // ES模块语法
      },
    },

    rules: {
      indent: "off", // 完全由prettier接管缩进
      quotes: "off",
      semi: "off",
      "vue/html-indent": "off",
      "no-console": "warn",
      "no-unused-vars": "warn",
      eqeqeq: ["error", "always"],
      "prefer-const": "error", // 优先使用const
      "vue/multi-word-component-names": "off", // 关闭多单词组件名要求
      "vue/require-default-prop": "off", // 关闭props默认值要求
      "vue/max-attributes-per-line": [
        // 每行最多属性数
        "error",
        { singleline: 3, multiline: 1 },
      ],
      "vue/html-self-closing": [
        // 自闭合标签规则
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always",
          },
        },
      ],
      "vue/attribute-hyphenation": ["error", "always"], // 属性名短横线命名
      "vue/order-in-components": "error", // 组件选项顺序
    },
  },
];
