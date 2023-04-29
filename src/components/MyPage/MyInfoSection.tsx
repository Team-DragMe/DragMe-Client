import Image from 'next/image';
import PencilIcon from 'public/assets/ic_pencil.svg';
import TestImage from 'public/assets/Logo.png';
import { useEffect, useRef, useState } from 'react';
import { GOAL_PLACEHOLDER } from 'src/constants/mypage';
import { mypageInfo } from 'src/mock-data/mypage';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function MyInfoSection() {
  const [isDisabled, setIsDisabled] = useState(true);
  const toggle = () => setIsDisabled(!isDisabled);
  const nameRef = useRef<HTMLSpanElement>(null);
  const goalRef = useRef<HTMLInputElement>(null);

  const handleCheckClick = () => {
    toggle();
    //서버 전송
    // console.log(nameRef.current?.innerText);
    // console.log(goalRef.current?.value);
  };

  useEffect(() => {
    if (goalRef.current !== null) {
      goalRef.current.value = mypageInfo.goal;
    }
  }, []);

  useEffect(() => {
    if (goalRef.current !== null) {
      goalRef.current.focus();
    }
  }, [isDisabled]);

  return (
    <Styled.Root>
      <Styled.ProfileImageWrapper>
        <Image src={TestImage} alt="프로필 이미지" />
      </Styled.ProfileImageWrapper>
      <Styled.ProfileInfoWrapper>
        <Styled.NameWrapper>
          <Styled.Input ref={nameRef} contentEditable={!isDisabled} suppressContentEditableWarning>
            {mypageInfo.name}
          </Styled.Input>
          {isDisabled ? (
            <Styled.PencilBtn onClick={toggle} />
          ) : (
            <Styled.CheckBtn onClick={handleCheckClick}>확인</Styled.CheckBtn>
          )}
        </Styled.NameWrapper>
        <Styled.GoalWrapper>
          <input
            ref={goalRef}
            placeholder={GOAL_PLACEHOLDER}
            maxLength={35}
            disabled={isDisabled}
          />
        </Styled.GoalWrapper>
      </Styled.ProfileInfoWrapper>
    </Styled.Root>
  );
}

export default MyInfoSection;

const Styled = {
  Root: styled.section`
    display: flex;
    padding: 0 2rem;
    padding-bottom: 3.6rem;
    border-bottom: 1px solid ${theme.colors.border_grey};
  `,
  ProfileImageWrapper: styled.div`
    display: flex;
    width: 9rem;
    height: 9rem;
    margin-right: 5.3rem;

    & img {
      border-radius: 50%;
    }
  `,
  ProfileInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  NameWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 1.3rem;
    margin-left: 1.3rem;
  `,

  Input: styled.span`
    outline: 0;
    border: 0;
    padding: 0;
    font-weight: 700;
    font-size: 2rem;
    line-height: 150%;
    color: black;
  `,

  GoalWrapper: styled.div`
    display: flex;
    background-color: ${theme.colors.scroll_grey};
    width: 66rem;
    height: 4.6rem;
    margin-top: 1.3rem;

    & > input {
      width: 100%;
      outline: 0;
      border: 0;
      padding: 0 1.3rem;
      background-color: ${theme.colors.scroll_grey};
      font-size: 1.8rem;
      font-weight: 500;
      color: ${theme.colors.info_leter_grey};
    }
  `,
  PencilBtn: styled(PencilIcon)`
    cursor: pointer;
  `,
  CheckBtn: styled.button`
    border: 0;
    outline: 0;
    background-color: ${theme.colors.main_color};
    width: 4.4rem;
    height: 2rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: #eeeeee;
    border-radius: 2px;
  `,
};
