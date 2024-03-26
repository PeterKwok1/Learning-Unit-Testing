import path from 'path'
import common from './webpack.common.js'
import { merge } from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
        }),
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
    ],
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false
        })]
    }

})