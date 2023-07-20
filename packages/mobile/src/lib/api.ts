import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';

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

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('@DailyDiet:token');
      router.replace('/');
    }
  },
);

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
