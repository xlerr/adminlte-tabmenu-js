module.exports = {
    entry: {
        app: './src/index.ts',
    },
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    externals: {
        jquery: 'jQuery'
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