import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import CloseIC from 'public/assets/ic_close.svg';
import LeftArrow from 'public/assets/ic_leftArrow.svg';
import RightArrow from 'public/assets/ic_rightArrow.svg';
import React, { useEffect, useState } from 'react';
import type { CalendarProps } from 'react-calendar';
import { useSetRecoilState } from 'recoil';
import useCalendarData from 'src/hooks/query/useCalendarData';
import { dayCount, dayInfo } from 'src/states';
import { CalendarStyle } from 'src/styles/Calendar';
import { theme } from 'src/styles/theme';
import { parseToValidMonth } from 'src/utils/dateUtil';
import { DayStorage, getTodayDate } from 'src/utils/getDate';
import styled from 'styled-components';

const Calendar = dynamic(async () => import('react-calendar'), {
  ssr: false,
});

interface dayObjectType {
  [key: number]: string;
}

interface CalendarModalProps {
  toggle: (value: boolean) => void;
}

const parseToValidQuery = (query: string | string[] | undefined) => {
  if (!query) return new Date();
  if (Array.isArray(query)) return new Date();

  return new Date(query);
};

function CalendarModal({ toggle }: CalendarModalProps) {
  const [value, onChange] = useState(new Date());
  const setDayDate = useSetRecoilState(dayInfo);
  const setDayChange = useSetRecoilState(dayCount);
  const [currentMonth, setCurrentMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const todayDate = new Date().toDateString();
  const router = useRouter();
  const { date } = router.query;
  const parsedDate = parseToValidQuery(date?.slice(0, 10));
  // const { data } = useCalendarData({ currentMonth });
  const data = [1, 2, 3];

  const dayObject: dayObjectType = {
    0: 'S',
    1: 'M',
    2: 'T',
    3: 'W',
    4: 'T',
    5: 'F',
    6: 'S',
  };

  const onClickDay = (value: Date) => {
    const today = new Date().getTime();
    const clickDay = value.getTime();
    const gap = clickDay - today;
    const dday = Math.floor(gap / (1000 * 60 * 60 * 24)) + 1;
    setDayChange(dday);
    setDayDate(DayStorage(getTodayDate(0).slice(0, 10), dday));
  };

  const onChangeMonth = (isPrev: boolean) => {
    const payload = isPrev ? -1 : 1;
    const afterChangeMonth = parseToValidMonth(currentMonth.year, currentMonth.month + payload);

    setCurrentMonth(afterChangeMonth);
  };

  const calendarProps: CalendarProps = {
    view: 'month',
    calendarType: 'US',
    locale: 'en',
    prev2Label: null,
    next2Label: null,
    prevLabel: <LeftArrow onClick={() => onChangeMonth(true)} />,
    nextLabel: <RightArrow onClick={() => onChangeMonth(false)} />,
    navigationAriaLabel: undefined,
    showNeighboringMonth: false,
    minDetail: 'month',
  };

  useEffect(() => {
    onChange(parsedDate);
    setCurrentMonth({ year: parsedDate.getFullYear(), month: parsedDate.getMonth() + 1 });
  }, [router.query]);

  return (
    <CalendarStyle.Wrapper>
      <Calendar
        onChange={onChange}
        value={value}
        {...calendarProps}
        navigationAriaLabel={''}
        navigationLabel={() => (
          <Styled.MonthYear>
            <p>{currentMonth.year}</p>
            <span>{currentMonth.month > 9 ? currentMonth.month : `0${currentMonth.month}`}</span>
          </Styled.MonthYear>
        )}
        formatShortWeekday={(locale, date) => dayObject[date.getDay()]}
        tileClassName={({ date, view }) =>
          view === 'month' && date.toDateString() === todayDate ? 'today-date' : null
        }
        tileContent={({ date }) => {
          const html = [];
          if (data.includes(date.getDate())) {
            html.push(<div className="dot" />);
          }
          return <div className="dot-wrapper">{html}</div>;
        }}
        onClickDay={onClickDay}
      />
      <Styled.CloseIcon onClick={() => toggle(false)} />
    </CalendarStyle.Wrapper>
  );
}

export default CalendarModal;

const Styled = {
  MonthYear: styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    color: ${theme.colors.letter_black};
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto,
      'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
      sans-serif;

    & > p {
      font-size: 1.2rem;
      font-weight: 500;
    }
    & > span {
      font-size: 4rem;
      font-weight: 800;
    }
  `,
  CloseIcon: styled(CloseIC)`
    position: absolute;
    top: 1.7rem;
    right: 1.8rem;
    cursor: pointer;
  `,
};
