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

export function useDeleteMeal(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete(`/meals/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queries.meals.metrics.queryKey]);
      queryClient.removeQueries(queries.meals.detail(id).queryKey);

      queryClient.setQueryData(queries.meals.list.queryKey, (meals?: Meal[]) => {
        if (!meals) return undefined;
        return meals.filter((meal) => meal.id !== id);
      });
    },
  });
}

export function useUpdateMeal(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<CreateMeal>) => {
      const response = await api.put<Meal>(`/meals/${id}`, data);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([queries.meals.metrics.queryKey]);

      queryClient.setQueryData(queries.meals.detail(id).queryKey, data);
      queryClient.setQueryData(queries.meals.list.queryKey, (meals?: Meal[]) => {
        if (!meals) return undefined;

        return meals.map((meal) => {
          if (meal.id === id) return data;
          return meal;
        });
      });
    },
  });
}
