const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const obj = {
    entry: [path.join(__dirname,'src','js','index.js'),'./src/index.html'],
    output:{
        path: path.join(__dirname,'dist'),
        filename: "js/index.js"
    },
    mode:'development',
    module: {
        // rules: [{
        //     test: /\.less$/, use: [{
        //         loader: 'less-loader'
        //     }]
        // }]
        rules: [
            // 打包less
            {
                test: /\.less$/,
                use:[
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader"}
                ]
            },
            // js语法检查
            {
                test: /\.js$/, // 只检查js
                exclude: /node_modules/, // 排除检查
                enforce: "pre", // 提前加载
                use: [
                    'eslint-loader'
                ] // 使用eslint-loader解析
            },
            // 处理js兼容性
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
                                    useBuiltIns:"usage", // 按需引入
                                    corejs : {version:3}, // 能解决core-js找不到的问题
                                    targets: { // 指定兼容的浏览器
                                        "chrome" :"58",
                                        "ie" :"9"
                                    }
                                }
                            ]
                        ],
                        cacheDirectory:true // 开不开缓存

                    }
                }
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 8192,  // 8kb一下的图片转化为 base64处理
                        outputPath:'images',  //文件输出路径
                        publicPath: 'images/', // 图片的url地址
                        name:'[hash:5].[ext]' // 修改哈希值取前五位，后面保留文件后缀
                    }
                }
            },
            // 处理html中的标签，包括img
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            // 其他资源 如字体等
            {
                test: /\.(eot|woff|ttf|svg)$/,
                loader: "file-loader",
                options: {
                    outputPath:'media',
                    name:'[hash:5].[ext]'
                }
            }
        ]
    },
    // 配置插件
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    // 配置自动会编译
    devServer: {
        open:true,
        port:8888, // 端口号
        compress: true, //启动gzip压缩（可有可无）
        hot: true //开启热更新
    },
    // 开发者工具
    devtool: 'cheap-module-eval-source-map'
}
module.exports = obj;
