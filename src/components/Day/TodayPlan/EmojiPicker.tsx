import { IEmojiData, IEmojiPickerProps } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import SmileEmoticon from 'public/assets/SmileEmoticon.svg';
import React, { useState } from 'react';
import usePostEmojiData from 'src/hooks/query/usePostEmojiData';
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
  const { mutate: postEmoji } = usePostEmojiData();
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
  const handleEmojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData,
  ) => {
    postEmoji({ planDate: date, emoji: emojiObject.emoji });
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
              <StyledEmojiPicker.SmileEmoticon />
            ) : (
              <StyledEmojiPicker.Emoji>{emoji}</StyledEmojiPicker.Emoji>
            )}
          </StyledEmojiPicker.DefaultEmoji>
        )}
        <StyledEmojiPicker.Picker>
          {click ? <Picker onEmojiClick={handleEmojiClick} /> : <div />}
        </StyledEmojiPicker.Picker>
      </StyledEmojiPicker.Root>
    </div>
  );
}

const ForwardEmojiPicker = React.forwardRef<EmojiPickerElement, EmojiPickerProps>(EmojiPicker);
export default ForwardEmojiPicker;

const StyledEmojiPicker = {
  Root: styled.div`
    position: relative;
    z-index: 1;
  `,
  Picker: styled.div`
    position: absolute;
    top: 3rem;
    z-index: 3;
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
    cursor: pointer;
  `,
};
