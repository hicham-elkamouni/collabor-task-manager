import { QueryClient } from "@tanstack/react-query";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const PAGE_SIZE = 2;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});
