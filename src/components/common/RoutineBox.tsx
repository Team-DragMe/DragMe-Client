import React from 'react';
import styled from 'styled-components';

import MainDayPlanList from '../Day/MainDayPlanList';

const ROUTINE_BOX = {
  EN: 'ROUTINE BOX',
  KO: '자주 사용하는 계획',
};

function RoutineBox() {
  return (
    <Styled.Root>
      <Styled.ContentsWrapper>
        <Styled.TitleArea>
          <Styled.Title>{ROUTINE_BOX.EN}</Styled.Title>
          <Styled.SubTitle>{ROUTINE_BOX.KO}</Styled.SubTitle>
        </Styled.TitleArea>
        <MainDayPlanList />
      </Styled.ContentsWrapper>
      <Styled.Footer>
        <button>DRAG.ME</button>
        <button>Find one’s own direction</button>
      </Styled.Footer>
    </Styled.Root>
  );
}

export default RoutineBox;

const Styled = {
  Root: styled.section`
    width: 32.5rem;
    height: 100%;
    background: #f8f9fb;
    border: 1px solid #ffffff;
    box-shadow: 0px 0px 10px #d2d9e8;
    border-radius: 7rem 0rem 0rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  ContentsWrapper: styled.article`
    width: 21rem;
    margin-top: 8.8rem;
  `,
  TitleArea: styled.div`
    padding-bottom: 1.2rem;
    border-bottom: 1px solid #d3d6dc;
    margin-bottom: 1.8rem;
  `,
  Title: styled.h2`
    font-style: normal;
    font-weight: 800;
    font-size: 2.4rem;
    line-height: 150%;

    /* Drag.me_blue */
    color: #0a42df;
  `,
  SubTitle: styled.h3`
    font-style: normal;
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 150%;
    /* identical to box height, or 18px */
    text-transform: uppercase;
    color: #0024b6;
  `,
  Footer: styled.footer`
    display: flex;
    justify-content: space-between;
    width: 24.6rem;
    margin: 12.4rem;
    & button {
      outline: inherit;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      color: inherit;
      font: inherit;

      font-style: normal;
      font-weight: 600;
      font-size: 1.2rem;
      line-height: 150%;
      text-transform: uppercase;
      color: #d0d4da;
      &:first-child {
        &::after {
          content: '';
          display: inline-block;
          width: 0.1rem;
          height: 0.8rem;
          background: #d0d4da;
          margin-left: 2.4rem;
          /* margin-right: 1.4rem; */
        }
      }
    }
  `,
};
