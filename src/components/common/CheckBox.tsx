import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id: string;
}

interface LabelProps {
  isChecked: boolean;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ id, ...props }: CheckBoxProps, ref) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = () => {
      setIsChecked((prev) => !prev);
    };
    return (
      <>
        <Styled.Input {...props} type="checkbox" id={id} ref={ref} onChange={handleChange} />
        <Styled.Label htmlFor={id} isChecked={isChecked} />
      </>
    );
  },
);

CheckBox.displayName = 'CheckBox';

export default CheckBox;
const Styled = {
  Input: styled.input`
    display: none;
    & + label {
      display: inline-block;
      position: relative;
      border: 1px solid #d0d4da;
      border-radius: 0.1rem;
      width: 1.2rem;
      height: 1.2rem;
    }
  `,
  Label: styled.label<LabelProps>`
    &::after {
      ${({ isChecked }) =>
        isChecked &&
        css`
          position: absolute;
          top: 0.1rem;
          content: url('/assets/icons/checkIcon.svg');
        `}
    }
  `,
};
