import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

if (process.env.NODE_ENV) {
  api.interceptors.response.use(async (response) => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return response;
  });
}
