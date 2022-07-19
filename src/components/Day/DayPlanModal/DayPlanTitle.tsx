import React, { useState } from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface DayPlanTitleProps {
  handleChangeTitle: (newTitle: string) => void;
  title: string;
}

function DayPlanTitle(props: DayPlanTitleProps) {
  const { title, handleChangeTitle } = props;
  const [newTitle, setNewTitle] = useState(title);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      handleChangeTitle(newTitle);
      setNewTitle(e.target.value);
    }
  };

  return (
    <Styled.TitleInput
      placeholder="제목 및 시간 추가(12자 이내 입력)"
      onChange={handleChange}
      value={newTitle}
    />
  );
}

export default DayPlanTitle;

const Styled = {
  TitleInput: styled.input`
    width: 17.1rem;
    height: 1.8rem;
    border: none;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${theme.colors.letter_grey};
      font-size: 1.2rem;
      line-height: 1.8rem;
    }
  `,
};
