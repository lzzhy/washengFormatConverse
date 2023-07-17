module.exports = {
  // 项目路径
  project: "src",

  // i18n文件夹路径
  target: "src/i18n",

  // 不需要过检的文件或文件夹,格式参照ignore包
  exclude: ["src/assets"],

  // 支持翻译的语言，填写参照：https://github.com/hua1995116/google-translate-open-api/blob/master/src/language.ts
  languages: ["en", "ja"],

  // webpack或vite中的alias配置，使用深导出时需要配置
  resolve: {
    // 参照 https://github.com/webpack/enhanced-resolve
    alias: {
      "@": "./src", // i18n引用会优先采用alias配置
    },
  },
  detect: {
    // 检测优化时，是否进行自动翻译，默认关闭
    translate: false,
  },
  translateKey: "78514a38b5e78e46", // 有道智云应用ID
  translateSecret: "ihsPVjLQQX4MWt8PWehW7O6EX1pbWk7o", // 有道智云应用密钥
};
