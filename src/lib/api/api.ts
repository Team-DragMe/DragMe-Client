import axios from 'axios';

const BASE_URL = 'https://api.dragme.kr/api';

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN || '',
  },
  timeout: 1000,
});
