import React, { useState } from 'react';
import CheckBox from 'src/components/common/CheckBox';
import styled from 'styled-components';

function Day() {
  return (
    <Styled.Root>
      데이페이지입니다.
      <CheckBox id="dayCheck" />
    </Styled.Root>
  );
}

export default Day;

const Styled = {
  Root: styled.div``,
};
