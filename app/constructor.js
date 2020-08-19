// 构造器（用于解析传入的参数以及选项）
module.exports = (yo) => {
  return function () {
    this.option("skip-welcome-message", {
      desc: "跳过欢迎信息",
      type: Boolean,
    });
    this.argument("projectName", {
      type: String,
      default: "",
      required: false, //这样的话就一定要带这个值
    });
    this.argument("who", {
      type: String,
      default: "",
      required: false, //这样的话就一定要带这个值
    });
    this._data.skip = this.options["skip-welcome-message"];
    this._data.projectName = this.options["projectName"];
    this._data.who = this.options["who"];
  }.apply(yo);
};
