import SemiArrow from 'public/assets/icons/SemiArrow.svg';
import React, { useState } from 'react';
import { theme } from 'src/styles/theme';
import styled, { css } from 'styled-components';

import AddonBtn from './AddonBtn';
import CheckBox from './CheckBox';
import CollapseArrow from './CollapseArrow';

type shapeType = 'rectangle' | 'triangle';
interface CommonDayPlanChipProps {
  //@TODO color code값 타입으로 한정하기
  color?: string;
  children: string;
  shape?: shapeType;
  addon?: boolean;
  onAddonClick?: () => void;
  haveChild?: boolean;
  isOpened?: boolean;
  onArrowBtnClick?: () => void;
  isCompleted?: boolean;
  id?: string;
}

interface ColorChipStyleProps {
  color: string;
}

interface BoxStyleProps {
  shape: shapeType;
}

interface ContentsStyleProps {
  isChecked: boolean;
}

function CommonDayPlanChip({
  color = 'none',
  shape = 'rectangle',
  haveChild = false,
  addon = false,
  isOpened = false,
  onAddonClick,
  onArrowBtnClick,
  children,
  isCompleted = false,
  id,
  ...props
}: CommonDayPlanChipProps) {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const handleChange = () => {
    setIsChecked((prev) => !prev);
    // id값으로 포스트하고 react query hook의 인자값 업데이트해서 업데이트 되도록..
  };
  return (
    <Styled.Container {...props}>
      {color !== 'none' && <Styled.ColorChip color={color} />}
      <Styled.Box shape={shape}>
        <CheckBox id="dayCheck" isChecked={isChecked} onChange={handleChange} />
        <Styled.ContentsWrapper>
          <div>
            <Styled.Contents isChecked={isChecked}>{children}</Styled.Contents>
          </div>
          <Styled.BtnWrapper>
            {(addon || haveChild) && <AddonBtn onClick={onAddonClick} />}
            {haveChild && <CollapseArrow isOpened={isOpened} onClick={onArrowBtnClick} />}
          </Styled.BtnWrapper>
        </Styled.ContentsWrapper>
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
    position: relative;
    .semiArrowWrapper {
      display: flex;
      position: absolute;
      left: 98.3%;
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
            .semiArrowWrapper {
              display: none;
            }
          `
        : css`
            border-top: 1px solid ${theme.colors.plan_grey01};
            border-bottom: 1px solid ${theme.colors.plan_grey01};
            border-left: 1px solid ${theme.colors.plan_grey01};
          `}
  `,
  ContentsWrapper: styled.div`
    display: flex;
    width: 17rem;
    justify-content: space-between;
    align-items: center;
  `,
  BtnWrapper: styled.div`
    display: flex;
    /* width: 100%; */
    justify-content: space-between;
    align-items: center;
    max-width: 4.7rem;
    button {
      &:last-child {
        margin-left: 0.3rem;
      }
    }
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
  Contents: styled.span<ContentsStyleProps>`
    display: flex;
    align-items: center;
    margin-left: 0.8rem;
    min-width: 11.3rem;
    width: 65%;
    color: ${({ isChecked }) => isChecked && theme.colors.plan_grey01};
  `,
};
