// NOTE: To use this example standalone (e.g. outside of deck.gl repo)
// delete the local development overrides at the bottom of this file

// avoid destructuring for older Node version support
const resolve = require('path').resolve;
const join = require('path').join;
const webpack = require('webpack');
const path = require('path');

const CONFIG = {

performance: { hints: false },
    // bundle app.js and everything it imports, recursively.
    entry: {
        app: resolve('./src/main.js')
    },

    devServer: {
        proxy: {
            '/api': 'http://localhost:9000'
        },
        contentBase: path.join(__dirname, './public'),
        historyApiFallback: true,
        hot: true
    },

    devtool: 'eval',

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: join(__dirname, 'src'),
                exclude: [/node_modules/]
            },
            {
                // The example has some JSON data
                test: /\.json$/,
                loader: 'json-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: [{ loader: 'url-loader?limit=100000' }]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: 'url?limit=10000&mimetype=image/svg+xml' }]
            },

            /*
    {
        test: /\.css$/,
        loader: 'style-loader'
    }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
        modules: true,
        // localIdentName: '[name]__[local]___[hash:base64:5]'
        }
    }
    */
        ]
    },

    node: {
        fs: 'empty'
    }
};

const PROD = {
    performance: { hints: false },
        output: {
            path: path.resolve(__dirname, '../src/main/resources/META-INF/resources/'),
            filename: 'bundle.js'
        },

    devServer: {
        proxy: {
            '/api': 'http://localhost:9000'
        },
        contentBase: path.join(__dirname, './public'),
        historyApiFallback: true,
        hot: true
    },

    // bundle app.js and everything it imports, recursively.
    entry: {
        app: resolve('./src/main.js')
    },

            /*
    optimization: {
        splitChunks: {
        // include all types of chunks
        chunks: 'all'
        }
    },
            */

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: join(__dirname, 'src'),
                exclude: [/node_modules/]
            },
            {
                // The example has some JSON data
                test: /\.json$/,
                loader: 'json-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: [{ loader: 'url-loader?limit=100000' }]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }]
            },

            /*
    {
        test: /\.css$/,
        loader: 'style-loader'
    }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
        modules: true,
        //localIdentName: '[name]__[local]___[hash:base64:5]'
        }
    }
    */
        ]
    },

    node: {
        fs: 'empty'
    }
};

// This line enables bundling against src in this repo rather than installed deck.gl module
//module.exports = [CONFIG, PROD];
module.exports = [PROD];