import { getClerkInstance } from "@clerk/expo";
import axios from "axios";

import { env } from "@/config/env";

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const clerk = getClerkInstance();
  const token = await clerk.session?.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const { data } = await apiClient.post<T>(path, body);
  return data;
}
