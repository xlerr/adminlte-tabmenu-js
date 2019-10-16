const path = require("path");

module.exports = {
    entry: {
        'tab.menu': './src/index.ts',
        'sub.iframe': './src/sub.iframe.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: "[name].js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    externals: {
        // jquery: 'jQuery',
        // sortablejs: 'Sortable',
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }
};