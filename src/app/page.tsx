"use client";

import { withAuth } from "@/providers/authProvider";
import { Container, Heading, Text, VStack } from "@chakra-ui/react";

const Home = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack gap={8} alignItems="center">
        <Heading size="2xl" color="blue.600">
          Welcome to Your Next.js App with Chakra UI & Apollo Client!
        </Heading>

        <Text fontSize="lg" textAlign="center" maxW="2xl">
          This is a Next.js application with Chakra UI v3 and Apollo Client
          installed and working. You can now use all of Chakra UI&apos;s
          components and Apollo Client&apos;s GraphQL features in your app.
        </Text>
      </VStack>
    </Container>
  );
};

export default withAuth(Home);
