import Image from 'next/image';
import PencilIcon from 'public/assets/ic_pencil.svg';
import TestImage from 'public/assets/Logo.png';
import { useState } from 'react';
import { GOAL_PLACEHOLDER } from 'src/constants/mypage';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function MyInfoSection() {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <Styled.Root>
      <Styled.ProfileImageWrapper>
        <Image src={TestImage} alt="프로필 이미지" />
      </Styled.ProfileImageWrapper>
      <Styled.ProfileInfoWrapper>
        <Styled.NameWrapper>
          <p>전희선</p>
          <Styled.PencilBtn />
        </Styled.NameWrapper>
        <Styled.GoalWrapper>
          <input placeholder={GOAL_PLACEHOLDER} maxLength={35} disabled={isDisabled} />
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
    font-weight: 700;
    font-size: 2rem;
    line-height: 150%;
    gap: 1.3rem;
    margin-left: 1.3rem;
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
};
