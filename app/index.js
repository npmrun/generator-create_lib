const Generator = require('yeoman-generator');
const prompting = require("./prompt")
const writing = require("./writing")
const constructor = require("./constructor")

// const shell = require('shelljs');
const install = require('./install');
const end = require('./end');
const initializing = require('./initializing.js');
/**
 * 不要使用console.log或者process.stdout.write()输出，要用this.log输出
 * // 直接附加到Generator原型的每种方法都被视为一项任务。每个任务都由Yeoman环境运行循环按顺序运行。
 */
module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        constructor(this)
    }
    _data = {};
    initializing() {
        initializing(this);
    }
    async prompting() {
        await prompting(this);
    }
    configuring() {
        // 在用户选择之后可以选择性保存用户选择过的选项配置
    }
    default () {
        // 如果方法名称不匹配的优先事项，将被推到该组
    }
    writing() {
        writing(this);
    }
    conflicts() {
        // 冲突的处理,当目标目录有相同的文件时会出现选项
    }
    install() {
        install(this)
    }
    end() {
        end(this)
    }
};

// https://yeoman.io/authoring/running-context.html