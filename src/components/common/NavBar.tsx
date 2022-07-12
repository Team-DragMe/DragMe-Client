import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from 'public/assets/Logo.png';
import MenuBar from 'public/assets/MenuBar.png';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { dayInfo, weekInfo } from 'src/states';
import styled, { css } from 'styled-components';

interface LinkStyle {
  isToday: boolean;
}

function NavBar() {
  const router = useRouter();
  const [dayPeriod, setDayPeriod] = useRecoilState(dayInfo);
  const [weekPeriod, setWeekPeriod] = useRecoilState(weekInfo);
  const [isToday, setIsToday] = useState(true);

  const periodData = [
    { id: '1', name: 'TODAY PLAN', path: '/day/', term: dayPeriod },
    { id: '2', name: 'WEEK PLAN', path: '/week/', term: weekPeriod },
    //{id: '3', name: 'MONTH', path: '/month'}
  ];

  const handleSelectPeriod = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    console.log((e.target as HTMLButtonElement).id);
    if ((e.target as HTMLButtonElement).id === '1') {
      setIsToday(true);
    } else {
      setIsToday(false);
    }
  };

  return (
    <Styled.Root>
      <Link href={`${periodData[0].path}${encodeURIComponent(periodData[0].term)}`}>
        <Styled.LogoWrapper>
          <Image src={Logo} alt="로고이미지" width={'108.8'} height={'24'} />
        </Styled.LogoWrapper>
      </Link>
      <Styled.Contents>
        <Styled.Period isToday={isToday}>
          {periodData.map((period) => (
            <li key={period.id}>
              <Link href={`${period.path}${encodeURIComponent(period.term)}`}>
                <Styled.Link id={period.id} onClick={handleSelectPeriod}>
                  {period.name}
                </Styled.Link>
              </Link>
            </li>
          ))}
        </Styled.Period>
        <Link href="/mypage">
          <Styled.MyPage>MYPAGE</Styled.MyPage>
        </Link>
        <Styled.MenuWrapper>
          <Image src={MenuBar} alt="로고이미지" width={'24'} height={'18'} />
        </Styled.MenuWrapper>
      </Styled.Contents>
    </Styled.Root>
  );
}

export default NavBar;

const Styled = {
  Root: styled.div`
    width: 100%;
    height: 6rem;
    padding: 0 4.5rem 0 4.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
    box-shadow: #d0d4da 0px 10px 10px -10px;
    background-color: #fff;
  `,
  LogoWrapper: styled.div`
    display: flex;

    width: 10.88rem;
    height: 2rem;
    cursor: pointer;
  `,
  MenuWrapper: styled.div<LinkStyle>`
    display: flex;
    justify-self: end;
    width: 2.4rem;
    height: 1.8rem;
    margin-top: 0.7rem;
  `,
  Period: styled.ul<LinkStyle>`
    margin-top: 1.4rem;
    height: 6rem;
    display: flex;
    align-items: center;
    ${({ isToday }) =>
      isToday
        ? `
            li {
              &:first-child {
                & a {
                  color: black;
                }
              }
              &:nth-child(2) {
                & a {
                  color: #b6bec9;
                }
              }
            }
          `
        : `
            li {
              &:first-child {
                & a {
                  color: #b6bec9;
                }
              }
              &:nth-child(2) {
                & a {
                  color: black;
                }
              }
            }
          `}
  `,

  MyPage: styled.a`
    margin-top: 1.4rem;
    margin-right: 4rem;
    margin-left: 1.8rem;
    font-weight: bold;
    cursor: pointer;
    &:active {
      text-decoration: underline;
    }
  `,
  Link: styled.a<LinkStyle>`
    text-decoration: none;
    cursor: pointer;
    color: #b6bec9;
    font-weight: bold;
    margin-right: 3.8rem;
    &:active {
      text-decoration: underline;
    }
  `,
  Contents: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
};
