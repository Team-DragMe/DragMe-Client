import axios from 'axios';

const BASE_URL = 'https://api.dragme.kr/api';

export const client = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
