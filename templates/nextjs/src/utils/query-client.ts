import { QueryClient, DefaultOptions } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: 1,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});
