import { Meal, api } from '@lib/api';
import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const queries = createQueryKeyStore({
  meals: {
    list: {
      queryKey: ['meals'],
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
  },
});
