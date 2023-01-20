const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const { join } = require("path");

const dev = join(process.cwd(), "development");
const dist = join(process.cwd(), "dist");

const frontendConfig = (env) => ({
    name: "frontentd",
    entry: {
        client: join(dev, "client", "index.tsx")
    },
    output: {
        path: join(dist, "client"),
        publicPath: "/",
        filename: "[name].js"
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js", ".jsm" ]
    },
    module: {
        rules: [
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
                type: "asset/inline"
            },
        ]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                libraries: {
                    name: "client-libraries",
                    filename: "[name].bundle.js",
                    test: /[\\/]node_modules[\\/]/
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
                    from: "./icon.png",
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
    name: "server",
    entry: {
        server: join(dev, "server", "index.ts")
    },
    output: {
        path: join(dist, "server"),
        filename: "[name].cjs"
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js", ".jsm" ]
    },
    module: {
        rules: [
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
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "css-loader"
                ]
            },
            {
                test: /\.(gif|png|jpeg)$/,
                type: "asset/inline"
            }
        ]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                libraries: {
                    name: "server-libraries",
                    filename: "[name].bundle.cjs",
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: join(dev, "server", "index.html"),
                    to: "."
                }
            ]
        })
    ],
    mode: env.NODE_ENV || "development",
    target: "node"
});

const serviceWorkerConfig = (env) => ({
    name: "service-worker",
    entry: {
        "service-worker": join(dev, "service-worker", "index.ts")
    },
    output: {
        path: join(dist, "service-worker"),
        publicPath: "/",
        filename: "[name].js"
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js", ".jsm" ]
    },
    module: {
        rules: [
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
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                libraries: {
                    name: "sw-libraries",
                    filename: "[name].bundle.js",
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    mode: env.NODE_ENV || "development",
    target: "webworker"
})

module.exports = (env) => [ frontendConfig(env), serverConfig(env), serviceWorkerConfig(env) ];