import { useMutation } from 'react-query';
import { postEmojiData } from 'src/lib/api/dayApi';
import { EmojiRequestType } from 'src/types/day';

const usePostEmojiData = () => {
  const mutation = useMutation(async (data: EmojiRequestType) => postEmojiData(data));

  return mutation;
};

export default usePostEmojiData;
