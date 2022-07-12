import { useEffect, useRef, useState } from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import TimeBlockSection from './TimeBlockSection';

interface LineWrapperStyledProps {
  idx: number;
  nowHour: number;
}

const ONE_HOUR_WIDTH = 91;
const SCROLL_END_VAL = 1200;

function TimeLine() {
  const [plans] = useState(['tempId1', 'tempId2', 'tempId3']);
  const ref = useRef<HTMLDivElement>(null);
  const nowHour = new Date().getHours();

  useEffect(() => {
    if (ref.current) {
      if (nowHour < 5) {
        ref.current.scrollTo(10, 0);
      } else if (nowHour < 17 && nowHour >= 4) {
        ref.current.scrollTo(ONE_HOUR_WIDTH * (nowHour - 4), 0);
      } else {
        ref.current.scrollTo(SCROLL_END_VAL, 0);
      }
    }
  }, []);

  const getTimeLine = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };

  const hours = getTimeLine();

  return (
    <Styled.Wrapper>
      <Styled.Shadow direction="left" />
      <Styled.Root ref={ref}>
        <Styled.TimeLineWrapper>
          {hours.map((el) => (
            <Styled.LineWrapper key={el}>
              <Styled.Hour idx={el} nowHour={nowHour}>
                {el}
              </Styled.Hour>
              <Styled.Line idx={el} nowHour={nowHour} />
            </Styled.LineWrapper>
          ))}
        </Styled.TimeLineWrapper>
        <TimeBlockSection plans={plans} />
      </Styled.Root>
      <Styled.Shadow direction="right" />
    </Styled.Wrapper>
  );
}

export default TimeLine;

const Styled = {
  Root: styled.div`
    display: flex;
    position: relative;
    padding-bottom: 4rem;
    width: 109.8rem;
    overflow-y: hidden;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      appearance: none;
      height: 0.6rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.main_color};
    }
    ::-webkit-scrollbar-track {
      background-color: ${theme.colors.scroll_grey};
    }
  `,

  Wrapper: styled.div`
    display: flex;
  `,

  TimeLineWrapper: styled.div`
    display: flex;
  `,

  LineWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 5.9rem;
  `,

  Hour: styled.div<LineWrapperStyledProps>`
    display: flex;
    color: ${({ idx, nowHour }) =>
      nowHour === idx ? theme.category.cate_white : theme.colors.plan_grey};
    font-size: 1.4rem;
    font-weight: 700;
    width: ${({ idx, nowHour }) => (nowHour === idx ? '2.7rem' : '3.2rem')};
    height: ${({ idx, nowHour }) => (nowHour === idx ? '2.7rem' : '3.2rem')};
    margin-top: 0.9rem;
    justify-content: center;
    align-items: center;
    ${({ idx, nowHour }) =>
      nowHour === idx &&
      `background-color:${theme.colors.main_color}; border-radius:50%; margin:0.25rem; border:2px solid ${theme.category.cate_white};; box-shadow: 0 0 0 2px ${theme.colors.main_color};`}
  `,

  Line: styled.div<LineWrapperStyledProps>`
    margin-top: ${({ idx, nowHour }) => nowHour !== idx && '1rem'};
    background-color: ${({ idx, nowHour }) =>
      nowHour === idx ? theme.colors.main_color : theme.colors.hour_line};
    width: 0.1rem;
    height: ${({ idx, nowHour }) => (nowHour === idx ? '46.5rem' : '44.6rem')};
  `,

  Shadow: styled.div<{ direction: string }>`
    margin-top: 4.2rem;
    box-shadow: ${({ direction }) => (direction === 'left' ? '10px' : '-10px')} 0px 23px
      rgb(0, 0, 0);
    width: 0.01rem;
    height: 44.6rem;
  `,
};
