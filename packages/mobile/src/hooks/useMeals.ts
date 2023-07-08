import { queries } from '@lib/react-query';
import { useQuery } from '@tanstack/react-query';

export function useMeals() {
  const query = useQuery(queries.meals.list);

  return query;
}

export function useMeal(id: string) {
  const query = useQuery(queries.meals.detail(id));

  return query;
}
