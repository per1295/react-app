const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const frontendConfig = (env) => ({
    entry: {
        index: "./development/client/index.tsx"
    },
    output: {
        path: resolve(__dirname, "dist/client"),
        publicPath: "/",
        filename: "[name].js"
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js", ".jsm" ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                use: [ "source-map-loader" ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    "ts-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(gif|png|jpeg)$/,
                type: "asset/resource",
                generator: {
                    filename: "images/[name][ext]"
                }
            },
            {
                test: /\.json$/,
                type: "asset/source",
                generator: {
                    filename: "mongodb/[name][ext]"
                },
                exclude: /[\\/]node_modules[\\/]/
            }
        ]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                react: {
                    name: "react",
                    filename: "[name].bundle.js",
                    test: /[\\/]node_modules[\\/]react[\\/]/
                },
                redux_toolkit: {
                    name: "redux_toolkit",
                    filename: "[name].bundle.js",
                    test: /[\\/]node_modules[\\/]@reduxjs|react-redux|redux|redux-thunk[\\/]/
                },
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "./development/client/icons/icon.png",
                    to: "."
                },
                {
                    from: "./manifest.json",
                    to: "."
                }
            ]
        })
    ],
    mode: env.NODE_ENV || "development",
    target: "web"
});

const serverConfig = (env) => ({
    entry: {
        index: "./development/server/index.ts"
    },
    output: {
        path: resolve(__dirname, "dist/server"),
        publicPath: "/",
        filename: "[name].js"
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js", ".jsm" ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                use: [ "source-map-loader" ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    "ts-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(gif|png|jpeg)$/,
                type: "asset/resource",
                generator: {
                    filename: "images/[name][ext]"
                }
            },
            {
                test: /\.json$/,
                type: "asset/source",
                generator: {
                    filename: "mongodb/[name][ext]"
                },
                exclude: /[\\/]node_modules[\\/]/
            }
        ]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                react: {
                    name: "react",
                    filename: "[name].bundle.js",
                    test: /[\\/]node_modules[\\/]react[\\/]/
                },
                express: {
                    name: "express",
                    filename: "[name].bundle.js",
                    test: /[\\/]node_modules[\\/]express[\\/]/
                },
                redux_toolkit: {
                    name: "redux_toolkit",
                    filename: "[name].bundle.js",
                    test: /[\\/]node_modules[\\/]@reduxjs|react-redux|redux|redux-thunk[\\/]/
                },
                mongodb: {
                    name: "mongodb",
                    filename: "[name].bundle.js",
                    test: /[\\/]node_modules[\\/]mongodb|mongoose[\\/]/
                },
                nodemailer: {
                    name: "nodemailer",
                    filename: "[name].bundle.js",
                    test: /[\\/]node_modules[\\/]nodemailer[\\/]/
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "./development/client/icons/icon.png",
                    to: "."
                }
            ]
        })
    ],
    mode: env.NODE_ENV || "development",
    target: "node"
});

const serviceWorkerConfig = (env) => ({
    entry: {
        sw: "./development/service-worker/index.ts"
    },
    output: {
        path: resolve(__dirname, "dist/service-worker"),
        publicPath: "/",
        filename: "[name].js"
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js", ".jsm" ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                use: [ "source-map-loader" ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    "ts-loader"
                ]
            },
            {
                test: /\.(gif|png|jpeg)$/,
                type: "asset/resource",
                generator: {
                    filename: "images/[name][ext]"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    mode: env.NODE_ENV || "development",
    target: "webworker"
})

module.exports = (env) => [ frontendConfig(env), serverConfig(env), serviceWorkerConfig(env) ];