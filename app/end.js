// 最后调用清理
module.exports = ((yo) => {
  return (function () {
    this.log("cd " + this._data.projectName);
    process.exit(-1)
  }).apply(yo);
})