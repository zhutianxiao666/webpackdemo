#   webpack

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
    * 新建webpack.config.js
    * 编辑内容
```javascript
const path = require('path');
const obj = {
    entry: path.join(__dirname,'src','js','index.js'),
    output:{
        path: path.join(__dirname,'dist','js'),
        filename: "index.js"
    },
    mode:'production'
}
module.exports = obj;
```
    * entry全写
```javascript
entry: {
    爱叫啥叫啥: '路径'
}
```
## loader
要解析非js json文件，可以用到loader

如何找到loader呢？

一般loader命名规则为 xxxx-loader xxxx为解决的问题。

比如要解决less编译问题就找less-loader


### less-loader
#### 下载
要使用less-loader编译成功，需要下载3个loader以及less模块
```$xslt
npm install less-loader style-loader css-loader less -D
```
#### 配置
在webpack.config.js中添加配置
```javascript
const path = require('path');
const obj = {
    // ....
    module: {
        // 如果单个loader 只要写一个loader就可以(但是less需要很多loader)
        rules: [{
            test: /\.less$/,
            loader: 'less-loader'
            
        }],
        // 如果是多个loader 就写入use中
        rules: [{
            test: /\.less$/,
            use:[
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        }],
        // use的全写是 一个个属性名为loader的对象的对象，
        rules: [{
            test: /\.less$/,
            use:[
                {loader: "style-loader"},
                {loader: "css-loader"},
                {loader: "less-loader"}
            ]
        }]
    }
}
module.exports = obj;
```
#### 缺陷
这样打包的less，内容被打包到了index.js中。并没有独立的css样式文件

### js语法检查
#### 下载
npm i eslint eslint-loader -D
#### webpack.config.js中配置
```javascript
{
    test: /\.js$/, // 只检查js
    exclude: /node_modules/, // 排除检查
    enforce: "pre", // 提前加载
    loader: 'eslint-loader' // 使用eslint-loader解析
}
```
#### 规则写在.eslintrc.js中写
```json
  module.exports = {
      //解决错误： Parsing error: Unexpected token <
      root: true,
      parserOptions: {
          sourceType: 'module'
      },
      parser: "vue-eslint-parser",
      env: {
          browser: true,
          node: true,
          es6: true,
      },
      rules: {
          'no-console':2,
          'eqeqeq':2
      },
  
      //全局变量
      globals: {
          AMap: true
      }
  }

```

### es6语法转化为es5

#### 下载
```$xslt
npm install babel-loader @babel/core @babel/preset-env -D
```

#### webpack.config.js 配置
```js
{
    test: /\.js/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets:["@babel/preset-env"]
        }
    }
}
```

### js兼容性处理
使用polyfill
#### 安装
```$xslt
npm install @babel/polyfill -D
```
#### 在入口js文件中引入
```javascript
import '@babel/polyfill';
```
再运行webpack就可以了

#### 缺点
不管用没用高级语法，所有的新语法都转化。文件会很大
#### 解决方案
依赖core-js实现按需引入

### 兼容性解决方案：core-js

**安装**



```$xslt
npm i core-js
```

**配置webpack.config.js**

```js
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        useBuiltIns:"usage",
                        corejs : {version:3},
                        targets: { // 兼容的浏览器
                            "chrome" :"58",
                            "ie" :"9" 
                        }
                    }
                ]
            ],
            cacheDirectory:true

        }
    }
}
```

接下去就可以调用webpack进行打包

### 打包样式文件中的图片资源
**安装**
```$xslt
npm intall file-loader url-loader -D
```
**配置webpack.config.js**

```javascript
{
    test: /\.(png|gif|jpg)$/,
    use: {
        loader: "url-loader",
        options: {
            limit: 8192,  // 8kb一下的图片转化为 base64处理
            outputPath:'images',  //文件输出路径
            publicPath: '../dist/images', // 图片的url地址
            name:'[hash:5].[ext]' // 修改哈希值取前五位，后面保留文件后缀
        }
    }
}
```
**执行**
webpack

### 打包html文件
需要依赖plugin
**下载**
```text
npm i html-webpack-plugin -D

```
**配置webpack.config.js**
```javascript
// 需要先引入
const htmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
```
**调用**
webpack
### 打包html中图片文件
* 概述:url-loader只能处理js中的图片，css样式中的图片。不能处理html中img标签中的图片，需要引入其他html-loader才行。（html-loader是用来处理html中的标签的，包含img）
* 安装：npm install html-loader -D
* 配置loader
```javascript
{
    test: /\.html$/,
    use: {
        loader: "html-loader"
    }
}
```

### 其他资源（字体等）
**a安装file-loader(之前已经安装过了)**

**配置webpack.config中的规则**
```javascript
{
    test: /\.(eot|woff|ttf|svg)$/,
    loader: "file-loader",
    options: {
        outputPath:'media',
        name:'[hash:5].[ext]'
    }
}
```
运行

### 自动编译打包
* 下载
```text
npm install webpack-dev-server --D
```
* 配置package.json文件
```text
"start": "webpack-dev-server "
```
* 配置webpack.config.js文件
新增如下内容
```text
devServer: {
    open:true, // 自动开启服务
    port:8888  // 自定义端口号
}
```

#### 缺陷
会自动刷新 live-reloading ------ webpack-dev-server自带
解放方案（热模替换、模块热更新），英文名HMR

### 热更新、热模替换
注意：入口文件改成数组格式，并且添加index.html，这样才能检测html的变化
```text
// 配置自动会编译
entry: [path.join(__dirname,'src','js','index.js'),'./src/index.html'], 
devServer: {
    open:true,
    port:8888, // 端口号
    compress: true, //启动gzip压缩（可有可无）
    hot: true //开启热更新
}
```

### devtool
问题：代码压缩转化后，报错内容很难定位。devtool可以很好的解决这个问题。
* 一种将压缩后的代码，映射回原文件的技术，让我们调试不再困难
* 配置推荐
开发环境：cheap-module-eval-source-map
生产环境：cheap-module-source-map

### 准备生产环境
* 把webpack.config.js拷贝两次到一个新的文件夹config中
分别命名为webpack.dev.js webpack.prod.js
* 书写package.json文件
```text
"build": "webpack  --config ./config/webpack.prod.js",
"start": "webpack-dev-server  --config ./config/webpack.dev.js"
``` 
* 修改两个webpack文件中的地址的配置
```javascript
output:{
    path: resolve(__dirname,'../dist'),  // 因为写到了内部，所以要加上../ 返到上一级目录
    filename: "js/index.js",
    publicPath: "/" // 一定要写这个 ，就相当于相对于localhost:3000/进行查找静态资源。而不是相对路径
},
```
### 清除打包文件
* 下载
```text
npm install clean-webpack-plugin -D
```
* 引入
```javascript
const {CleanWebpackPlugin} = require('clean-webpack-plugin');  //注意需要解构
```
* 使用
```javascript
// 配置插件
plugins: [
    new htmlWebpackPlugin({
        template: "./src/index.html"
    }),
    new CleanWebpackPlugin()     // 这里实例化对象，就可以每次删除dist文件夹中的文件
],
```

### 单独打包css样式文件
* 安装插件
```text
npm install mini-css-extract-plugin -D
```
* 引入插件
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```
* 配置loader
```javascript
// 打包less
{
    test: /\.less$/,
    use:[
        MiniCssExtractPlugin.loader , // 生成css文件
        // {loader: "style-loader"}, // html中创建style标签
        {loader: "css-loader"},   // 将less编译后的css转化为commodJS的一个模块
        {loader: "less-loader"},  // 将less文件编译为css，但不生成css文件，而是保存在内存中

    ]
},
```
* 配置插件
```javascript
plugins: [
    new htmlWebpackPlugin({
        template: "./src/index.html"
    }),
    new CleanWebpackPlugin() ,    // 这里实例化对象，就可以每次删除dist文件夹中的文件
    new MiniCssExtractPlugin({
        filename:"css/[name].css"
    })
],
```
* 运行指令

### css兼容性
* 安装
```text
npm i postcss-loader  autoprefixer postcss-flexbugs-fixes postcss-preset-env postcss-normalize  -D
```
* 配置webpack

```javascript
{
    test: /\.less$/,
    use:[
        MiniCssExtractPlugin.loader , // 生成css文件
        // {loader: "style-loader"}, // html中创建style标签
        {loader: "css-loader"},   // 将less编译后的css转化为commodJS的一个模块
        {//css兼容 postcss-loader postcss-preset-env
            loader:"postcss-loader",
            options:{
                postcssOptions:{
                    ident:"postcss",
                    plugins:[
                        require('postcss-flexbugs-fixes'),
                        require('postcss-preset-env')({
                            autoprefixer: {
                                flexbox:'no-2009',
                            },
                            stage:3
                        }),
                        require('postcss-normalize')()
                    ]
                }
            }
        },
        {loader: "less-loader"}  // 将less文件编译为css，但不生成css文件，而是保存在内存中
    
    ]
},
```
* 根目录添加一个兼容浏览器版本的文件
.browserslistrc文件
内容如下
```text
last 1 version
> 1%
IE 10 # sorry
```


### 压缩css
* 安装
```text
npm install optimize-css-assets-webpack-plugin -D
```
* 引入
```text
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
```
* 配置插件
```javascript
// 配置插件
plugins: [
    new htmlWebpackPlugin({
        template: "./src/index.html"
    }),
    new CleanWebpackPlugin() ,    // 这里实例化对象，就可以每次删除dist文件夹中的文件
    new MiniCssExtractPlugin({
        filename:"css/[name].css"
    }),
    new OptimizeCssAssetsWebpackPlugin({
        cssProcessPluginOptions:{
            preset: ['default',{discardComments:{removeAll: true}}]
        },
        cssProcessorOptions: {
            map: {
                inline: false,
                annotation: true
            }
        }
    })
],
```

### 压缩html
修改html-webpack-plugin的配置
```javascript
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            minify: true
        })]
```
如此配置后，加工的html就是压缩的文件
