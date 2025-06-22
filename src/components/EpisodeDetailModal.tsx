"use client";

import {
  Box,
  Text,
  Dialog,
  DialogContent,
  DialogHeader,
  Portal,
  UseDialogReturn,
  DialogFooter,
  DialogBody,
  Button,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { Episode } from "@/generated/graphql";
import PreloadImage from "./PreloadImage";

interface EpisodeDetailModalProps {
  episode: Episode | null;
  dialog: UseDialogReturn;
}

export default function EpisodeDetailModal({
  episode,
  dialog,
}: EpisodeDetailModalProps) {
  if (!episode) return null;

  const episodeInfo = `${episode.episode} • Air Date: ${episode.air_date}`;
  const characterCount = episode.characters?.length || 0;

  return (
    <Dialog.RootProvider value={dialog}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <DialogContent 
            minW="350px" 
            maxW="90vw"
            role="dialog"
            aria-labelledby="episode-title"
            aria-describedby="episode-info"
            aria-modal="true"
          >
            <DialogHeader fontSize="lg" fontWeight="bold" id="episode-title">
              {episode.name}
            </DialogHeader>
            <DialogBody>
              <VStack align="start" gap={4}>
                <Text 
                  id="episode-info" 
                  fontSize="md" 
                  color="gray.500"
                  aria-label="Episode information"
                >
                  {episodeInfo}
                </Text>
                <Box role="region" aria-labelledby="characters-heading">
                  <Text 
                    id="characters-heading" 
                    fontWeight="semibold" 
                    mb={2}
                    aria-label={`Characters in this episode (${characterCount} total)`}
                  >
                    Characters ({characterCount}):
                  </Text>
                  <Flex 
                    gap={3} 
                    wrap="wrap"
                    role="list"
                    aria-label="List of characters appearing in this episode"
                  >
                    {episode.characters?.map(
                      (char) =>
                        char && (
                          <Flex
                            direction={"column"}
                            key={char.id}
                            alignItems={"center"}
                            width={100}
                            gap={1}
                            role="listitem"
                            aria-label={`Character: ${char.name}`}
                          >
                            <PreloadImage
                              src={char.image ?? ""}
                              alt={`${char.name} character portrait`}
                              borderRadius="full"
                              objectFit="cover"
                              width={100}
                              height={100}
                            />
                            <Text 
                              fontSize="sm" 
                              width="100%" 
                              lineClamp={1}
                              aria-label={`Character name: ${char.name}`}
                            >
                              {char.name}
                            </Text>
                          </Flex>
                        )
                    )}
                  </Flex>
                </Box>
              </VStack>
            </DialogBody>
            <DialogFooter>
              <Dialog.ActionTrigger asChild>
                <Button 
                  variant="outline"
                  aria-label="Close episode details"
                >
                  Close
                </Button>
              </Dialog.ActionTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
}
