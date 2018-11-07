var webpack = require('webpack');

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
                test: /\.(xml|xsd|xsl)$/,
                use: ['raw-loader']
            }, 
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=img/[name].[ext]'
            }
        ],
        exprContextCritical: false
    }
};