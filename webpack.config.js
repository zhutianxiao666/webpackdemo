const path = require('path');

const obj = {
    entry: path.join(__dirname,'src','js','index.js'),
    output:{
        path: path.join(__dirname,'dist','js'),
        filename: "index.js"
    },
    mode:'production',
    module: {
        // rules: [{
        //     test: /\.less$/, use: [{
        //         loader: 'less-loader'
        //     }]
        // }]
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