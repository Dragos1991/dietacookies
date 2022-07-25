import { resolve } from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const cwd = process.cwd();
const sourcesPath = resolve(cwd, 'sources', 'src');
const publicPath = resolve(sourcesPath, 'public');
const distPath = resolve(cwd, 'dist', 'public');
const fileNamePattern = '[name].[contenthash].bundle.js';

const plugins = [
    new HtmlWebpackPlugin({
        templateParameters: {
            title: 'Dietacookies',
        },
        template: resolve(publicPath, 'index.hbs'),
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: '**/!(.hbs)',
                to: distPath,
                context: resolve(publicPath),
                globOptions: { dot: false },
            },
        ],
    }),
];

const config = {
    entry: {
        app: resolve(sourcesPath, 'index.tsx'),
    },
    output: {
        filename: fileNamePattern,
        path: distPath,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                include: publicPath,
                loader: require.resolve('handlebars-loader'),
            },
            {
                test: /\.(tsx?)|(jsx?)$/,
                include: sourcesPath,
                loader: require.resolve('babel-loader'),
                exclude: resolve(cwd, 'node_modules'),
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins,
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.hbs'],
        modules: ['node_modules'],
    },
};

export { config };
