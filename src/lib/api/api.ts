import axios from 'axios';

const BASE_URL = 'http://3.36.0.51:8000';

export const client = axios.create({
  baseURL: BASE_URL,
});
