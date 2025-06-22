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
      <Box textAlign="center" py={4}>
        <Text color="red.500">Error loading episodes: {error}</Text>
      </Box>
    );
  }

  return (
    <VStack gap={6}>
      {/* Pagination */}
      {pageInfo && pageInfo.count && (
        <Pagination
          currentPage={page}
          totalCount={pageInfo.count}
          onPageChange={setPage}
        />
      )}

      {/* Episodes Grid */}
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={3}
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
                  >
                    <AspectRatio ratio={1 / 1}>
                      <PreloadImage
                        src={episode.characters?.[0]?.image ?? ""}
                        alt="Description"
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
                      >
                        {episode.name}
                      </Text>
                      <Text fontSize="sm">{episode.episode}</Text>
                    </Box>
                  </GridItem>
                )
              );
            })}
          </>
        )}
      </Grid>

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
