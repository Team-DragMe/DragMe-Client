import {
  CalendarQueryType,
  DateQueryType,
  getEmojiQueryType,
  InformationRequestType,
  ScheduleAndDate,
  ScheduleAndIsCompleted,
  ScheduleId,
  ScheduleTimePostType,
} from 'src/types/day';

import { client } from './api';

export const getCalendarData = async ({ month }: CalendarQueryType) => {
  const { data } = await client.get(`/schedule/calendar?month=${month}`);

  return { data };
};

export const getTodayNoteData = async ({ date }: DateQueryType) => {
  const { data } = await client.get(`/information/days?date=${date}`);

  return { data };
};

export const getTodayScheduleData = async ({ date }: DateQueryType) => {
  const { data } = await client.get(`/schedule/days?date=${date}`);
  console.log('>>>getTodayScheduleData', data);
  return { data };
};

export const getDelayedScheduleData = async () => {
  const { data } = await client.get('/schedule/delay');
  console.log('>>>getDelayedScheduleData', data);
  return { data };
};

export const getRoutineScheduleData = async () => {
  const { data } = await client.get('/schedule/routine');
  console.log('>>>getDelayedScheduleData', data);
  return { data };
};

export const getSubScheduleData = async ({ scheduleId }: ScheduleId) => {
  const { data } = await client.get(`/schedule/subschedule?scheduleId=${scheduleId}`);
  return { data };
};

export const postInformationData = async (data: InformationRequestType) => {
  const post = await client.post('/information', { ...data });

  return post;
};

export const postScheduleTime = async ({ scheduleId, ...data }: ScheduleTimePostType) => {
  const post = await client.post(`/schedule/time?scheduleId=${scheduleId}`, { ...data });

  return post;
};

// export const deleteScheduleTime = async ({ scheduleId, ...data }: ScheduleTimePostType) => {
//   const post = await client.delete(`/schedule/time/scheduleId=${scheduleId}`, { ...data });

//   return post;
// };

// 계획 블록 완료
export const patchCompleteScheduleData = async ({
  scheduleId,
  isCompleted,
}: ScheduleAndIsCompleted) => {
  console.log('==========================들어온 postId', scheduleId, isCompleted);
  const post = await client.patch(
    `/schedule/complete?scheduleId=${scheduleId}&isCompleted=${isCompleted}`,
  );
  console.log('==========================post', post);
  return post;
};

export const getEmojiListData = async ({ startDate, endDate }: getEmojiQueryType) => {
  const { data } = await client.get(`/information/emoji?startDate=${startDate}&endDate=${endDate}`);

  return { data };
};

export const patchDayToRescheduleSchedules = async ({ scheduleId }: ScheduleId) => {
  console.log(
    'patchDayToRescheduleSchedulespatchDayToRescheduleSchedules*********scheduleId',
    scheduleId,
  );
  const post = await client.patch(`/schedule/day-reschedule?scheduleId=${scheduleId}`);
  console.log('*********************post', post);
  return post;
};

export const patchDayToRoutineSchedules = async ({ scheduleId }: ScheduleId) => {
  const post = await client.post(`/schedule/day-routine?scheduleId=${scheduleId}`);
  console.log('>>day to routine', post);
  return post;
};

export const patchRoutineToDaySchedules = async ({ scheduleId, date }: ScheduleId) => {
  const post = await client.post(`/schedule/routine-day?scheduleId=${scheduleId}`, {
    date,
  });
  return post;
};

export const patchRescheduleToDaySchedules = async ({ scheduleId, date }: ScheduleAndDate) => {
  const post = await client.patch(`/schedule/reschedule-day?scheduleId=${scheduleId}`, {
    date,
  });
  return post;
};

// 계획 블록 순서 변경
export const patchOrderSchedules = async ({ scheduleId, scheduleList }) => {
  const post = await client.patch(`/schedule/order?scheduleId=${scheduleId}`, {
    objectIds: scheduleList,
  });
  return post;
};

// 계획 블록 생성
export const postScheduleBlock = async ({ date, title, categoryColorCode, isRoutine }) => {
  const post = await client.post('/schedule', {
    date,
    title,
    categoryColorCode,
    isRoutine,
  });
  return post;
};
// isRoutine == true/ false

// 계획 블록 이름 수정
export const patchScheduleBlock = async ({ scheduleId, title }) => {
  const patch = await client.patch(`/schedule/title?scheduleId=${scheduleId}`, {
    title,
    scheduleId,
  });
};

// 자주
