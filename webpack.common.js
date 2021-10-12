const path= require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } =require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        main: path.resolve(__dirname,'./src/js/index.js'),
        hot: 'webpack/hot/dev-server.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].bundle.js',
        },
    devtool: 'source-map',
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
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },    
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/layout/ui-kit/colors-type/colors-type.pug'), 
            filename: 'index.html',
        }),        
        new webpack.HotModuleReplacementPlugin(),        
        new webpack.SourceMapDevToolPlugin(),
        new CleanWebpackPlugin(),
    ]      
    
}