/**
 * @docs https://plopjs.com/documentation/#getting-started
 * @param {*} plop
 * @description
 * 1. how to ingore Ignore the parsing
 *    @see https://github.com/plopjs/plop/issues/254
 *    @see https://handlebarsjs.com/guide/expressions.html#whitespace-control
 */
module.exports = function (plop) {
  //#region  ------------helper  start-----------------------
  // built in helpers https://plopjs.com/documentation/#built-in-helpers

  // /**
  //  * 'app-asda'.replace(/-(\w)/,(...args)=>String.fromCharCode(args[1].charCodeAt()-32)
  //  *  output -> 'appAsda'
  //  */
  // const camelCase = (txt = "") => txt.replace(/-(\w)/, (...args) => String.fromCharCode(args[1].charCodeAt() - 32));
  // plop.setHelper("camelCase", camelCase);

  // /**
  //  * classStyle('app-asda')=>AppAsda
  //  */
  // const classStyle = (txt = "") => camelCase(txt).replace(/^\w/, (...args) => String.fromCharCode(args[0].charCodeAt() - 32));
  // plop.setHelper("classStyle", classStyle);

  // /**
  //  * classStyle('app-asda')=>App Asda
  //  */
  // plop.setHelper("titleStyle", (txt = "") => classStyle(txt).replace(/[A-Z]/g, (...args) => (args[1] === 0 ? args[0] : ` ${args[0]}`)));

  // /**
  //  * cssStyle('app-asda')=>app_asda
  //  */
  // const cssStyle = (txt = "") => txt.replace(/-/, "_");
  // plop.setHelper("cssStyle", cssStyle);

  //#endregion  ------------helper  end-----------------------

  //#region  ------------create your generators here--------------------------------
  plop.setGenerator("module", {
    description: "create a page module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "please input page name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/index.vue",
        templateFile: "plop-templates/module/index.hbs",
      },
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/{{kebabCase name}}.model.ts",
        templateFile: "plop-templates/module/test.model.hbs",
      },
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/{{kebabCase name}}.services.ts",
        templateFile: "plop-templates/module/test.services.hbs",
      },
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/components/Form/index.vue",
        templateFile: "plop-templates/module/components/Form/index.hbs",
      },
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/components/Form/form.model.ts",
        templateFile: "plop-templates/module/components/Form/form.model.hbs",
      },
      {
        type: "add",
        path: "src/apis/{{kebabCase name}}.ts",
        templateFile: "plop-templates/module/api.hbs",
      },
      {
        type: "add",
        path: "types/apis/{{kebabCase name}}.d.ts",
        templateFile: "plop-templates/module/api.d.hbs",
      },
    ],
  });

  plop.setGenerator("page", {
    description: "create a page module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "please input page name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/index.vue",
        templateFile: "plop-templates/page/index.hbs",
      },
      {
        type: "add",
        path: "src/apis/{{kebabCase name}}.ts",
        templateFile: "plop-templates/page/api.hbs",
      },
      {
        type: "add",
        path: "types/apis/{{kebabCase name}}.d.ts",
        templateFile: "plop-templates/page/api.d.hbs",
      },
    ],
  });

  // // create your generators here
  // plop.setGenerator("api-type", {
  //     description: "create a page module",
  //     prompts: [
  //         {
  //             type: "input",
  //             name: "name",
  //             message: "please input page name",
  //         },
  //     ],
  //     actions: [
  //         {
  //             type: "add",
  //             path: "pages/{{name}}/index.vue",
  //             templateFile: "plop-templates/page.hbs",
  //         },
  //     ],
  // });

  //#endregion ------------create your generators end--------------------------------
};
