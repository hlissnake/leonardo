import { useGetEpisodesQuery } from '@/generated/graphql';

export function useEpisodes(page: number = 1) {
  return useGetEpisodesQuery({
    variables: { page },
    errorPolicy: 'all',
  });
} 