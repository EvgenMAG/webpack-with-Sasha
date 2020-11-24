const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');

const loadModeConfigs = (env) => {
    require(`./build-utils/${env.mode}.config`)(env);
};

module.exports = (env) => merge({
    mode: env.mode,
    context: path.resolve(__dirname, "src"),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_module/,
            use: ["babel-loader"]
        },
            {
            test: /\.(gif|png|jpe?g|svg)$/,
            use: [{
                    loader: "url-loader",
                    option: {
                        name: "[path]/[name].[ext]",
                        limit: false,
                    }
                }]
            },
            {
                test: /\.html$/,
                use:["html-loader"]
            },
            {
                test:/\hbs$/,
                use:["handlebars-loader"]
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new WebpackBar(),
        ]
},
    loadModeConfigs(env)
)
