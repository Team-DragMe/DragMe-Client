import axios from 'axios';

const BASE_URL = 'https://server.dragme.kr';

export const client = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
