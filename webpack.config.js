const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const buildPath = path.join(__dirname, 'dist');
const sourcesPath = path.join(__dirname, 'src');

var config = {
    entry: {
        main: path.join(sourcesPath, 'index.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: buildPath
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel'],
                }
            }
        }, {
            test: /\.html$/,
            use: [{
                loader: 'html-loader'
            }]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                //'postcss-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(sourcesPath, 'index.html'),
            filename: './index.html'
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(buildPath, 'vendor-manifest.json')),
            context: buildPath
        }),
        new CopyWebpackPlugin([{
            from: path.join(sourcesPath, 'favicon.png'),
            to: buildPath
        }], {debug: true})
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    if (argv.mode === 'production') {
        //...
    }

    return config;
}