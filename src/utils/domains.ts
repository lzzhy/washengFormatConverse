const NODE_ENV = import.meta.env.NODE_ENV;
const isDev = NODE_ENV === "dev" || NODE_ENV === "development";
const isTest = NODE_ENV === "testing" || NODE_ENV === "electronDev";
const isProd = NODE_ENV === "production";
// const env = 'us';
const env = "cc";
const curLanguage = "zh-cn";
const { protocol } = location;
const name = "nearhub";
const test = isTest ? "-test" : "";

const suffix = isProd ? "" : test;
// const desktop = isDev?`http://localhost:8081`:;

const Domains = {
  env,
  curLanguage,
  root: `${protocol}//www.${name}.${env}`,
  app: `${protocol}//app${suffix}.${name}.${env}`,
  desktop: `${protocol}//desktop${suffix}.${name}.${env}`,
  // desktop:`http://localhost:8081`,
  // invitation: `${protocol}//${prefix}app${suffix}.${name}.${env}`,
  api: `https://api${suffix}.${name}.${env}`,
  api1: `https://api${suffix}.${name}.${env}`,
  // bbs: `${protocol}//bbs${suffix}.${name}.${env}`,
  bbs: `https://www.zhihu.com/club/1281235565372084224`,
  socketNav: `https://cnavi${suffix}.${name}.${env}`,
  socket: `wss://ws${suffix}.${name}.${env}`,
  // help: `${protocol}//help.${name}.${env}`,
  help: `https://help.${name}.${env}`,
  cdn: `${protocol}//static.${name}.${env}`,
  fs: `${protocol}//fs.${name}.${env}`,
};

// 开发及内网环境不 使用安全链接，避免.test环境经常要授权通过，太烦人了
if (isDev) {
  Object.keys(Domains).forEach((key) => {
    Domains[key] = Domains[key].replace(/^https/, "http");
    // Domains[key] = Domains[key].replace(/^wss/, 'ws');
  });
}

export default Domains;
