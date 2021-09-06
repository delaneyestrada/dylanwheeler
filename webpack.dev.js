const path = require("path");
const config = require("./webpack.config");
const {
    merge
} = require("webpack-merge");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer')


let merged = merge(config, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "/",
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        publicPath: "/",
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "src/index.html",
            filename: "./index.html",
            favicon: "src/img/favicon.ico",
        }),

        // Extract any CSS from any javascript file to process it as LESS/SASS using a loader
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css"
        }),

        // Minify CSS assets
        new OptimizeCSSAssetsPlugin({}),

        // Use BrowserSync plugin for file changes. I.e. if a CSS/SASS/LESS file changes, the changes will be injected directly in the browser with no page load
        new BrowserSyncPlugin({
            proxy: 'http://localhost:9000',
            open: 'external',
            host: 'localhost',
            port: 3000,
            files: ['./dist/main.css', './tailwind.js']
        }, {
            // disable reload from the webpack plugin since browser-sync will handle CSS injections and JS reloads
            reload: false
        })
    ],
    module: {
        rules: [{
                // Extract any SCSS content and minimize
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {

                        }
                    }
                ]
            },
            {
                // Extract any CSS content and minimize
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                    }
                ]
            }
        ],
    },
});

module.exports = merged;