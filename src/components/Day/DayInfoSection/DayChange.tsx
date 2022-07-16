import Image from 'next/image';
import { useRouter } from 'next/router';
import NextArrow from 'public/assets/NextArrow.png';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { dayInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import { getTodayDate } from 'src/utils/getDate';
import { ValidURL } from 'src/utils/urlChecker';
import styled from 'styled-components';

import PrevArrow from '/public/assets/PrevArrow.png';

function DayChange() {
  const router = useRouter();
  const setDayDate = useSetRecoilState(dayInfo);
  const [dayChange, setDayChange] = useState(0);
  const day = getTodayDate(dayChange);
  const dayPlanURL = router.query.date?.toString();

  const goToYesterday = () => {
    setDayChange(dayChange - 1);
  };
  const goToTomorrow = () => {
    setDayChange(dayChange + 1);
  };

  const goToday = () => {
    setDayChange(0);
    if (dayPlanURL !== undefined) {
      router.push(`/day/${day}`);
      setDayDate(day);
    }
  };

  useEffect(() => {
    if (dayPlanURL !== undefined) {
      router.push(`/day/${day}`);
      setDayDate(day);
    }
  }, [dayChange]);

  useEffect(() => {
    if (dayPlanURL !== undefined) {
      setDayDate(dayPlanURL);
      if (dayPlanURL !== undefined) {
        const regex =
          /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(MON|TUE|WED|THU|FRI|SAT|SUN)$/g;
        if (!regex.test(dayPlanURL)) {
          router.push('/404');
        }
      }
    }
  }, [router.asPath]);

  return (
    <Styled.Root>
      <Styled.Button onClick={goToYesterday}>
        <Image src={PrevArrow} alt="이전날짜" width={'5'} height={'12'} />
      </Styled.Button>
      <Styled.GoToday onClick={goToday}>TODAY</Styled.GoToday>
      <Styled.Button onClick={goToTomorrow}>
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
