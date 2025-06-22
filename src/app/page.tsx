"use client";

import { withAuth } from "@/providers/UserAuthProvider";
import { Container, Heading, VStack } from "@chakra-ui/react";
import EpisodesGrid from "@/components/EpisodesGrid";

const Home = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack gap={8} alignItems="center">
        <Heading size="2xl" color="blue.600">
          Welcome to Your Next.js App with Chakra UI & Apollo Client!
        </Heading>

        <EpisodesGrid />
      </VStack>
    </Container>
  );
};

export default withAuth(Home);
