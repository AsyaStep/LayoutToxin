const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.common')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: false,
        port: 8080,
    },
})
