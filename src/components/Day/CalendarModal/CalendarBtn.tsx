import CalendarIcon from 'public/assets/ic_calendar.svg';
import { useState } from 'react';
import styled from 'styled-components';

import CalendarModal from './CalendarModal';

function CalendarBtn() {
  const [isClicked, setIsClicked] = useState(false);
  const toggle = (value: boolean) => setIsClicked(value);

  return (
    <Styled.Root>
      <Styled.CalendarIcon onClick={() => toggle(true)} />
      {isClicked && <CalendarModal toggle={toggle} />}
    </Styled.Root>
  );
}

export default CalendarBtn;

const Styled = {
  Root: styled.div`
    position: relative;
    width: fit-content;
  `,
  CalendarIcon: styled(CalendarIcon)`
    cursor: pointer;
  `,
};
