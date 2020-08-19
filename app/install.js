// 依赖安装阶段
module.exports = ((yo) => {
  return (function () {
    // 只用npm
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false,
    });
  }).apply(yo);
})