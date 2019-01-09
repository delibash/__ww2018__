import { DataApi } from './dataApi';
import axios from 'axios';
import { ApiService } from './interface';

const env = process.env.NODE_ENV;
let api: ApiService;

if (env === 'remote-development') {
    api = new DataApi(axios, 'https://staging.workspace.wendy.ai');
} else {
    api = new DataApi(axios);
} 

export default api;
