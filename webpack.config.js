/**
 * Created by junjie on 2016/9/20.
 */
var webpack = require('webpack')

module.exports = {
    entry:  __dirname + "/src/main3.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "bundle.js",//打包后输出文件的文件名
    },

    devServer: {
        contentBase: "./",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true,             //实时刷新
        progress: true,
        hot:true
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {//在配置文件里添加JSON loader
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, //不需要处理的文件夹
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style!css'//添加对样式表的处理
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url?limit=40000'
            },
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]

}