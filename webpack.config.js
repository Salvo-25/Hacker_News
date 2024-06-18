const path = require('path')
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
        
    },
    plugins: [
        new Dotenv()
      ]
}
