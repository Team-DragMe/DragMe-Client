/* eslint-disable jsx-a11y/no-autofocus */
import SemiArrow from 'public/assets/icons/SemiArrow8.svg';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePatchCompletedSchedules from 'src/hooks/query/usePatchCompletedSchedules';
import usePatchScheduleBlock from 'src/hooks/query/usePatchScheduleBlock';
import usePostScheduleBlock from 'src/hooks/query/usePostScheduleBlock';
import {
  checkedSchedules,
  currentModifyDayPlan,
  dayInfo,
  openedSchedules,
  weeklyPostData,
} from 'src/states';
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
  index?: number;
  id?: string;
  [key: string]: any;
}

interface ColorChipStyleProps {
  color: string;
}

interface BoxStyleProps {
  shape?: shapeType;
  flag?: dailyPlanFlag;
  index?: number;
}

interface ContentsStyleProps {
  isChecked: boolean;
  haveChild?: boolean;
  [key: string]: any;
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
    const [inputValueState, setInputValueState] = useState<string>('');
    const [currentTargetPlan, setCurrentTargetPlan] = useRecoilState(currentModifyDayPlan);
    const [openItem, setOpenItem] = useRecoilState(openedSchedules);
    const [checkItem, setCheckItem] = useRecoilState(checkedSchedules);
    const checkBoxRef = useRef(null);
    const today = useRecoilValue(dayInfo);
    const currentTodayDate = today.slice(0, 10);
    const [weeklyPostState, setWeeklyPostState] = useRecoilState(weeklyPostData);

    const { mutate: mutateCompletedSchedules } = usePatchCompletedSchedules({
      scheduleId: itemId,
      flag,
      date: props?.item?.date,
      isCompleted: !isChecked,
    });
    const { mutate: postScheduleNameBlock } = usePostScheduleBlock({
      date: weeklyPostState ? weeklyPostState : currentTodayDate,
      categoryColorCode: '#FFFFFF',
      flag: flag ? flag : 'daily',
      title: inputValue.current?.value,
    });
    const { mutate: patchScheduleNameBlock } = usePatchScheduleBlock({
      date: props?.item?.date,
      flag: flag ? flag : 'daily',
      title: inputValue.current?.value,
      scheduleId: itemId,
    });

    const handleChange = () => {
      setIsChecked((prev) => !prev);
      mutateCompletedSchedules();

      if (flag !== 'daily') {
        return;
      }
      /* 타임 블록 드래그에서 체크 여부를 추적하기 위해 리코일에 저장 - 삭제시 사라지도록 */
      // 체크 안 된 경우
      if (isChecked) {
        const copyItem = new Set([...Array.from(checkItem)]);
        copyItem.delete(itemId);
        setCheckItem(copyItem);
        //체크된 경우
      } else {
        const copyItem = new Set([...Array.from(checkItem)]);
        copyItem.add(itemId);
        setCheckItem(copyItem);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValueState(e.target.value);
    };

    const handleDbClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      // recoil 상태 업데이트 이후 UI 렌더된 이후 focusing되어야 함
      setTimeout(() => {
        inputValue.current?.focus();
      }, 50);
      // 배타적이어야 하므로 현재 선택된 애를 리코일에 저장
      setCurrentTargetPlan({ itemId, flag: props?.item?.flag, date: props?.item?.date });
    };

    const handleBlur = () => {
      setCurrentTargetPlan({ itemId: '', flag: '', date: '' });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (currentTargetPlan?.itemId === '') {
        postScheduleNameBlock();
      } else {
        patchScheduleNameBlock();
      }
      setCurrentTargetPlan({ itemId: '', flag: '', date: '' });
      setWeeklyPostState(null);
      if (!flag || weeklyPostState) {
        setTimeout(() => {
          location.reload();
        }, 50);
      }
    };

    useEffect(() => {
      // Open된 상태 리코일에 저장
      if (isOpened) {
        // set 자료형에 대한 copy 필요
        const coptItem = new Set([...Array.from(openItem)]);
        coptItem.add(itemId);
        setOpenItem(coptItem);
      } else {
        const coptItem = new Set([...Array.from(openItem)]);
        coptItem.delete(itemId);
        setOpenItem(coptItem);
      }
    }, [isOpened]);

    useEffect(() => {
      console.log('>>inputValue.current?.value', inputValue.current?.value);
    }, [inputValue.current?.value]);
    return (
      <Styled.Container {...props} shape={shape} ref={ref} index={index} flag={flag} id={itemId}>
        {color !== 'none' && <Styled.ColorChip color={color} />}
        <Styled.Box shape={shape}>
          <CheckBox id={itemId} isChecked={isChecked} onChange={handleChange} ref={checkBoxRef} />
          <Styled.ContentsWrapper onDoubleClick={handleDbClick} id={itemId}>
            <div>
              {color === 'none' ? (
                <Styled.Contents
                  isChecked={isChecked}
                  haveChild={!!(props?.item?.subschedules?.length > 0)}
                >
                  {children}
                </Styled.Contents>
              ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                  {currentTargetPlan.itemId !== itemId && dayPlan ? (
                    <Styled.Contents isChecked={isChecked} haveChild={haveChild}>
                      {children}
                    </Styled.Contents>
                  ) : (
                    <Styled.Form onSubmit={handleSubmit} haveChild={haveChild}>
                      <Styled.Input
                        type="text"
                        ref={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        autoFocus
                      />
                    </Styled.Form>
                  )}
                </>
              )}
            </div>
            <Styled.BtnWrapper>
              {(addon || haveChild) && (
                <AddonBtn
                  onClick={onAddonClick}
                  scheduleId={itemId}
                  flag={flag || 'daily'}
                  date={props.item.date}
                />
              )}
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
  Form: styled.form<ContentsStyleProps>`
    min-width: 11rem;
    /* width: 65%; */
    appearance: none;
    outline: none;
    margin-left: 0.8rem;
    /* font-size: 1.2rem; */
    ${({ haveChild }) => (haveChild ? 'width: 65%;' : 'min-width: 14rem;')}
  `,
  Input: styled.input`
    width: 100%;
    appearance: none;
    outline: none;
    border: none;
    padding: 0px 0px;
    /* font-size: 1.2rem; */
    font: inherit;
    /* width: 70px;
    padding: 0 5px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    /* max-width: 12rem; */
    max-width: 11.3rem;
    /* width: 65%; */
    ${({ haveChild }) => (haveChild ? 'max-width: 11rem' : 'max-width: 13rem;')}
    color: ${({ isChecked }) => isChecked && theme.colors.plan_grey};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  `,
};
