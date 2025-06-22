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

  return (
    <Dialog.RootProvider value={dialog}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <DialogContent minW="350px" maxW="90vw">
            <DialogHeader fontSize="lg" fontWeight="bold">
              {episode.name}
            </DialogHeader>
            <DialogBody>
              <VStack align="start" gap={4}>
                <Text fontSize="md" color="gray.500">
                  {episode.episode} &bull; {episode.air_date}
                </Text>
                <Box>
                  <Text fontWeight="semibold" mb={2}>
                    Characters:
                  </Text>
                  <Flex gap={3} wrap="wrap">
                    {episode.characters?.map(
                      (char) =>
                        char && (
                          <Flex
                            direction={"column"}
                            key={char.id}
                            alignItems={"center"}
                            width={100}
                            gap={1}
                          >
                            <PreloadImage
                              src={char.image ?? ""}
                              alt={char.name ?? "Character"}
                              borderRadius="full"
                              objectFit="cover"
                              width={100}
                              height={100}
                            />
                            <Text fontSize="sm" width="100%" lineClamp={1}>
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
                <Button variant="outline">Close</Button>
              </Dialog.ActionTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
}
