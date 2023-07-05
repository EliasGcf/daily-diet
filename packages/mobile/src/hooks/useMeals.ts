import { queries } from '@lib/react-query';
import { useQuery } from '@tanstack/react-query';

import { useRefreshOnFocus } from '@hooks/use-refresh-on-focus';

export function useMeals() {
  const query = useQuery(queries.meals.list);
  useRefreshOnFocus(query.refetch);

  return query;
}

export function useMeal(id: string) {
  const query = useQuery(queries.meals.detail(id));
  useRefreshOnFocus(query.refetch);

  return query;
}
