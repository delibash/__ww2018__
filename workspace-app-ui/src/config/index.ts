import Config from './configType';
const env = process.env.NODE_ENV;

let config: Config;

// TODO: [nick] refactor to use TS dynamic import
if (env === 'production') {
    config = require('./config.prod.ts').default;
} else if (env === 'staging') {
    config = require('./config.stage.ts').default;
} else if (env === null || env === undefined || env === 'development' || env === 'remote-development') {
    config = require('./config.dev.ts').default;
} else {
    throw new Error('Unrecognized Environment Found: ' + env);
}

export default config;