#  webpack

webpack是一个构建工具，用来构建项目

源代码：程序员写的代码被称为源代码

src：原文件，相当于鸡蛋和米饭。

dist：加工后的代码、经过加工后的代码。相当于蛋炒饭。

构建是对代码进行编译、压缩、语法检查、兼容性处理、生成浏览器可以高效、稳定运行的代码。

常见构建工具：grunt、gulp、webpack（最好用的）

webpack------ React 、Vue 都选择了webpack作为构建工具的基石

React: 语法、jsx 

Vue: 语法

## 快速入门
* 什么是webpack
    * webpack是一个模块打包器（bundler）
    * 在webpack看来，前端的所有资源都会被作为模块处理
    * 它将模块之间的依赖关系进行静态分析，生成对应的静态资源
* 五个核心模块
    * Entry: 入口起点。指示webpack应该用哪个模块，作为构建依赖图的的开始
    
    * Output: 告诉webpack在哪里输出它所创建的bundles,以及命名这些文件。默认为./dist
    
    * Loader: (webpack只能解析js、json)，loader让webpack能处理那些非js文件
    
    * Plugins: 插件可以让webpack执行范围更广的任务。
      插件的的范围包括，从打包优化和压缩、一直到重新定义环境中的变量
    
    * Mode: 模式，有生产模式和开发模式production 和development
    
## 开启项目

* 初始化项目
```
npm init -y
```
* 安装webpack
    * npm install webpack webpack-cli -D  // 本地安装
    * npm install webpack webpack-cli -g  // 全局安装 都要有
* 创建js文件和json文件并引入
```
import {add as ad} from './module1'
import a from '../json/test.json'
console.log(a,typeof a);
console.log(ad(1, 2));
```
* 运行指令
    * 开发版本：webpack src/js/index.js -o dist/js/index.js --mode development
    * 生产版本：webpack src/js/index.js -o dist/js/index.js --mode production
* 结论
    * webpack能编译js和json文件
    * 能将es6模块转化为浏览器能识别的语言
    * 能压缩代码
* 缺点
    * 不能编译其他文件
    * 不能将es6的语法变成es5
* 改善：使用webpack配置文件解决，自定义功能
