const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = (env, type = "client") => ({
    entry: {
        index: `./development/${type}/index.tsx`
    },
    output: {
        path: resolve(__dirname, `dist/${type}`),
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
        new MiniCssExtractPlugin(),
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
    target: type === "client" ? "web" : "node"
});

module.exports = (env) => [ config(env), config(env, "server") ];