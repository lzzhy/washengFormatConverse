const plugin = require("tailwindcss/plugin");
// const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      color: {
        dark: "#333333",
        defaultPage: "#f8f8f8",
        primary: "#0A3EDB",
        themeGray: "#646262",
        boxBorder: "#D9D9D9",
        sider: "#fff",
        warning: "red",
      },
      height: {
        admin_header: "60px",
        tableHeight: "80vh",
      },
      textColor: (theme) => {
        return {
          ...theme("color"),
          secondary: "#7D7D7D",
        };
      },
      backgroundColor: (theme) => {
        return {
          ...theme("color"),
        };
      },
      borderColor: (theme) => {
        return {
          ...theme("color"),
        };
      },
      fontFamily: {
        logo: "AlibabaPuHuiTiM",
        regular: "PingFangSC-Regular, PingFang SC",
        medium: "PingFangSC-Medium, PingFang SC",
      },
      backgroundImage: {
        sider: "linear-gradient(180deg, #025BFF 0%, #00B9FF 100%)",
        // sider: "#FBFBFB",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      boxShadow: {
        // sm: "0px 1px 0px 0px rgba(0, 0, 0, 0.04)",
        // gray: "0px 0px 0px 0px #D9D9D9",
        ui: "0px 2px 4px 0px #DDE1EE",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#EB5E00",
          "primary-focus": "mediumblue",
        },
      },
      "dark",
    ],
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [
    // require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
    // plugin(function ({ addVariant, e, postcss }) {
    //   addVariant("firefox", ({ container, separator }) => {
    //     const isFirefoxRule = postcss.atRule({
    //       name: "-moz-document",
    //       params: "url-prefix()",
    //     });
    //     isFirefoxRule.append(container.nodes);
    //     container.append(isFirefoxRule);
    //     isFirefoxRule.walkRules((rule) => {
    //       rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`;
    //     });
    //   });
    // }),
  ],
};
