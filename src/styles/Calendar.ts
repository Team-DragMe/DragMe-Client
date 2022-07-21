import styled from 'styled-components';

import { theme } from './theme';

export const CalendarStyle = {
  Wrapper: styled.div`
    width: 270px;
    height: 380px;
    background: ${theme.category.cate_white};
    box-shadow: 0px 0px 10px #d4d7e3;
    border-radius: 0.2rem;
    padding: 2.6rem 0.8rem;
    padding-bottom: 0;
    position: absolute;
    right: 0;
    margin-top: 1.1rem;
    z-index: 100;

    .react-calendar__navigation {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 7.7rem;
      margin-bottom: 0.8rem;
    }
    .react-calendar__navigation button {
      :disabled {
        background-color: ${theme.category.cate_white};
        border: 0;
      }
    }
    .react-calendar__navigation__label {
      cursor: default;
      padding: 0;
    }
    .react-calendar__navigation__arrow {
      padding: 0;
      border: 0;
      margin-top: 1.8rem;
      background-color: ${theme.category.cate_white};
      cursor: pointer;
    }
    .react-calendar__month-view__weekdays {
      border-top: 0.8px solid ${theme.colors.plan_grey};
      border-bottom: 0.8px solid ${theme.colors.plan_grey};
      padding: 0.4rem 0.5rem;
    }
    .react-calendar__month-view__weekdays__weekday {
      text-align: center;
      font-size: 1.2rem;
    }
    abbr[title] {
      text-decoration: none;
      color: ${theme.colors.letter_black};
      line-height: 150%;
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto,
        'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
        sans-serif;
    }
    .react-calendar__tile {
      position: relative;
      font-size: 1.3rem;
      margin: 0;
      border: 0.3rem solid ${theme.category.cate_white};
      border-top-width: 0.45rem;
      border-bottom-width: 0.45rem;
      border-radius: 50%;
      background-color: white;
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto,
        'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
        sans-serif;
      padding: 0.65rem 0rem;
    }
    .react-calendar__month-view__days {
      margin: 1.5rem 0.5rem 0 0.5rem;
    }
    .react-calendar__month-view__days__day--weekend {
      color: ${theme.colors.plan_grey};
    }
    .react-calendar__tile--active {
      background-color: ${theme.colors.calender_future};
    }
    .react-calendar__tile.today-date {
      background-color: ${theme.colors.main_color};
      color: ${theme.category.cate_white};
    }
    .dot-wrapper {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 30%);
    }
    .react-calendar__tile .dot {
      display: flex;
      background-color: ${theme.colors.main_color};
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
    }
  `,
};
