const data = [
  // 用户输入
  {
    type: "checkbox",
    message: "选择输出类型:",
    name: "create",
    choices: [
      {
        name: "umd",
        checked: true, // 默认选中
      },
      {
        name: "iife",
      },
      {
        name: "amd",
      },
      {
        name: "es",
      },
      {
        name: "cjs",
      },
    ],
  }
];

// 用户输入选择，用于之后的文件限制输出
const inputProjectName = {
  type: "input",
  name: "name",
  message: "请输入您的项目名称",
  default: "",
  validate(value) {
    if (value == "") {
      return false;
    }
    return true;
  },
};

module.exports = (yo) => {
  return async function () {
    if (!this._data.projectName) {
      data.splice(0, 0, inputProjectName);
    }
    this.answers = await this.prompt(data);
    if (this.answers.name) {
      this._data.projectName = this.answers.name;
    }
  }.apply(yo);
};
