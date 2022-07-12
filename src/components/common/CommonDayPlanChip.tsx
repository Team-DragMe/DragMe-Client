import Image from 'next/image';
import SemiArrow from 'public/assets/icons/SemiArrow.svg';
import React from 'react';
import { theme } from 'src/styles/theme';
import styled, { css } from 'styled-components';

import Addon from './Addon';
import CheckBox from './CheckBox';
import CollapseArrow from './CollapseArrow';

type shapeType = 'rectangle' | 'triangle';

interface CommonDayPlanChipProps {
  //@TODO color code값 타입으로 한정하기
  color?: string;
  children: string;
  shape?: shapeType;
  arrow?: boolean;
  addon?: boolean;
}

interface ColorChipStyleProps {
  color: string;
}

interface BoxStyleProps {
  shape: shapeType;
}

function CommonDayPlanChip({
  color = 'none',
  shape = 'rectangle',
  arrow = false,
  addon = false,
  children,
  ...props
}: CommonDayPlanChipProps) {
  return (
    <Styled.Container {...props}>
      {color !== 'none' && <Styled.ColorChip color={color} />}
      <Styled.Box shape={shape}>
        <CheckBox id="dayCheck" />
        <Styled.Contents>{children}</Styled.Contents>
        {arrow && <CollapseArrow />}
        {addon && <Addon />}
        <div className="semiArrowWrapper">
          <SemiArrow />
        </div>
      </Styled.Box>
    </Styled.Container>
  );
}

export default CommonDayPlanChip;

const Styled = {
  Container: styled.section`
    display: flex;
    align-items: center;
    width: 100%;
    height: 3.2rem;
  `,
  ColorChip: styled.div<ColorChipStyleProps>`
    border-top: 1px solid ${theme.colors.plan_grey01};
    border-bottom: 1px solid ${theme.colors.plan_grey01};
    border-left: 1px solid ${theme.colors.plan_grey01};
    background: ${({ color }) => color};
    width: 1rem;
    height: 100%;
  `,
  Box: styled.div<BoxStyleProps>`
    display: flex;
    align-items: center;
    padding-left: 0.8rem;
    width: 100%;
    height: 100%;
    .semiArrowWrapper {
      display: flex;
      position: relative;
      left: 15.8rem;
      align-items: center;
      justify-content: center;
      transform: rotate(1deg);
      width: fit-content;
      height: 3.14rem;
      overflow: hidden;
    }
    & > svg {
      width: fit-content;
      height: fit-content;
    }
    ${({ shape }) =>
      shape === 'rectangle'
        ? css`
            border: 1px solid ${theme.colors.plan_grey01};
            & > svg {
              display: none;
            }
          `
        : css`
            border-top: 1px solid ${theme.colors.plan_grey01};
            border-bottom: 1px solid ${theme.colors.plan_grey01};
            border-left: 1px solid ${theme.colors.plan_grey01};
          `}
  `,
  RectangleBox: styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${theme.colors.plan_grey01};
    padding-left: 0.8rem;
    width: 100%;
    height: 100%;
  `,
  TriangleBox: styled.div`
    display: flex;
    align-items: center;
    border-top: 1px solid ${theme.colors.plan_grey01};
    border-bottom: 1px solid ${theme.colors.plan_grey01};
    border-left: 1px solid ${theme.colors.plan_grey01};
    padding-left: 0.8rem;
    width: 100%;
    height: 100%;
  `,
  Arrow: styled.div`
    position: relative;
    top: -6px;
    left: 16.6rem;
    height: 3.2rem;
    & div {
      background: ${theme.colors.plan_grey01};
      width: 0.1rem;
      height: 2rem;
    }
    div {
      &:nth-child(1) {
        position: relative;
        top: 4px;
        transform: rotate(145deg);
      }
      &:nth-child(2) {
        transform: rotate(35deg);
      }
    }
  `,
  Contents: styled.span`
    display: flex;
    align-items: center;
    margin-left: 0.8rem;
  `,
};
