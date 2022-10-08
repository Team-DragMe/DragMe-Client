import Image from 'next/image';
import { useRouter } from 'next/router';
import NextArrow from 'public/assets/NextArrow.png';
import React, { useEffect, useRef } from 'react';
import { theme } from 'src/styles/theme';
import { DayStorage, getTodayDate } from 'src/utils/getDate';
import styled from 'styled-components';

import PrevArrow from '/public/assets/PrevArrow.png';

function DayChange() {
  const router = useRouter();
  const changedDateCounter = useRef<number>(0);
  const today = getTodayDate(0);
  const dayPlanURL = router.query.date?.toString();

  const goToSelectedDay = () => {
    if (dayPlanURL !== undefined) {
      changedDateCounter
        ? router.push(`/day/${DayStorage(today.slice(0, 10), changedDateCounter.current)}`)
        : router.push(`/day/${today}`);
    }
  };

  const getPrevDate = () => {
    changedDateCounter.current -= 1;
    goToSelectedDay();
  };

  const getFollowDate = () => {
    changedDateCounter.current += 1;
    goToSelectedDay();
  };

  const goToday = () => {
    changedDateCounter.current = 0;
    goToSelectedDay();
  };

  useEffect(() => {
    if (getTodayDate(0) !== undefined) {
      router.push(`/day/${DayStorage(today.slice(0, 10), changedDateCounter.current)}`);
    }
  }, []);

  return (
    <Styled.Root>
      <Styled.Navigator onClick={() => getPrevDate()}>
        <Image src={PrevArrow} alt="이전날짜" width={'5'} height={'12'} />
      </Styled.Navigator>
      <Styled.GoToday onClick={goToday}>TODAY</Styled.GoToday>
      <Styled.Navigator onClick={() => getFollowDate()}>
        <Image src={NextArrow} alt="다음날짜" width={'5'} height={'12'} />
      </Styled.Navigator>
    </Styled.Root>
  );
}

export default DayChange;

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
  `,
  GoToday: styled.div`
    width: 4.2rem;
    cursor: pointer;
  `,
  Navigator: styled.div`
    width: 0.5rem;
    height: 1.2rem;
    cursor: pointer;
  `,
};
