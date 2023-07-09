import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { QueryClient } from '@tanstack/react-query';

import { Meal, Metrics, api } from '@lib/api';

export const queryClient = new QueryClient({});

export const queries = createQueryKeyStore({
  meals: {
    list: {
      queryKey: null,
      queryFn: async () => {
        const response = await api.get<{ data: Meal[] }>('/meals');

        return response.data.data;
      },
    },
    detail: (mealId: string) => ({
      queryKey: [mealId],
      queryFn: async () => {
        const response = await api.get<Meal>(`/meals/${mealId}`);

        return response.data;
      },
    }),
    metrics: {
      queryKey: null,
      queryFn: async () => {
        const response = await api.get<Metrics>('/meals/metrics');

        const percentage =
          response.data.total === 0
            ? 0
            : (response.data.onDiet / response.data.total) * 100;

        const isOnDiet = percentage >= 80;

        return {
          ...response.data,
          percentage: Number.isInteger(percentage)
            ? String(percentage)
            : percentage.toFixed(2).replace('.', ','),
          isOnDiet,
        };
      },
    },
  },
});
