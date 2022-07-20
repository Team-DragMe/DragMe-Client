import { useEffect, useRef, useState } from 'react';
import ForwardEmojiPicker from 'src/components/Day/TodayPlan/EmojiPicker';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function WeekPlanCard() {
  const [click, setClick] = useState<boolean>(false);
  const useOutsideAlert = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (event.target instanceof HTMLElement) {
          if (ref.current && !ref.current.contains(event.target)) {
            setClick(false);
          }
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  const handleClick = (value: boolean) => {
    setClick(value);
  };
  const refPicker = useRef<HTMLDivElement>(null);
  useOutsideAlert(refPicker);

  return (
    <Styled.Root>
      <Styled.Header>
        <Styled.DayWrapper>
          <span>MON</span>
          <ForwardEmojiPicker ref={refPicker} click={click} setClick={handleClick} emoji="🔥" />
        </Styled.DayWrapper>
        <p>07.03</p>
      </Styled.Header>
    </Styled.Root>
  );
}

export default WeekPlanCard;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    width: 25.9rem;
    height: 36rem;
    box-shadow: 0px 0px 6px #d3dce7;
    border-radius: 0.4rem;
    padding: 0 2rem;
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 0;
    border-bottom: 0.12rem solid ${theme.colors.letter_grey};
    & > p {
      color: ${theme.colors.letter_black};
      font-weight: 700;
      font-size: 1.2rem;
      line-height: 150%;
    }
  `,
  DayWrapper: styled.div`
    display: flex;
    & > span {
      color: ${theme.colors.letter_black};
      font-weight: 900;
      font-size: 2.4rem;
      line-height: 150%;
    }
  `,
};
