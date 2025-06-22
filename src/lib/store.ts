import { create } from "zustand";
import {
  GetEpisodesQuery,
  Episode,
  Info,
  GetEpisodesDocument,
} from "@/generated/graphql";

import { client as apolloClient } from "@/lib/apollo-client";

export interface EpisodesState {
  episodesById: Record<string, Episode>;
  episodeIdsByPage: Record<number, string[]>;
  pageInfo: Info | null;
  loading: boolean;
  error: string | null;
  fetchEpisodes: (page: number) => Promise<void>;
}

export const useEpisodesStore = create<EpisodesState>((set, get) => ({
  episodesById: {},
  episodeIdsByPage: {},
  pageInfo: null,
  loading: false,
  error: null,
  fetchEpisodes: async (page: number) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apolloClient.query<GetEpisodesQuery>({
        query: GetEpisodesDocument,
        variables: { page },
      });
      const episodes = data.episodes?.results?.filter(Boolean) as Episode[];
      const episodesById: Record<string, Episode> = { ...get().episodesById };
      const episodeIds: string[] = [];
      for (const ep of episodes) {
        if (ep.id) {
          episodesById[ep.id] = ep;
          episodeIds.push(ep.id);
        }
      }
      set((state) => ({
        episodesById,
        episodeIdsByPage: { ...state.episodeIdsByPage, [page]: episodeIds },
        pageInfo: data.episodes?.info ?? null,
        loading: false,
        error: null,
      }));
    } catch (err: unknown) {
      let message = "Failed to fetch episodes";
      if (err instanceof Error) message = err.message;
      set({ loading: false, error: message });
    }
  },
}));
