"use client";

import { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  GridItem,
  Skeleton,
  AspectRatio,
  SkeletonText,
} from "@chakra-ui/react";
import { useEpisodes } from "@/hooks/useEpisodes";
import PreloadImage from "./PreloadImage";
import Pagination from "./Pagination";

export default function EpisodesGrid() {
  const [page, setPage] = useState(0);
  const { data, loading, error } = useEpisodes(page);

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Text color="red.500">Error loading episodes: {error.message}</Text>
      </Box>
    );
  }

  return (
    <VStack gap={6}>
      {/* Pagination */}
      {data?.episodes?.info && data.episodes.info.count && (
        <Pagination
          currentPage={page}
          totalCount={data.episodes.info.count}
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
            {data?.episodes?.results?.map(
              (episode) =>
                episode && (
                  <GridItem
                    key={episode.id}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    backgroundColor="gray.200"
                    cursor={"pointer"}
                    _hover={{ transform: "scale(1.04)" }}
                    transition="transform 0.3s"
                    position="relative"
                    gap={2}
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
                      <Text fontWeight="bold" fontSize="lg">
                        {episode.name}
                      </Text>
                      <Text fontSize="sm">{episode.episode}</Text>
                    </Box>
                  </GridItem>
                )
            )}
          </>
        )}
      </Grid>

      {/* Pagination */}
      {data?.episodes?.info && data.episodes.info.count && (
        <Pagination
          currentPage={page}
          totalCount={data.episodes.info.count}
          onPageChange={setPage}
        />
      )}
    </VStack>
  );
}
