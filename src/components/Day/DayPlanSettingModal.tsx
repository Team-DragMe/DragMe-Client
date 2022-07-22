import Image from 'next/image';
import RescheduleIC from 'public/assets/ic_Reschedule.svg';
import icon_trashCan from 'public/assets/icon_trashCan.png';
import React from 'react';
import { useRecoilState } from 'recoil';
import useDeleteSchedule from 'src/hooks/query/useDeleteSchedule';
import { modalClickXY } from 'src/states';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface DayPlanSettingModalProps {
  top: number;
  left: number;
}
function DayPlanSettingModal({ top, left }: DayPlanSettingModalProps) {
  const colors = theme.category;
  const [clickInfo, setClickInfo] = useRecoilState(modalClickXY);
  const { mutate: deleteSchedule } = useDeleteSchedule();

  const colorCode = [
    { id: 0, color: `${colors.cate_mint}` },
    { id: 1, color: `${colors.cate_blue}` },
    { id: 2, color: `${colors.cate_pink}` },
    { id: 3, color: `${colors.cate_purple}` },
    { id: 4, color: `${colors.cate_white}` },
    { id: 5, color: `${colors.cate_green}` },
    { id: 6, color: `${colors.cate_corarl}` },
    { id: 7, color: `${colors.cate_yellow}` },
  ];
  const colorCodes = colorCode.map((code) => (
    <Styled.ColorPicker onClick={() => console.log(code.color)} key={code.id} color={code.color} />
  ));

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLElement) {
      deleteSchedule({ scheduleId: clickInfo.scheduleId });
      setClickInfo({ posX: 0, posY: 0, scheduleId: '' });
    }
  };

  return (
    <Styled.Root top={top} left={left}>
      <Styled.ColorPickerSection>
        <Styled.ColorContainer>{colorCodes}</Styled.ColorContainer>
      </Styled.ColorPickerSection>
      <Styled.ButtonSection>
        <Styled.MenuBox>
          <Styled.ImgWrapper>
            <RescheduleIC />
          </Styled.ImgWrapper>
          <Styled.ButtonLetter>우회하기</Styled.ButtonLetter>
        </Styled.MenuBox>
        <Styled.MenuBox onClick={handleDelete}>
          <Styled.ImgWrapper>
            <Image src={icon_trashCan} alt="로고이미지" width={'20'} height={'20'} />
          </Styled.ImgWrapper>
          <Styled.ButtonLetter>삭제하기</Styled.ButtonLetter>
        </Styled.MenuBox>
      </Styled.ButtonSection>
    </Styled.Root>
  );
}

export default DayPlanSettingModal;

const Styled = {
  Root: styled.div<{ top: number; left: number }>`
    position: absolute;
    z-index: 6;
    top: ${({ top }) => top + 'px'};
    left: ${({ left }) => left + 'px'};
    width: 10.2rem;
    height: 12rem;
    background-color: ${theme.category.cate_white};
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 20px -5px ${theme.colors.letter_grey};
  `,
  ColorPickerSection: styled.div`
    width: 100%;
    height: 50%;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  ButtonSection: styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    font-size: 1.2rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  MenuBox: styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    border-top: 1px dashed ${theme.colors.letter_grey};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  ImgWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
  `,
  ButtonLetter: styled.div`
    margin-right: 1rem;
    margin-left: 0.7rem;
    padding-top: 0.2rem;
  `,
  ColorContainer: styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 7.4rem;
    height: 3.6rem;
  `,
  ColorPicker: styled.div`
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 0.1rem;
    margin-bottom: 0.8rem;
    border-radius: 1rem;
    background-color: ${({ color }) => color};
    border: ${({ color }) => color === '#FFFFFF' && '0.5px solid #B6BEC9'};
    cursor: pointer;
  `,
};
