import middleware from "webpack-dev-middleware";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";

import { join } from "path";

const dev = join(process.cwd(), "development");
const dist = join(process.cwd(), "dist");
const publicDir = join(dev, "public");

const compiler = webpack([
    {
        name: "client",
        entry: {
            client: join(dev, "client", "index.tsx"),
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
            new WebpackManifestPlugin({
                fileName: "webpack-manifest.json",
                filter: (fileDescriptor) => {
                    return !/\.(json|png|gif|jpeg)$/.test(fileDescriptor.path)
                }
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: join(dev, "index.html"),
                        to: ".."
                    },
                    {
                        from: join(publicDir, "icon_1.png"),
                        to: "."
                    },
                    {
                        from: join(publicDir, "icon_2.png"),
                        to: "."
                    },
                    {
                        from: join(publicDir, "icon_3.png"),
                        to: "."
                    },
                    {
                        from: join(publicDir, "online.png"),
                        to: "."
                    },
                    {
                        from: join(publicDir, "offline.png"),
                        to: "."
                    },
                    {
                        from: join(publicDir, "manifest.json"),
                        to: "."
                    }
                ]
            }),
            new webpack.ProgressPlugin()
        ],
        mode: "development",
        target: "web"
    },
    {
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
        mode: "development",
        target: "webworker"
    }
]);

export const middlewareAPI = middleware(compiler, {
    writeToDisk: true
});

globalThis.__DEVELOPMENT_MIDDLEWARE_API__ = middlewareAPI;