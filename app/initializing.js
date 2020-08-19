// 配置文件的获取等操作
const path = require('path');

module.exports = (yo) => {
  return (function () {
    // gulp插件位置
    this.registerTransformStream([]);
    // 资源路径重新设置，不需要局限在`templates`中了
    this.sourceRoot(path.resolve(__dirname, "../", 'templates'));

  }).apply(yo);
}