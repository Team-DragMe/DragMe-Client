import { IEmojiData, IEmojiPickerProps } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import SmileEmoticon from 'public/assets/SmileEmoticon.svg';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import usePostInformationData from 'src/hooks/query/usePostInformationData';
import styled from 'styled-components';

const Picker = dynamic(async () => import('emoji-picker-react'), {
  ssr: false,
});

type EmojiPickerElement = HTMLDivElement;

interface EmojiPickerProps extends Omit<IEmojiPickerProps, 'onEmojiClick'> {
  click: boolean;
  setClick: (value: boolean) => void;
  emoji: string;
  date: string;
}

function EmojiPicker(
  { click, setClick, emoji, date }: EmojiPickerProps,
  ref: React.ForwardedRef<EmojiPickerElement>,
) {
  const { mutate: postEmoji } = usePostInformationData();
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
  const handleEmojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData,
  ) => {
    postEmoji({ date, type: 'emoji', value: emojiObject.emoji });
    setChosenEmoji(emojiObject);
    setClick(false);
  };

  const handleImageClick = () => {
    setClick(!click);
  };

  return (
    <div ref={ref}>
      <StyledEmojiPicker.Root onClick={handleImageClick}>
        {chosenEmoji ? (
          <StyledEmojiPicker.Emoji>{chosenEmoji.emoji}</StyledEmojiPicker.Emoji>
        ) : (
          <StyledEmojiPicker.DefaultEmoji>
            {emoji === '' ? (
              <StyledEmojiPicker.SmileEmoticon></StyledEmojiPicker.SmileEmoticon>
            ) : (
              <StyledEmojiPicker.Emoji>{emoji}</StyledEmojiPicker.Emoji>
            )}
          </StyledEmojiPicker.DefaultEmoji>
        )}
      </StyledEmojiPicker.Root>
      <StyledEmojiPicker.Picker>
        {click ? <Picker onEmojiClick={handleEmojiClick} /> : <div />}
      </StyledEmojiPicker.Picker>
    </div>
  );
}

const ForwardEmojiPicker = React.forwardRef<EmojiPickerElement, EmojiPickerProps>(EmojiPicker);
export default ForwardEmojiPicker;

const StyledEmojiPicker = {
  Root: styled.div``,
  Picker: styled.div`
    position: fixed;
    cursor: pointer;
  `,
  Emoji: styled.a`
    font-size: 1.5rem;
    padding: 0.5rem;
    cursor: pointer;
  `,
  SmileEmoticon: styled(SmileEmoticon)`
    cursor: pointer;
  `,
  DefaultEmoji: styled.a`
    font-size: 1.5rem;
    padding: 0.5rem;
    cursor: pointer;
  `,
};
