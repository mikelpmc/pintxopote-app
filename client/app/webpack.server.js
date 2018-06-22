const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const webPackNodeExternals = require('webpack-node-externals');

const config = {
    // Inform webpack that we are building a bundle
    // for nodeJs, rather than the browser
    target: 'node',

    // Tell webpack the root file of our server (entry point)
    entry: './src/server.js',

    // Tell webpack where to put the output file that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    externals: [webPackNodeExternals()] // Webpack will ignore anything inside node_modules
};

module.exports = merge(baseConfig, config);
