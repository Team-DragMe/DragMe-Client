import Image from 'next/image';
import Link from 'next/link';
import BackgroundFooter from 'public/assets/Background_footer.png';
import YourDirection from 'public/assets/YourDirection.png';
import React from 'react';
import { theme } from 'src/styles/theme';
import { getTodayDate } from 'src/utils/getDate';
import styled from 'styled-components';

function Footer() {
  return (
    <Styled.Root>
      {/* <Styled.Upper /> */}
      <Styled.GradientArea>
        <Styled.BackgroundWrapper>
          <Image
            src={BackgroundFooter}
            alt="백그라운드"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Styled.BackgroundWrapper>
        <Styled.Title>
          DRAG.ME를 통해
          <br />
          목표에 도달할 준비가 되셨나요?
          <Link href={`/day/${getTodayDate(0)}`}>
            <Styled.StartBtn>시작하기</Styled.StartBtn>
          </Link>
        </Styled.Title>
      </Styled.GradientArea>

      <Styled.Sign>
        <Image src={YourDirection} alt="이정표" width={'480'} height={'630'} />
      </Styled.Sign>
    </Styled.Root>
  );
}
export default Footer;

const Styled = {
  Root: styled.div`
    position: relative;
    width: 100%;
    height: 58rem;
  `,
  // Upper: styled.div`
  //   position: absolute;
  //   top: 17rem;
  //   width: 100%;
  //   height: 10rem;
  // border-bottom: 1rem solid #f2f4f6;
  //   background: white;
  // `,
  Title: styled.div`
    z-index: 1;
    position: relative;
    top: 40%;
    left: 338px;
    font-weight: 700;
    font-size: 32px;
    line-height: 140%;
    text-transform: uppercase;
    &:before {
      content: '';
      z-index: -1;
      position: absolute;
      width: 23rem;
      height: 0.3rem;
      left: 0rem;
      top: 107%;

      background: ${theme.colors.letter_black};
    }

    color: ${theme.colors.letter_black};
  `,
  StartBtn: styled.button`
    position: absolute;
    top: 100%;
    left: 0;
    width: 20rem;
    height: 4.8rem;
    background-color: ${theme.colors.main_color};
    border: 0;
    outline: 0;
    color: ${theme.category.cate_white};
    border-radius: 4px;
    filter: drop-shadow(0px 0px 10px rgba(0, 36, 182, 0.5));
    font-size: 2.2rem;
    line-height: 140%;
    transform: translateY(75%);
  `,
  GradientArea: styled.div`
    position: absolute;
    width: 100%;
    height: 41.8rem;
    bottom: 0;
    background: linear-gradient(0deg, #dadff7 0%, #dadff7 0.01%, rgba(218, 223, 247, 0) 59.94%);
  `,
  Sign: styled.div`
    position: absolute;
    bottom: 0;
    left: 75.3rem;
  `,
  BackgroundWrapper: styled.div`
    border-top: 1rem solid #f2f4f6;

    z-index: -2;
  `,
};
