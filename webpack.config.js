const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const webpack = require("webpack");

const { join } = require("path");

const dev = join(process.cwd(), "development");
const dist = join(process.cwd(), "dist");
const publicDir = join(dev, "public");
const publicOutput = join(dist, "public");

const frontendConfig = (env) => ({
    name: "frontend",
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
            chunks: "all"
        }
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin({
            fileName: "webpack-manifest.json",
            filter: (fileDescriptor) => {
                return !/\.(json|png|gif|jpeg)$/.test(fileDescriptor.path)
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: join(publicDir, "icon_1.png"),
                    to: publicOutput
                },
                {
                    from: join(publicDir, "icon_2.png"),
                    to: publicOutput
                },
                {
                    from: join(publicDir, "icon_3.png"),
                    to: publicOutput
                },
                {
                    from: join(publicDir, "online.png"),
                    to: publicOutput
                },
                {
                    from: join(publicDir, "offline.png"),
                    to: publicOutput
                },
                {
                    from: join(publicDir, "manifest.json"),
                    to: publicOutput
                }
            ]
        })
    ],
    mode: env.NODE_ENV,
    target: "web"
});

const serverConfig = (env) => ({
    name: "server",
    entry: {
        server: join(dev, "server", "index.ts")
    },
    output: {
        path: join(dist, "server"),
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
                    filename: "[name].bundle.js",
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
                    from: join(dev, "index.html"),
                    to: ".."
                }
            ]
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/devWebpack/
        })
    ],
    mode: env.NODE_ENV,
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
    plugins: [
        new CleanWebpackPlugin()
    ],
    mode: env.NODE_ENV,
    target: "webworker"
})

module.exports = (env) => [ frontendConfig(env), serverConfig(env), serviceWorkerConfig(env) ];