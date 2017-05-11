import path from 'path';
import webpack from 'webpack';

export default {
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, './client/index.js')
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                include: [path.join(__dirname, 'client'),
                    path.join(__dirname, 'server/shared')],
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: [' ', '.js']
    }
}