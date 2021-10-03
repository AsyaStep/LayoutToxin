const path= require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        main: path.resolve(__dirname,'./src/js/index.js'),
        hot: 'webpack/hot/dev-server.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    { loader: "pug-loader" }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [ 
                    { loader: "style-loader" },
                    { loader: "css-loader" } ,
                    { loader: "sass-loader" }
                ]        
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: false,
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/pug/template.pug'), 
            filename: 'index.html',
        }),        
        new webpack.HotModuleReplacementPlugin(),
    ]      
    
}