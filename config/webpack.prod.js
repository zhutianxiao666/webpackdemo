// 生产环境
const {resolve} = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');  //注意需要解构
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const obj = {
    entry: ['./src/js/index.js','./src/index.html'],
    output:{
        path: resolve(__dirname,'../dist'),  // 因为写到了内部，所以要加上../ 返到上一级目录
        filename: "js/index.js",
        publicPath: "/" // 一定要写这个 ，就相当于相对于localhost:3000/进行查找静态资源。而不是相对路径
    },
    mode:'production',
    // 配置loader
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
                    MiniCssExtractPlugin.loader , // 生成css文件
                    // {loader: "style-loader"}, // html中创建style标签
                    {loader: "css-loader"},   // 将less编译后的css转化为commodJS的一个模块
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         ident:'postcss',
                    //         plugins:() => [
                    //             require('postcss-flexbugs-fixes'),
                    //             require('postcss-preset-env')({
                    //                 autoprefixer: {
                    //                     flexbox:'no-2009',
                    //                 },
                    //                 stage:3
                    //             }),
                    //             require('postcss-normalize')()
                    //         ],
                    //         sourceMap:true
                    //     }
                    // },
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
            template: "./src/index.html",
            minify: {
                removeEmptyAttributes: true
            }
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
    // 配置自动会编译
    // devServer: {
    //     open:true,
    //     port:8888, // 端口号
    //     compress: true, //启动gzip压缩（可有可无）
    //     hot: true //开启热更新
    // },
    // 开发者工具
    devtool: 'cheap-module-source-map'
}
module.exports = obj;
