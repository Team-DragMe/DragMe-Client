![image](https://user-images.githubusercontent.com/65010481/180456090-cf2a537e-56cd-4100-b6a0-d7c85ec05c13.png)

## 📆 DRAG.ME

---

 계획표를 좀 더 쉽게 이용하고, 시간을 효율적으로 사용할 수는 없을까?
 **마우스 드래그**로 시작하는 **일일 성취관리 계획표 DRAG.ME**

> 2022.07.04 ~ 2022.07.23 - SOPT 30th APP-JAM
> 

## 🏃🏻‍♂️ TEAM

---

| 김남준 | 전희선 | 박나희 | 최유림 |
| --- | --- | --- | --- |
| @NamjunKim12 | @huiseon37 | @nahee-park | @choiyoorim |

## 🛠️ 사용 기술 스택

---

<p align=“center”>
  <img src="https://img.shields.io/badge/-react-58c3ff?labelColor=white&logo=React">
  <img src="https://img.shields.io/badge/-Typescript-3178C6?labelColor=white&logo=Typescript">
  <img src="https://img.shields.io/badge/-Next.js-000000?labelColor=white&logo=Next.js&logoColor=000000">
  <img src="https://img.shields.io/badge/-React Query-FF4154?labelColor=white&logo=React Query&logoColor=FF4154">
</p>


## 📕 사용 라이브러리
주요 라이브러리 
- react-calendar
- emoji-picker-react
- react-dnd
- react-lottie-player

---

```json
  "dependencies": {
    "@types/react-calendar": "^3.5.1",
    "@types/styled-components": "^5.1.25",
    "axios": "^0.27.2",
    "babel-plugin-inline-react-svg": "^2.0.1",
    "emoji-picker-react": "^3.5.1",
    "immutability-helper": "^3.1.1",
    "next": "12.2.1",
    "react": "18.2.0",
    "react-calendar": "^3.7.0",
    "react-dnd": "^16.0.1",
    "react-dnd-html5-backend": "^16.0.1",
    "react-dom": "18.2.0",
    "react-lottie-player": "^1.4.3",
    "react-merge-refs": "^2.0.1",
    "react-query": "^3.39.1",
    "recoil": "^0.7.4",
    "styled-components": "^5.3.5",
    "styled-reset": "^4.4.2"
  },
  "devDependencies": {
    "@stylelint/postcss-css-in-js": "^0.38.0",
    "@types/node": "18.0.3",
    "@types/react": "18.0.15",
    "@types/react-dom": "18.0.6",
    "@types/uuid": "^8.3.4",
    "@typescript-eslint/eslint-plugin": "^5.30.5",
    "@typescript-eslint/parser": "^5.30.5",
    "babel-plugin-module-resolver": "^4.1.0",
    "eslint": "^7.11.0",
    "eslint-config-next": "12.2.1",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-jsx-a11y": "^6.6.0",
    "eslint-plugin-prettier": "^3.4.0",
    "eslint-plugin-react": "^7.30.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-simple-import-sort": "^7.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^13.0.3",
    "postcss-html": "^1.5.0",
    "postcss-syntax": "^0.36.2",
    "prettier": "^2.7.1",
    "stylelint": "^14.9.1",
    "stylelint-config-concentric-order": "^5.0.0",
    "stylelint-config-prettier": "^9.0.3",
    "stylelint-config-styled-components": "^0.1.1",
    "typescript": "4.7.4",
    "uuid": "^8.3.2"
  },
```

## 📃 프로젝트 폴더 구조

---

```
src
├── components
│   ├── Day
│   │   ├── DayInfoSection
│   │   │   ├── DayChange.tsx
│   │   │   └── DayInfo.tsx
│   │   ├── DayPlanModal
│   │   │   ├── ColorListModal.tsx
│   │   │   ├── ColorPicker.tsx
│   │   │   ├── DayPlanTitle.tsx
│   │   │   ├── SubPlanBox.tsx
│   │   │   ├── SubPlanTitle.tsx
│   │   │   ├── SubPlanTitleButton.tsx
│   │   │   └── index.tsx
│   │   ├── DayPlanSettingModal.tsx
│   │   ├── MainDayPlanList.tsx
│   │   ├── Modal
│   │   │   ├── CalendarBtn.tsx
│   │   │   └── CalendarModal.tsx
│   │   ├── Reschedule.tsx
│   │   ├── TimeDragSection
│   │   │   ├── TimeBlock.tsx
│   │   │   ├── TimeBlockSection.tsx
│   │   │   ├── TimeBlocks.tsx
│   │   │   └── TimeLine.tsx
│   │   ├── TodayNote
│   │   │   ├── TodayNote.tsx
│   │   │   └── TodayNoteSection.tsx
│   │   └── TodayPlan
│   │       ├── EmojiPicker.tsx
│   │       ├── TodayPlanInput.tsx
│   │       └── index.tsx
│   ├── OnboardingPage
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Intro.tsx
│   │   ├── IntroduceFirst.tsx
│   │   ├── IntroduceFourth.tsx
│   │   ├── IntroduceSecond.tsx
│   │   ├── IntroduceThird.tsx
│   │   └── lotties
│   │       ├── Drag1.tsx
│   │       ├── Drag2.tsx
│   │       ├── Reschedule.tsx
│   │       └── RoutineRoad.tsx
│   ├── Week
│   │   ├── MonthlyGoal
│   │   │   ├── MonthlyGoalBox.tsx
│   │   │   ├── MonthlyGoalInput.tsx
│   │   │   └── index.tsx
│   │   ├── WeekChange.tsx
│   │   ├── WeekInfo.tsx
│   │   ├── WeekPlan
│   │   │   ├── WeekPlan.tsx
│   │   │   └── WeekPlanCard.tsx
│   │   └── WeeklyGoal
│   │       ├── WeeklyGoalBox.tsx
│   │       └── WeeklyGoalInput.tsx
│   └── common
│       ├── AddonBtn.tsx
│       ├── CheckBox.tsx
│       ├── CollapseArrow.tsx
│       ├── DayPlanChip
│       │   ├── AddDayPlanChip.tsx
│       │   └── CommonDayPlanChip.tsx
│       ├── DayPlanList
│       │   ├── DayPlan.tsx
│       │   ├── DayPlanList.tsx
│       │   └── SubDayPlanList.tsx
│       ├── NavBar.tsx
│       └── RoutineBox
│           └── index.tsx
├── constants
│   └── index.ts
├── hooks
│   ├── query
│   │   ├── useCalendarData.tsx
│   │   ├── useDeleteSchedule.tsx
│   │   ├── useEmojiListData.tsx
│   │   ├── useGetDelaySchedules.ts
│   │   ├── useGetMonthlyGoalData.tsx
│   │   ├── useGetRoutineSchedules.ts
│   │   ├── useGetSubSchedules.ts
│   │   ├── useGetTodayNoteData.tsx
│   │   ├── useGetTodaySchedules.ts
│   │   ├── useGetWeeklyGoalData.tsx
│   │   ├── usePatchCompletedSchedules.ts
│   │   ├── usePatchScheduleTime.tsx
│   │   ├── usePostInformationData.tsx
│   │   └── usePostScheduleTime.tsx
│   ├── useDebouncing.tsx
│   ├── useDragBlock.ts
│   ├── useLatestState.ts
│   └── useThrottle.ts
├── lib
│   ├── api
│   │   ├── api.ts
│   │   ├── dayApi.ts
│   │   └── weekApi.ts
│   └── style
│       └── animation.ts
├── mock-data
│   └── schedules.ts
├── pages
│   ├── 404.tsx
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── day
│   │   └── [date].tsx
│   ├── index.tsx
│   └── week
│       └── [week].tsx
├── states
│   └── index.ts
├── styles
│   ├── Calendar.ts
│   ├── globalStyle.ts
│   └── theme.ts
├── types
│   ├── api.ts
│   ├── day.ts
│   ├── image.d.ts
│   ├── index.ts
│   └── week.ts
└── utils
    ├── dateUtil.ts
    ├── getDate.ts
    ├── getFlagedData.ts
    ├── getWeek.ts
    └── timeIdConversion.ts
```

## ⭐️ 서비스 핵심 기능

---

### <온보딩 페이지>

[기능 설명]

- 서비스를 소개하고 사용자를 위해 기본적인 서비스 사용 방법을 제시합니다.

[구현 view]

![image](https://user-images.githubusercontent.com/65010481/180456950-4ed258aa-eafe-43d4-871b-5b96cba13f4e.png)

### <일간계획>

[기능 설명]

- 일별 계획

계획블록을 통해 할 일을 정리하고, 계획블록에 배정된 타임블록을 통해 시간을 체크할 수 있습니다. 

계획블록은 드래그 앤 드롭을 통해서 자주 사용하는 계획 또는 미룬 계획 블록을 이동될 수 있습니다.

- 자주 사용하는 계획

자주 사용하는 계획 블록은 계획 블록들 중 여러 번 사용하고 싶은 계획 블록들을 모아둘 수 있습니다. 이후 일별 계획 블록 부분에 끌어와서 사용할 수 있습니다. 

- 미룬 계획

일별 계획 중 미루고 싶은 계획을 미룬 계혹 블록으로 이동시키면 계획을 미룰 수 있습니다.

- 간단 노트

하루에 대한 감상을 이모티콘으로 남기고, 목표나 메모 등을 작성 가능합니다.

[구현 view]
![image](https://user-images.githubusercontent.com/65010481/180457891-658436b8-048a-4efd-982d-00afee16d3ee.png)


### <주간계획>

[기능 설명]

- 요일별 계획

일주일동안의 하루하루의 계획을 관리할 수 있습니다. 일별 계획과 연동되어 보여집니다.

- 자주 사용하는 계획

일간계획에서와 동일하게 계획 블록들 중 여러 번 사용하고 싶은 계획 블록들을 모아두고 요일별 계획에 끌어와서 사용할 수 있습니다.

- 이번주 목표

이번 주의 목표를 설정할 수 있습니다.

- 이번달 목표

이번 달의 목표를 설정할 수 있습니다.

[구현 view]

![image](https://user-images.githubusercontent.com/65010481/180458091-647c5db1-8669-419c-bd30-41f27e754824.png)

### <404 에러 페이지>

[기능 설명]

- 서버 라우팅 에러시 보여주는 모습으로 사용자에게 오류가 발생했음을 알려주는 페이지입니다.

[구현 view]
![image](https://user-images.githubusercontent.com/65010481/180458191-49c4340b-f518-44d4-a533-a986f5a9c0f2.png)
