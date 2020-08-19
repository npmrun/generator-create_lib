// 在其中写入生成器特定文件（路由，控制器等）的位置
module.exports = (yo) => {
  return function () {
    const copyTpl = (input = "", output = "", placeholder = {}) => {
      this.fs.copyTpl(
        // 目标路径
        this.templatePath(input),
        // 生成的目标文件
        this.destinationPath(output),
        // 注入占位文本
        placeholder
      );
    };
    this.log(JSON.stringify(this.answers))
    const placeholder = {
      ...this.answers,
      ...this._data
    };
    this.destinationRoot(this._data.projectName);
    copyTpl("root", "",placeholder);
  }.apply(yo);
};
