import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

if (process.env.NODE_ENV === 'development') {
  api.interceptors.response.use(async (response) => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return response;
  });
}

export type Meal = {
  id: string;
  userId: string;
  name: string;
  description: string;
  isOnDiet: boolean;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type Metrics = {
  bestOnDietSequence: number;
  offDiet: number;
  onDiet: number;
  total: number;
};
