import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import TimeBlockSection from './TimeBlockSection';

interface LineWrapperStyledProps {
  idx: number;
  nowHour: number;
  planNum: number;
}

const ONE_HOUR_WIDTH = 91;
const SCROLL_END_VAL = 1200;

function TimeLine() {
  const [plans] = useState(['tempId1', 'tempId2', 'tempId3', 'tempId4']);
  const ref = useRef<HTMLDivElement>(null);
  const nowHour = new Date().getHours();

  useEffect(() => {
    if (ref.current) {
      if (nowHour < 5) {
        ref.current.scrollTo(0, 0);
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
      <Styled.Shadow direction="left" planNum={plans.length} />
      <Styled.Root ref={ref}>
        <Styled.TimeLineWrapper>
          {hours.map((el) => (
            <Styled.LineWrapper key={el}>
              <Styled.Hour idx={el} nowHour={nowHour}>
                {el}
              </Styled.Hour>
              <Styled.Line planNum={plans.length} idx={el} nowHour={nowHour} />
            </Styled.LineWrapper>
          ))}
        </Styled.TimeLineWrapper>
        <TimeBlockSection plans={plans} />
      </Styled.Root>
      <Styled.Shadow direction="right" planNum={plans.length} />
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
    overflow-x: scroll;
    ::-webkit-scrollbar {
      appearance: none;
      height: 0.6rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #0a42df;
    }
    ::-webkit-scrollbar-track {
      background-color: #f8f9fb;
    }
  `,

  Wrapper: styled.div`
    display: flex;
  `,

  TimeLineWrapper: styled.div`
    display: flex;
    margin-left: -1.2rem;
  `,

  LineWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 5.9rem;
  `,

  Hour: styled.div<Omit<LineWrapperStyledProps, 'planNum'>>`
    display: flex;
    color: ${({ idx, nowHour }) => (nowHour === idx ? '#ffffff' : '#b8b8b8')};
    font-size: 1.4rem;
    font-weight: 700;
    width: ${({ idx, nowHour }) => (nowHour === idx ? '2.7rem' : '3.2rem')};
    height: ${({ idx, nowHour }) => (nowHour === idx ? '2.7rem' : '3.2rem')};
    margin-top: 0.9rem;
    justify-content: center;
    align-items: center;
    ${({ idx, nowHour }) =>
      nowHour === idx &&
      'background-color:#0A42DF; border-radius:50%; margin:0.25rem; border:2px solid #ffffff; box-shadow: 0 0 0 2px #0A42DF; transform:'}
  `,

  Line: styled.div<LineWrapperStyledProps>`
    margin-top: ${({ idx, nowHour }) => (nowHour === idx ? '-0.1rem' : '1rem')};
    background-color: ${({ idx, nowHour }) => (nowHour === idx ? '#0A42DF' : '#e3e6ea')};
    width: 0.1rem;
    height: ${({ planNum, idx, nowHour }) =>
      `${nowHour === idx ? 4.1 + 4.4 * planNum : 1.6 + 4.4 * planNum}rem`};
  `,

  Shadow: styled.div<{ planNum: number; direction: string }>`
    margin-top: 4.2rem;
    box-shadow: ${({ direction }) => (direction === 'left' ? '10px' : '-10px')} 0px 23px
      rgb(0, 0, 0);
    width: 0.01rem;
    height: ${({ planNum }) => `${1.6 + 4.4 * planNum}rem`};
  `,
};
