"use client";

import { withAuth } from "@/providers/UserAuthProvider";
import { Container, Heading, VStack } from "@chakra-ui/react";
import EpisodesGrid from "@/components/EpisodesGrid";
import { useSearchParams } from "next/navigation";

const Home = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  return (
    <Container maxW="container.xl" py={10}>
      <VStack gap={8} alignItems="center">
        <Heading size="2xl" color="blue.600">
          Rick and Morty Episodes
        </Heading>

        <EpisodesGrid initialPage={page} />
      </VStack>
    </Container>
  );
};

export default withAuth(Home);
