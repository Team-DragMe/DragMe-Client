import { IEmojiData, IEmojiPickerProps } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import SmileEmoticon from 'public/assets/SmileEmoticon.png';
import React, { useState } from 'react';
import styled from 'styled-components';

const Picker = dynamic(async () => import('emoji-picker-react'), {
  ssr: false,
});

type EmojiPickerElement = HTMLDivElement;

interface EmojiPickerProps extends Omit<IEmojiPickerProps, 'onEmojiClick'> {
  click: boolean;
  setClick: (value: boolean) => void;
  emoji: string;
}

function EmojiPicker(
  { click, setClick, emoji }: EmojiPickerProps,
  ref: React.ForwardedRef<EmojiPickerElement>,
) {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
  const handleEmojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData,
  ) => {
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
              <Image src={SmileEmoticon} alt="" />
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
  Emoji: styled.div`
    font-size: 1.5rem;
    padding: 0.5rem;
    cursor: pointer;
  `,
  DefaultEmoji: styled.div`
    padding: 0.5rem;
    cursor: pointer;
  `,
};
