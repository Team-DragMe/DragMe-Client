import Image from 'next/image';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import NextArrow from '../../../../public/assets/NextArrow.png';
import PrevArrow from '../../../../public/assets/PrevArrow.png';
import { dayInfo } from '../../../states/index';
import { todayTime } from '../../../utils/getToday';

function DayChange() {
  const setDayData = useSetRecoilState(dayInfo);
  return (
    <Styled.Root>
      <Styled.Button>
        <Image src={PrevArrow} alt="이전날짜" width={'5'} height={'12'} />
      </Styled.Button>
      <Styled.GoToday onClick={() => setDayData}>TODAY</Styled.GoToday>
      <Styled.Button>
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
