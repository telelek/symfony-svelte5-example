const Encore = require('@symfony/webpack-encore');
const path = require('path');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or subdirectory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/app.js')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    .enableSvelte({
        // Svelte 5 configuration
        compilerOptions: {
            runes: true, // Enable Svelte 5 runes
        },
        options: {
            emitCss: true, // Extract CSS into separate files
            hotReload: !Encore.isProduction(), // Enable hot reload in development
        }
    })

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    .enableStimulusBridge('./assets/controllers.json')

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // enables and configure @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.38';
    })

    .enableTypeScriptLoader(options => {
        options.appendTsSuffixTo = [/\.svelte$/];
        options.transpileOnly = true;
    })

;

// module.exports = Encore.getWebpackConfig();
const config = Encore.getWebpackConfig();
config.resolve.conditionNames = ['browser', 'import', 'svelte'];

// Configure to handle .svelte.ts files
config.resolve.extensions = ['.mjs', '.js', '.jsx', '.vue', '.ts', '.tsx', '.json', '.svelte', '.svelte.ts'];

// Add loaders for Svelte 5 with TypeScript
if (!config.module.rules.find(rule => rule.test?.toString().includes('svelte.ts'))) {
    config.module.rules.push({
        test: /\.svelte\.ts$/,
        use: [
            'svelte-loader',
            { 
                loader: 'ts-loader', 
                options: { 
                    transpileOnly: true 
                } 
            }
        ],
    });
}

// Make sure we don't process .svelte.ts files twice
if (!config.module.rules.find(rule => rule.test?.toString().includes('(?<!\.svelte)\.ts$'))) {
    config.module.rules.push({
        test: /(?<!\.svelte)\.ts$/,
        loader: 'ts-loader',
        options: {
            transpileOnly: true,
        }
    });
}

// Required to prevent errors from Svelte on Webpack 5+
if (!config.module.rules.find(rule => rule.test?.toString().includes('node_modules\/svelte\/.*\.mjs$'))) {
    config.module.rules.push({
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
            fullySpecified: false
        }
    });
}

module.exports = config;
