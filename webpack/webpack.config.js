const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event

const PATHS = {
    app: path.join(__dirname, '../src/static'),
    build: path.join(__dirname, '../src/static_dist')
}

const VENDOR = [
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'redux'
]

const basePath = path.resolve(__dirname, '../src/static')

const common = {
    context: basePath,
    entry: {
        vendor: VENDOR,
        app: PATHS.app
    },
    output: {
        filename: '[name].[hash].js',
        path: PATHS.build,
        publicPath: '/static'
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/static/index.html'),
            hash: true,
            filename: 'index.html',
            inject: 'body'
        })
    ],
    module:{
        rules: [
            {
                test: /\.js?/,
                use:[
                    {loader: "babel-loader"}
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|gif|png)/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '/images/[name].[ext]?[hash]'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        /*options: {
                            modules: true,
                            localIdentName: '[path][name]--[local]'
                        }*/
                    }
                ]
            },
            {
                test: /\.less$/,
                use:[
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        /*options: {
                            modules: true,
                            localIdentName: '[path][name]--[local]'
                        }*/
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.woff(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
            },
            {
                test: /\.ttf(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?.*)?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]'
            },
            {
                test: /\.otf(\?.*)?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
            },
        ]
    }
}

module.exports = common
