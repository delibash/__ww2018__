import DataAPI from './api';
import axios from 'axios';

const env = process.env.NODE_ENV;
let api = new DataAPI(
  axios
);
if (env === 'development') {
  api = new DataAPI(axios, 'http://localhost:3000');
}

export default api;