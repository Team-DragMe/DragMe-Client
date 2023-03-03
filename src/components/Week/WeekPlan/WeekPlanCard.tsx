import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import DayPlanList from 'src/components/common/DayPlanList/DayPlanList';
import DayPlanSettingModal from 'src/components/Day/DayPlanSettingModal';
import ForwardEmojiPicker from 'src/components/Day/TodayPlan/EmojiPicker';
import { FLAG } from 'src/constants';
// import useGetTodaySchedule from 'src/hooks/query/useGetTodaySchedules';
// import useGetWeeklySchedules from 'src/hooks/query/useGetWeeklySchedules';
import { dailyPlanList, dayInfo, modalClickXY, weekInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import { Schedule } from 'src/types';
import styled from 'styled-components';

interface WeekPlanCardProps {
  dayInfo: {
    date: string;
    type: string;
    value: string;
  };
  day: string;
  schedulesData?: Schedule[];
  weekIndex: number;
  dateForWeek?: string;
}
function WeekPlanCard(props: WeekPlanCardProps) {
  const { dayInfo: dayInfoProps, day, schedulesData, weekIndex, dateForWeek } = props;
  const [click, setClick] = useState<boolean>(false);
  const [isEnterBtn, setIsEnterBtn] = useState(false);

  const dailyPlanData = useSetRecoilState(dailyPlanList);
  const date = useRecoilValue(dayInfo).slice(0, 10);
  // const { data } = useGetTodaySchedule({ date });
  const pageXY = useRecoilValue(modalClickXY);
  // const { data: todayDataForWeek } = useGetTodaySchedule({ date: dateForWeek as string });

  // useEffect(() => {
  //   data && dailyPlanData(data);
  // }, [data, dailyPlanData]);

  const useOutsideAlert = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (event.target instanceof HTMLElement) {
          if (ref.current && !ref.current.contains(event.target)) {
            setClick(false);
          }
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  const handleClick = (value: boolean) => {
    setClick(value);
  };
  const refPicker = useRef<HTMLDivElement>(null);
  useOutsideAlert(refPicker);

  const parsedMonth = dayInfoProps?.date.slice(5, 7);
  const parsedDate = dayInfoProps?.date.slice(8, 10);
  const dateInfo = parsedMonth + '.' + parsedDate;
  const weekRecoil = useRecoilValue(weekInfo);

  useEffect(() => {
    console.log('>>schedulesData', schedulesData);
  }, [schedulesData]);

  return (
    <Styled.Root>
      <Styled.Header>
        <Styled.DayWrapper>
          <span>{day}</span>
          <ForwardEmojiPicker
            ref={refPicker}
            click={click}
            setClick={handleClick}
            emoji={dayInfoProps?.value}
            date={dayInfoProps?.date}
          />
        </Styled.DayWrapper>
        <p>{dateInfo}</p>
      </Styled.Header>
      {/* <DayPlanList
        // maxHeight={isEnterBtn ? '23rem' : '26rem'}
        maxHeight="22rem"
        schedulesData={todayDataForWeek as any}
        flag="daily"
        weekIndex={weekIndex}
        isEnterBtn={isEnterBtn}
        setIsEnterBtn={setIsEnterBtn}
        isWeek
        currentDay={weekRecoil[weekIndex]}
      /> */}
      {pageXY.posX !== 0 && pageXY.posY !== 0 && (
        <DayPlanSettingModal top={pageXY.posY} left={pageXY.posX} />
      )}
    </Styled.Root>
  );
}

export default WeekPlanCard;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    width: 25.9rem;
    height: 36rem;
    box-shadow: 0px 0px 6px #d3dce7;
    border-radius: 0.4rem;
    padding: 0 2rem;
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 0;
    border-bottom: 0.12rem solid ${theme.colors.letter_grey};
    & > p {
      color: ${theme.colors.letter_black};
      font-weight: 700;
      font-size: 1.2rem;
      line-height: 150%;
    }
  `,
  DayWrapper: styled.div`
    display: flex;
    align-items: center;
    & > span {
      color: ${theme.colors.letter_black};
      font-weight: 900;
      font-size: 2.4rem;
      line-height: 150%;
    }
  `,
};
