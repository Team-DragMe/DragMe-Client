import SemiArrow from 'public/assets/icons/SemiArrow8.svg';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentModifyDayPlan } from 'src/states';
import { theme } from 'src/styles/theme';
import { dailyPlanFlag } from 'src/types';
import styled, { css } from 'styled-components';

import AddonBtn from '../AddonBtn';
import CheckBox from '../CheckBox';
import CollapseArrow from '../CollapseArrow';

type shapeType = 'rectangle' | 'triangle';
interface CommonDayPlanChipProps {
  //@TODO color code값 타입으로 한정하기
  color?: string;
  children?: string;
  shape?: shapeType;
  addon?: boolean;
  onAddonClick?: () => void;
  haveChild?: boolean;
  isOpened?: boolean;
  onArrowBtnClick?: () => void;
  isCompleted?: boolean;
  itemId?: string;
  flag: dailyPlanFlag;
  index: number;
  id?: string;
}

interface ColorChipStyleProps {
  color: string;
}

interface BoxStyleProps {
  shape: shapeType;
  flag: dailyPlanFlag;
  index: number;
}

interface ContentsStyleProps {
  isChecked: boolean;
}

const CommonDayPlanChip = forwardRef<HTMLElement, CommonDayPlanChipProps>(
  (
    {
      color = 'none',
      shape = 'rectangle',
      haveChild = false,
      addon = false,
      isOpened = false,
      onAddonClick,
      onArrowBtnClick,
      children,
      isCompleted = false,
      itemId = '',
      flag,
      index,
      ...props
    }: CommonDayPlanChipProps,
    ref,
  ) => {
    const [isChecked, setIsChecked] = useState(isCompleted);
    const inputValue = useRef<HTMLInputElement>(null);
    const [dayPlan, setDayPlan] = useState<string | undefined>(children);
    const [currentTargetPlan, setCurrentTargetPlan] = useRecoilState(currentModifyDayPlan);

    const handleChange = () => {
      setIsChecked((prev) => !prev);
      // @TODO React query optimistic update로 완료된 계획 post
    };

    const handleDbClick = () => {
      // recoil 상태 업데이트 이후 UI 렌더된 이후 focusing되어야 함
      setTimeout(() => {
        inputValue.current?.focus();
      }, 50);
      setCurrentTargetPlan(itemId);
    };

    const handleBlur = () => {
      setCurrentTargetPlan('');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // @TODO inputValue.current?.value 를 post
      console.log(inputValue.current?.value);
      setDayPlan(inputValue.current?.value);
      setCurrentTargetPlan(null);
      // @TODO 서버로 계획 생성 POST
    };

    return (
      <Styled.Container {...props} shape={shape} ref={ref} index={index} flag={flag}>
        {color !== 'none' && <Styled.ColorChip color={color} />}
        <Styled.Box shape={shape}>
          <CheckBox id="dayCheck" isChecked={isChecked} onChange={handleChange} />
          <Styled.ContentsWrapper onDoubleClick={handleDbClick}>
            <div>
              {/* 이쪽 Input이거나 콘텐츠이거나 분기처리 - 더블클릭 이벤트허면 Input나오도록 */}
              {currentTargetPlan !== itemId && dayPlan ? (
                <Styled.Contents isChecked={isChecked}>{children}</Styled.Contents>
              ) : (
                <Styled.Form onSubmit={handleSubmit}>
                  <Styled.Input type="text" ref={inputValue} onBlur={handleBlur} autoFocus />
                </Styled.Form>
              )}
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
  },
);

CommonDayPlanChip.displayName = 'CommonDayPlanChip';
export default CommonDayPlanChip;

const Styled = {
  Container: styled.section<BoxStyleProps>`
    display: flex;
    align-items: center;
    width: 100%;
    height: 3.2rem;
    position: relative;
    background: ${theme.category.cate_white};
    ${({ shape }) =>
      shape === 'triangle' &&
      css`
        width: 98%;
      `}
  `,
  ColorChip: styled.div<ColorChipStyleProps>`
    border-top: 1px solid ${theme.colors.plan_grey};
    border-bottom: 1px solid ${theme.colors.plan_grey};
    border-left: 1px solid ${theme.colors.plan_grey};
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
      /* overflow: hidden; */
    }
    & > svg {
      width: fit-content;
      height: fit-content;
    }
    ${({ shape }) =>
      shape === 'rectangle'
        ? css`
            border: 1px solid ${theme.colors.plan_grey};
            .semiArrowWrapper {
              display: none;
            }
          `
        : css`
            border-top: 1px solid ${theme.colors.plan_grey};
            border-bottom: 1px solid ${theme.colors.plan_grey};
            border-left: 1px solid ${theme.colors.plan_grey};
            /* background: url(/assets/icons/ArrowSection.svg); */
          `}
  `,
  ContentsWrapper: styled.div`
    display: flex;
    width: 17rem;
    justify-content: space-between;
    align-items: center;
  `,
  Form: styled.form`
    min-width: 11.3rem;
    width: 65%;
    appearance: none;
    outline: none;
    margin-left: 0.8rem;
    /* font-size: 1.2rem; */
  `,
  Input: styled.input`
    width: 100%;
    appearance: none;
    outline: none;
    border: none;
    padding: 0px 0px;
    /* font-size: 1.2rem; */
    font: inherit;
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
    border: 1px solid ${theme.colors.plan_grey};
    padding-left: 0.8rem;
    width: 100%;
    height: 100%;
  `,
  TriangleBox: styled.div`
    display: flex;
    align-items: center;
    border-top: 1px solid ${theme.colors.plan_grey};
    border-bottom: 1px solid ${theme.colors.plan_grey};
    border-left: 1px solid ${theme.colors.plan_grey};
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
      background: ${theme.colors.plan_grey};
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
    color: ${({ isChecked }) => isChecked && theme.colors.plan_grey};
  `,
};
