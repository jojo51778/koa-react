const { override, fixBabelImports, addLessLoader, addWebpackPlugin, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const path = require('path');
const { getLessVars } = require('antd-theme-generator');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = override(
  // 按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 配置主题
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: getLessVars(path.join(__dirname, './src/styles/vars.less')),
  }),
  // moment.js优化
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  //配置别名
  addWebpackAlias({
    ["@"]: resolve('src')
  }),
  // 使用装饰器
  addDecoratorsLegacy(),
);