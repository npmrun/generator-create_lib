import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";
import sourcemaps from "rollup-plugin-sourcemaps";
const pkg = require("./package.json");
const path = require("path");

let isProd = process.env.NODE_ENV === "production";

const input = "source/index.ts";
const openSourceMap = true;
const buildOptions = pkg.buildOptions;
buildOptions.formats = process.env.TARGET
  ? [process.env.TARGET]
  : buildOptions.formats;



export default createConfig();

let external = [];

external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

function createConfig() {
  return {
    input,
    external,
    output: createOutput(buildOptions),
    plugins: createPlugin(),
  };
}

function createPlugin() {
  let plugin = [];
  const aliasPlugin = alias({
    resolve: [".ts"],
    "@": path.resolve(__dirname, "src"),
  });
  const tsPlugin = typescript({
    check: isProd,
    tsconfig: path.resolve(__dirname, "tsconfig.json"),
    cacheRoot: path.resolve(__dirname, "node_modules/.rts2_cache"),
    tsconfigOverride: {
      compilerOptions: {
        declaration: isProd,
      },
    },
  });
  const replacePlugin = replace({
    __DEV__: !isProd,
  });
  plugin = [sourcemaps(), commonjs(), tsPlugin, aliasPlugin, replacePlugin];
  return plugin;
}

function createOutput(options) {
  const output = [];
  const globals = {

  };
  const filterType = {
    //可用script标签导入，会输出一个全局变量
    iife: {
      sourcemap: openSourceMap,
      file: `dist/${options.filename}.iife.js`,
      format: "iife",
      globals,
      exports: "auto",
      externalLiveBindings: false,
      name: options.var,
    },
    // amd规范，可用require.js加载
    amd: {
      sourcemap: openSourceMap,
      exports: "auto",
      globals,
      externalLiveBindings: false,
      file: `dist/${options.filename}.amd.js`,
      format: "amd",
    },
    // 兼容 IIFE, AMD, CJS 三种模块规范
    umd: {
      sourcemap: openSourceMap,
      file: `dist/${options.filename}.umd.js`,
      format: "umd",
      globals,
      name: options.var,
      exports: "auto",
      externalLiveBindings: false,
    },
    // CommonJS规范
    cjs: {
      sourcemap: openSourceMap,
      file: `dist/${options.filename}.cjs.js`,
      format: "cjs",
      globals,
      exports: "auto",
      externalLiveBindings: false,
      banner: "#!/usr/bin/env node" // 提供命令行的可执行权限
    },
    // ES2015 Module 规范, 可用 `Webpack`, `Rollup` 加载
    esm: {
      sourcemap: openSourceMap,
      exports: "auto",
      externalLiveBindings: false,
      globals,
      file: `dist/${options.filename}.esm.js`,
      format: "es",
    },
    "esm-browser": {
      sourcemap: openSourceMap,
      exports: "auto",
      globals,
      externalLiveBindings: false,
      file: `dist/${options.filename}.esm-browser.js`,
      format: "es",
    },
  };
  if (options.formats) {
    options.formats.forEach((format) => {
      if (filterType[format]) {
        output.push(filterType[format]);
      } else {
        console.error("无效类型:" + format);
      }
    });
  } else {
    for (const key in filterType) {
      if (filterType.hasOwnProperty(key)) {
        const element = filterType[key];
        output.push(element);
      }
    }
  }
  return output;
}
