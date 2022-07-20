import Image from 'next/image';
import { useRouter } from 'next/router';
import NextArrow from 'public/assets/NextArrow.png';
import React, { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dayCount, dayInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import { DayStorage, getTodayDate } from 'src/utils/getDate';
import styled from 'styled-components';

import PrevArrow from '/public/assets/PrevArrow.png';

function DayChange() {
  const router = useRouter();
  const setDayDate = useSetRecoilState(dayInfo);
  const [dayChange, setDayChange] = useRecoilState(dayCount);
  const day = getTodayDate(0);
  const SavedDay = DayStorage(day.slice(0, 10), dayChange);
  const dayPlanURL = router.query.date?.toString();

  const goToday = () => {
    setDayChange(0);
    if (dayPlanURL !== undefined) {
      setDayDate(day);
      router.push(`/day/${day}`);
    }
  };

  useEffect(() => {
    if (dayPlanURL !== undefined) {
      router.push(`/day/${SavedDay}`);
    }
  }, [dayChange]);

  useEffect(() => {
    if (dayPlanURL !== undefined) {
      const regex =
        /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(MON|TUE|WED|THU|FRI|SAT|SUN)$/g;
      if (!regex.test(dayPlanURL)) {
        router.push('/404');
      } else {
        router.push(`/day/${SavedDay}`);
      }
    }
  }, [router.asPath]);

  const handleClick = (option: number) => {
    flushSync(() => {
      setDayChange((prev) => prev + option);
    });
    setDayDate(DayStorage(day.slice(0, 10), dayChange + option));
  };

  return (
    <Styled.Root>
      <Styled.Button onClick={() => handleClick(-1)}>
        <Image src={PrevArrow} alt="이전날짜" width={'5'} height={'12'} />
      </Styled.Button>
      <Styled.GoToday onClick={goToday}>TODAY</Styled.GoToday>
      <Styled.Button onClick={() => handleClick(+1)}>
        <Image src={NextArrow} alt="다음날짜" width={'5'} height={'12'} />
      </Styled.Button>
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
  Button: styled.div`
    width: 0.5rem;
    height: 1.2rem;
    cursor: pointer;
  `,
};
