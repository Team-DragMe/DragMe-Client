import Image from 'next/image';
import { useRouter } from 'next/router';
import NextArrow from 'public/assets/NextArrow.png';
import React, { useEffect } from 'react';
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
  const firstDayInThisWeek = week[0].slice(8, 10);
  const lastDayInThisWeek = week[6].slice(8, 10);

  useEffect(() => {}, []);

  const goThisWeek = () => {
    setCount(0);
  };

  return (
    <Styled.Root>
      <Styled.Button>
        <Image src={PrevArrow} alt="이전주간" width={'5'} height={'12'} />
      </Styled.Button>
      <Styled.GoThisWeek onClick={goThisWeek}>WEEK</Styled.GoThisWeek>
      <Styled.Button>
        <Image src={NextArrow} alt="다음주간" width={'5'} height={'12'} />
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
