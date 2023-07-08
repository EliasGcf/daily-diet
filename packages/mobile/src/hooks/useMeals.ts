import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Meal, api } from '@lib/api';
import { queries } from '@lib/react-query';

export function useMeals() {
  const query = useQuery(queries.meals.list);

  return query;
}

export function useMeal(id: string) {
  const query = useQuery(queries.meals.detail(id));

  return query;
}

type CreateMeal = {
  name: string;
  description: string;
  date: Date;
  isOnDiet: boolean;
};

export function useCreateMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateMeal) => {
      const response = await api.post<Meal>('/meals', data);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        queries.meals.list.queryKey,
        queries.meals.metrics.queryKey,
      ]);

      queryClient.setQueryData(queries.meals.detail(data.id).queryKey, data);
    },
  });
}
