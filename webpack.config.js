var path = require('path'),
    webpack = require('webpack'),
    htmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/main.ts",
        polyfills: [
            'core-js/es6',
            'core-js/es7/reflect',
            'zone.js/dist/zone'
        ]
    },
    output: {
        path: './dist',
        filename: '[name].[hash].js',
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.component.ts$/,
            loader: 'ts-loader!angular2-template'
        }, {
            test: /\.tsx?$/,
            exclude: /\.component.ts$/,
            loader: 'ts-loader'
        }, {
            test: /\.html$/,
            loader: 'raw-loader'
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        }]
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.html', '.css']
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            app: {
                environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'polyfills'
        }),
        new CopyWebpackPlugin([{
            from: './src/images',
            to: 'images'
        }]),
        new ExtractTextPlugin('[name].css')
    ]
};