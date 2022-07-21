import Image from 'next/image';
import { useRouter } from 'next/router';
import NextArrow from 'public/assets/NextArrow.png';
import React, { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useRecoilState } from 'recoil';
import { weekCount, weekInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import { getCurrentWeek } from 'src/utils/getWeek';
import styled from 'styled-components';

import PrevArrow from '/public/assets/PrevArrow.png';

function WeekChange() {
  const router = useRouter();
  const [week, setWeek] = useRecoilState(weekInfo);
  const [count, setCount] = useRecoilState(weekCount);
  const thisWeek = getCurrentWeek(0);
  console.log('thisweek', thisWeek);
  const changedWeek = getCurrentWeek(count);
  console.log('changedweek', changedWeek);
  const weekDomain = `${thisWeek[0]}-${thisWeek[6]}`;
  console.log('weekdomain', weekDomain);

  const goThisWeek = () => {
    setCount(0);
    if (weekDomain !== undefined) {
      setWeek(thisWeek);
      router.push(`/week/${weekDomain}`);
    }
  };

  const handleClick = (option: number) => {
    flushSync(() => {
      setCount((prev) => prev + option);
    });
    setWeek(getCurrentWeek(count + option));
  };

  useEffect(() => {
    if (week !== undefined) {
      setWeek(getCurrentWeek(count));
      router.push(`/week/${changedWeek[0]}-${changedWeek[6]}`);
    }
  }, []);

  useEffect(() => {
    if (weekDomain !== undefined) {
      router.push(`/week/${changedWeek[0]}-${changedWeek[6]}`);
    }
  }, [count]);

  return (
    <Styled.Root>
      <Styled.Button>
        <Image
          src={PrevArrow}
          alt="이전주간"
          width={'5'}
          height={'12'}
          onClick={() => handleClick(-1)}
        />
      </Styled.Button>
      <Styled.GoThisWeek onClick={goThisWeek}>WEEK</Styled.GoThisWeek>
      <Styled.Button>
        <Image
          src={NextArrow}
          alt="다음주간"
          width={'5'}
          height={'12'}
          onClick={() => handleClick(1)}
        />
      </Styled.Button>
    </Styled.Root>
  );
}

export default WeekChange;

const Styled = {
  Root: styled.div`
    width: 9.7rem;
    height: 1.8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${theme.colors.letter_black};
    margin-left: 2rem;
  `,
  GoThisWeek: styled.div`
    width: 4.2rem;
    cursor: pointer;
  `,
  Button: styled.div`
    width: 0.5rem;
    height: 1.2rem;
    cursor: pointer;
  `,
};
