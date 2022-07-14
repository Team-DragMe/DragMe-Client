import React, { forwardRef, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string;
  id: string;
  isChecked: boolean;
  onChange: () => void;
}

interface LabelProps {
  isChecked: boolean;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ onChange, isChecked, id, ...props }: CheckBoxProps, ref) => (
    <Styled.Root onClick={onChange}>
      <Styled.Input {...props} type="checkbox" id={id} ref={ref} onChange={onChange} />
      <Styled.Label htmlFor={id} isChecked={isChecked} />
    </Styled.Root>
  ),
);

CheckBox.displayName = 'CheckBox';

export default CheckBox;
const Styled = {
  Root: styled.button`
    /* remove default styles */
    outline: inherit;
    border: none;
    background: none;
    padding: 0;
    color: inherit;
    font: inherit;
  `,
  Input: styled.input`
    display: none;
    & + label {
      display: inline-block;
      position: relative;
      border: 1px solid #d0d4da;
      /* border-radius: 0.1rem; */
      width: 1.2rem;
      height: 1.2rem;
    }
  `,
  Label: styled.label<LabelProps>`
    cursor: pointer;
    ${({ isChecked }) =>
      isChecked &&
      css`
        position: absolute;
        top: 0.1rem;
        content: url('/assets/icons/checkIconActive.svg');
        transition: all 0.3s ease;
      `}
  `,
};
