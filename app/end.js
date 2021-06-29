// 最后调用清理
module.exports = function (yo) {
  this.log("\n\n请执行命令：cd " + this._data.projectName);
  process.exit(-1);
};
