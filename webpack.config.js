module.exports = {
    entry: {
        main: "./src/js/main.js",
        vendor: "./src/js/vendor.js",
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /vendor/],
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: "url-loader",
                    },
                ],
            },
        ],
    },
};
