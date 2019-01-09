import Api from './api';
import axios from 'axios';

const env = process.env.NODE_ENV;
let api = new Api(axios);

if (env === 'remote-development') {
    api = new Api(axios, 'https://staging.admin.wendy.ai');
}

export default api;