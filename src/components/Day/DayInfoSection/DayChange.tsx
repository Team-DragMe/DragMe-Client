import Image from 'next/image';
import { useRouter } from 'next/router';
import NextArrow from 'public/assets/NextArrow.png';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { dayInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import { getTodayDate } from 'src/utils/getDate';
import styled from 'styled-components';

import PrevArrow from '/public/assets/PrevArrow.png';

function DayChange() {
  const router = useRouter();
  const [dayDate, setDayDate] = useRecoilState(dayInfo);
  const [dayChange, setDayChange] = useState(0);
  const day = getTodayDate(dayChange);
  const dayPlanURL = router.query.date?.toString();

  const goToAnotherDay = (clickEvent: number) => {
    if (clickEvent === -1) {
      setDayChange(dayChange - 1);
    } else if (clickEvent === 1) {
      setDayChange(dayChange + 1);
    }
  };

  const goToday = () => {
    setDayChange(0);
    if (dayPlanURL !== undefined) {
      router.push(`/day/${day}`);
      setDayDate(day);
      console.log(dayDate);
    }
  };

  useEffect(() => {
    if (dayPlanURL !== undefined) {
      router.push(`/day/${day}`);
      setDayDate(dayPlanURL);
    }
  }, [dayChange]);

  useEffect(() => {
    if (dayPlanURL !== undefined) {
      const regex =
        /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(MON|TUE|WED|THU|FRI|SAT|SUN)$/g;
      !regex.test(dayPlanURL) ? router.push('/404') : setDayDate(dayPlanURL);
    }
  }, [router.asPath]);

  return (
    <Styled.Root>
      <Styled.Button onClick={() => goToAnotherDay(-1)}>
        <Image src={PrevArrow} alt="이전날짜" width={'5'} height={'12'} />
      </Styled.Button>
      <Styled.GoToday onClick={goToday}>TODAY</Styled.GoToday>
      <Styled.Button onClick={() => goToAnotherDay(1)}>
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
