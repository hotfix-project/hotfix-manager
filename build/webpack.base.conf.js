var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer');
var config = require('./config');
var merge = require('lodash/merge');
var path = require('path');
var sBase = config.sBase;

var aPlugin = [];
var aPostcss = [autoprefixer({browsers: ['> 5%','ie 9']})];
if(config.enableRem){
    // aPostcss.push(require('postcss-plugin-px2rem')(config.px2remOptions));
    // aPostcss.push(require('postcss-flexible')(config.px2rem));    
}

module.exports = {
    entry: config.entry,
    output: {
        path: config.sDist,
        filename: '[name].js',
        chunkFilename: "[name].js"
    },
    recordsPath: path.resolve(__dirname, '../../recordsPath.json'), 
    module: {
        loaders: [
            {test: /\.(js|jsx)$/, loader: "babel", exclude: /node_modules/},
            {test: /\.(html)$/, loader: 'html'},
            {test: /\.vue$/, loader: 'vue'},
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 1,
                    name:'/static/fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: aPlugin,
    postcss: function () {
        return aPostcss;
    },
    resolve:{
        modulesDirectories: [ "node_modules",sBase,sBase+"pages", sBase+"widget",sBase+'mock'],
        extensions:['','.js','.vue','.json'],
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    }
}