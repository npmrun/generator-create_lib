// 依赖安装阶段
module.exports = function (yo) {
  // 只用npm
  this.installDependencies({
    npm: true,
    bower: false,
    yarn: false,
  });
};
