import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from 'public/assets/DragmeLogo.svg';
import HamburgerMenu from 'public/assets/icons/HamburgerMenu.svg';
import MyPageModal from 'public/assets/MyPageModal.png';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dayInfo, RoutineBoxIsOpened, weekInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

type isMenuType = 'Today' | 'Week';

interface LiStyle {
  pickedMenu: isMenuType;
  symbol: string;
}

function NavBar() {
  const router = useRouter();
  const dayPeriod = useRecoilValue(dayInfo);
  const weekPeriod = useRecoilValue(weekInfo);
  const [pickedMenu, setPickedMenu] = useState<isMenuType>('Today');
  const weekDomain = `${weekPeriod[0]}-${weekPeriod[6]}`;
  const [myPageIsOpened, setMyPageIsOpened] = useState(false);
  const [hamburgerMenu, setHamburgerMenu] = useRecoilState(RoutineBoxIsOpened);

  useEffect(() => {
    setHamburgerMenu(false);
    setMyPageIsOpened(false);
  }, []);

  const handleHamburgerMenu = () => {
    setHamburgerMenu(false);

    if (hamburgerMenu === true) {
      setMyPageIsOpened(false);
    } else {
      setHamburgerMenu(true);
    }
  };
  const handleModalToggle = () => {
    if (hamburgerMenu) {
      setMyPageIsOpened(false);
    } else if (!hamburgerMenu) {
      myPageIsOpened ? setMyPageIsOpened(false) : setMyPageIsOpened(true);
    }
  };

  useEffect(() => {
    if (router.pathname === '/day/[data]') {
      setPickedMenu('Today');
    } else if (router.pathname === '/week/[week]') {
      setPickedMenu('Week');
    }
  }, [router.pathname]);

  const handleClick = (count: string) => {
    if (count === 'Today') {
      setPickedMenu('Today');
    } else if (count === 'Week') {
      setPickedMenu('Week');
    }
  };
  const periodData = [
    { id: '1', name: 'TODAY PLAN', path: '/day/', term: dayPeriod, symbol: 'Today' },
    { id: '2', name: 'WEEK PLAN', path: '/week/', term: weekDomain, symbol: 'Week' },
  ];

  return (
    <Styled.Root>
      <Link href={`${periodData[0].path}${encodeURIComponent(dayPeriod)}`}>
        <Styled.LogoWrapper onClick={() => handleClick('Today')}>
          <Logo />
        </Styled.LogoWrapper>
      </Link>
      <Styled.Contents>
        <Styled.MenuList>
          {periodData.map((period) => (
            <Styled.List
              key={period.id}
              symbol={period.symbol}
              pickedMenu={pickedMenu}
              onClick={() => handleClick(period.symbol)}
            >
              <Link href={`${period.path}${encodeURIComponent(period.term)}`}>
                <Styled.Link id={period.id} onClick={() => setHamburgerMenu(false)}>
                  {period.name}
                </Styled.Link>
              </Link>
            </Styled.List>
          ))}
          {myPageIsOpened ? (
            <Styled.MyPageOn onClick={handleModalToggle}>MY PAGE</Styled.MyPageOn>
          ) : (
            <Styled.MyPageOff onClick={handleModalToggle}>MY PAGE</Styled.MyPageOff>
          )}
        </Styled.MenuList>
        <Styled.HamburgerMenu isOpened={hamburgerMenu} onClick={handleHamburgerMenu} />
        <Styled.MyPageWrapper isToggle={myPageIsOpened}>
          <Image src={MyPageModal} alt="개인정보 모달" width={'272'} height={'354'} />
        </Styled.MyPageWrapper>
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
    box-shadow: ${theme.colors.plan_check} 0px 10px 10px -10px;
    background-color: ${theme.category.cate_white};
  `,
  LogoWrapper: styled.div`
    display: flex;
    height: 2rem;
    cursor: pointer;
  `,
  MenuWrapper: styled.div`
    display: flex;
    justify-self: end;
    width: 2.4rem;
    height: 1.8rem;
    margin-top: 0.7rem;
  `,
  MenuList: styled.ul`
    margin-top: 1.4rem;
    height: 6rem;
    display: flex;
    align-items: center;
    &:first-child {
      margin-right: 0.2rem;
    }
  `,
  MyPageOff: styled.div`
    color: ${theme.colors.plan_grey};
    font-weight: bold;
    margin-top: 0.1rem;
    margin-left: -1rem;
    margin-right: 4rem;
    cursor: pointer;
  `,

  MyPageOn: styled.div`
    color: ${theme.colors.letter_black};
    font-weight: bold;
    margin-top: 0.1rem;
    margin-left: -1rem;
    margin-right: 4rem;
    cursor: pointer;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid ${theme.colors.letter_black};
  `,

  List: styled.li<LiStyle>`
    &:nth-child(2) {
      margin-right: 1.8rem;
    }
    & a {
      color: ${theme.colors.plan_grey};
      ${({ symbol, pickedMenu }) =>
        pickedMenu === symbol &&
        `
          color: ${theme.colors.letter_black};
          padding-bottom: 0.1rem;
          border-bottom: 1px solid ${theme.colors.letter_black};
        `}
    }
  `,
  Link: styled.a`
    color: ${theme.colors.plan_grey};
    font-weight: bold;
    margin-right: 3.8rem;
    cursor: pointer;
  `,
  Contents: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  HamburgerMenu: styled(HamburgerMenu)`
    width: 4rem;
    height: 4rem;
    margin-left: -1.5rem;
    transition: all 1s;
    transform: ${(props) => props.isOpened && 'translate(6%, 2%) rotate(90deg);'};
  `,
  MyPageWrapper: styled.div<{ isToggle: boolean }>`
    display: none;
    z-index: 10;
    width: 27.2rem;
    height: 35.4rem;
    position: absolute;
    right: 106.3px;
    top: 7.4rem;
    ${({ isToggle }) => isToggle && 'display:block;'}
  `,
};
