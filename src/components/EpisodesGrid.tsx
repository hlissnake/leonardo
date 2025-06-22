"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  GridItem,
  Skeleton,
  AspectRatio,
  SkeletonText,
  useDialog,
} from "@chakra-ui/react";
import PreloadImage from "./PreloadImage";
import Pagination from "./Pagination";
import { useEpisodesStore } from "@/lib/store";
import EpisodeDetailModal from "./EpisodeDetailModal";

interface EpisodesGridProps {
  initialPage?: number;
}

export default function EpisodesGrid({ initialPage = 1 }: EpisodesGridProps) {
  const [page, setPage] = useState(initialPage);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState("");

  const {
    fetchEpisodes,
    episodeIdsByPage,
    episodesById,
    pageInfo,
    loading,
    error,
  } = useEpisodesStore();

  const dialog = useDialog({
    closeOnEscape: false,
    closeOnInteractOutside: false,
  });

  const handleEpisodeSelect = useCallback(
    (episodeId: string) => {
      setSelectedEpisodeId(episodeId);
      dialog.setOpen(true);
    },
    [dialog]
  );

  useEffect(() => {
    fetchEpisodes(page);
  }, [fetchEpisodes, page]);

  if (error) {
    return (
      <Box 
        textAlign="center" 
        py={4}
        role="alert"
        aria-live="polite"
        aria-label="Error loading episodes"
      >
        <Text color="red.500">Error loading episodes: {error}</Text>
      </Box>
    );
  }

  const episodeCount = episodeIdsByPage[page]?.length || 0;

  return (
    <VStack gap={6} role="main" aria-label="Episodes grid">
      {/* Pagination */}
      {pageInfo && pageInfo.count && (
        <Pagination
          currentPage={page}
          totalCount={pageInfo.count}
          onPageChange={setPage}
        />
      )}

      {/* Episodes Grid */}
      <section 
        aria-labelledby="episodes-heading"
        aria-describedby="episodes-description"
      >
        <div id="episodes-heading" className="sr-only">
          Rick and Morty Episodes
        </div>
        <div id="episodes-description" className="sr-only">
          Grid of episodes with character images and episode information
        </div>
        
        {loading && (
          <div 
            aria-live="polite" 
            aria-label="Loading episodes"
            className="sr-only"
          >
            Loading episodes...
          </div>
        )}

        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={3}
          role="grid"
          aria-label={`Episodes grid showing ${episodeCount} episodes on page ${page}`}
          aria-rowcount={Math.ceil(episodeCount / 5)}
          aria-colcount={5}
        >
          {loading ? (
            <>
              {Array(20)
                .fill(0)
                .map((_, index) => (
                  <GridItem
                    key={index}
                    borderColor="gray.200"
                    borderRadius="md"
                    position="relative"
                    overflow="hidden"
                    width="16rem"
                    role="gridcell"
                    aria-label="Loading episode skeleton"
                  >
                    <AspectRatio ratio={1 / 1}>
                      <Skeleton height="100%" width="100%" />
                    </AspectRatio>
                    <Box p={3}>
                      <SkeletonText noOfLines={2} />
                    </Box>
                  </GridItem>
                ))}
            </>
          ) : (
            <>
              {episodeIdsByPage[page]?.map((episodeId) => {
                const episode = episodesById[episodeId];
                return (
                  episode && (
                    <GridItem
                      key={episodeId}
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="md"
                      backgroundColor="gray.200"
                      cursor={"pointer"}
                      transition="transform 0.3s"
                      position="relative"
                      gap={2}
                      _hover={{ transform: "scale(1.04)" }}
                      onClick={() => handleEpisodeSelect(episodeId)}
                      role="gridcell"
                      aria-label={`Episode: ${episode.name}, ${episode.episode}. Click to view details.`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleEpisodeSelect(episodeId);
                        }
                      }}
                    >
                      <AspectRatio ratio={1 / 1}>
                        <PreloadImage
                          src={episode.characters?.[0]?.image ?? ""}
                          alt={`${episode.name} episode featuring ${episode.characters?.[0]?.name || 'characters'}`}
                          borderRadius="md"
                          objectFit="cover"
                        />
                      </AspectRatio>
                      <Box p={3}>
                        <Text
                          fontWeight="bold"
                          fontSize="lg"
                          width="100%"
                          lineClamp={1}
                          aria-label={`Episode title: ${episode.name}`}
                        >
                          {episode.name}
                        </Text>
                        <Text 
                          fontSize="sm"
                          aria-label={`Episode code: ${episode.episode}`}
                        >
                          {episode.episode}
                        </Text>
                      </Box>
                    </GridItem>
                  )
                );
              })}
            </>
          )}
        </Grid>
      </section>

      {/* Pagination */}
      {pageInfo && pageInfo.count && (
        <Pagination
          currentPage={page}
          totalCount={pageInfo.count}
          onPageChange={setPage}
        />
      )}
      
      <EpisodeDetailModal
        episode={episodesById[selectedEpisodeId]}
        dialog={dialog}
      />
    </VStack>
  );
}
