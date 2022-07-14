import Image from 'next/image';
import { useRouter } from 'next/router';
import NextArrow from 'public/assets/NextArrow.png';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { dayInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import { getToday } from 'src/utils/getDate';
import styled from 'styled-components';

import PrevArrow from '/public/assets/PrevArrow.png';

function DayChange() {
  const router = useRouter();
  const [dayDate, setDayData] = useRecoilState(dayInfo);
  const [dayChange, setDayChange] = useState(0);
  setDayData(getToday(dayChange));
  useEffect(() => {
    router.push(`${dayDate}`);
  }, [dayChange]);

  return (
    <Styled.Root>
      <Styled.Button onClick={() => setDayChange(dayChange - 1)}>
        <Image src={PrevArrow} alt="이전날짜" width={'5'} height={'12'} />
      </Styled.Button>
      <Styled.GoToday onClick={() => setDayChange(0)}>TODAY</Styled.GoToday>
      <Styled.Button onClick={() => setDayChange(dayChange + 1)}>
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
