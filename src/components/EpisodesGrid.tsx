"use client";

import { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useEpisodes } from "@/hooks/useEpisodes";
import PreloadImage from "./PreloadImage";
import Pagination from "./Pagination";

export default function EpisodesGrid() {
  const [page, setPage] = useState(1);
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
      <Heading size="md" textAlign="center">
        Rick and Morty Episodes
      </Heading>

      {loading ? (
        <Box textAlign="center" py={8}>
          <Spinner size="lg" />
          <Text mt={2}>Loading episodes...</Text>
        </Box>
      ) : (
        <>
          {/* Pagination */}
          {data?.episodes?.info && data.episodes.info.pages && (
            <Pagination
              currentPage={page}
              totalPages={data.episodes.info.pages}
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
            {data?.episodes?.results?.map(
              (episode) =>
                episode && (
                  <Box
                    key={episode.id}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    cursor={"pointer"}
                    _hover={{ transform: "scale(1.04)" }}
                    transition="transform 0.3s"
                    position="relative"
                    aspectRatio="1/1"
                    gap={2}
                  >
                    <PreloadImage
                      src={episode.characters?.[0]?.image ?? ""}
                      alt="Description"
                      borderRadius="md"
                      objectFit="cover"
                    />
                    <Box
                      position={"absolute"}
                      left={0}
                      right={0}
                      bottom={0}
                      width="100%"
                      p={3}
                    >
                      <Text fontWeight="bold" fontSize="lg">
                        {episode.name}
                      </Text>
                      <Text fontSize="sm">{episode.episode}</Text>
                    </Box>
                  </Box>
                )
            )}
          </Grid>
        </>
      )}
    </VStack>
  );
}
