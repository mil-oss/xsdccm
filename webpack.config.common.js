var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './assets/app/main.ts',
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loaders: ['html-loader']
            },
            {
                test: /\.css$/,
                loaders: ['raw-loader']
            }, 
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=img/[name].[ext]'
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: require.resolve('./assets/index.html')
        })
    ]
};