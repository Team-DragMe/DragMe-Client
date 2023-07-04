import { editInfo } from 'src/types/myPage';
import { client } from './api';

export const getMypage = async () => {
  const { data } = await client.get(`/user/profile`);
  console.log('data', data);
  return { data };
};

export const patchMypage = async (data: editInfo) => {
  const post = await client.patch(`/user/profile`, data);

  return post;
};
