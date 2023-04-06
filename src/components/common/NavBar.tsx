import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from 'public/assets/DragmeLogo.svg';
import HamburgerMenu from 'public/assets/icons/HamburgerMenu.svg';
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RoutineBox from 'src/components/common/RoutineBox/index';
import { theme } from 'src/styles/theme';
import { getTodayDate } from 'src/utils/getDate';
import styled from 'styled-components';

type isMenuType = 'Today' | 'Week';

interface LiStyle {
  pickedMenu: isMenuType;
  symbol: string;
}

function NavBar() {
  const router = useRouter();
  const dayPeriod = getTodayDate(0);
  const [pickedMenu, setPickedMenu] = useState<isMenuType>('Today');
  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  useEffect(() => {
    setHamburgerMenu(false);
  }, []);

  const handleHamburgerMenu = () => {
    if (router.pathname === '/') {
      setHamburgerMenu(false);
      return;
    }
    setHamburgerMenu((prev) => !prev);
  };

  useEffect(() => {
    if (router.pathname === '/day/[data]') {
      setPickedMenu('Today');
    }
  }, [router.pathname]);

  const handleClick = (count: string) => {
    if (count === 'Today') {
      setPickedMenu('Today');
    }
  };
  const periodData: [{ id: string; name: string; path: string; term: string; symbol: string }] = [
    { id: '1', name: 'DAILY PLAN', path: '/day/', term: dayPeriod, symbol: 'Today' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
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
            <Link href={'/mypage'}>
              <Styled.MyPageOff>MY PAGE</Styled.MyPageOff>
            </Link>
          </Styled.MenuList>
          <Styled.HamburgerMenu isOpened={hamburgerMenu} onClick={handleHamburgerMenu} />
        </Styled.Contents>
        <Styled.RoutineboxWrapper isOpened={hamburgerMenu}>
          <RoutineBox />
        </Styled.RoutineboxWrapper>
      </Styled.Root>
    </DndProvider>
  );
}

export default NavBar;

const Styled = {
  Root: styled.div`
    width: 100%;
    overflow: hidden;
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
  List: styled.li<LiStyle>`
    &:nth-child(2) {
      margin-right: 1.8rem;
    }
    & a {
      color: ${theme.colors.plan_grey};
      ${({ symbol, pickedMenu }) =>
        pickedMenu === symbol &&
        `
          color: ${theme.colors.main_color};
          padding-bottom: 0.1rem;
          border-bottom: 1px solid ${theme.colors.main_color};
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
    cursor: pointer;
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

  RoutineboxWrapper: styled.div<{ isOpened: boolean }>`
    z-index: 10;
    position: fixed;
    height: 98.7rem;
    top: 7rem;
    right: -30rem;
    transition: all 1s;
    transform: ${(props) => props.isOpened && 'translateX(-100%);'};
  `,
};
