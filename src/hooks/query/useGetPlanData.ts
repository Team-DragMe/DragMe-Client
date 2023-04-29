import { useQuery } from 'react-query';
import { PlanDataQueryType } from 'src/types/day';

import { getPlanData } from '../../lib/api/dayApi';

const useGetPlanData = ({ type, planDate }: PlanDataQueryType) =>
  useQuery(
    ['daily', type, planDate],
    async () =>
      getPlanData({
        type,
        planDate,
      }),
    {
      keepPreviousData: true,
      useErrorBoundary: true,
      retry: 3,
      suspense: false,
      enabled: planDate !== '',
    },
  );

export default useGetPlanData;
