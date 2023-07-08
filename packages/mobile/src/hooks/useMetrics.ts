import { useQuery } from '@tanstack/react-query';

import { queries } from '@lib/react-query';

export function useMetrics() {
  const query = useQuery(queries.meals.metrics);

  return query;
}
