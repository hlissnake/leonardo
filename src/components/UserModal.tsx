"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "@/providers/authProvider";
import { useRouter } from "next/navigation";

export default function UserModal() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!!username && !!jobTitle) {
      login(username, jobTitle);
    } else {
      setError("please enter all the informatio above");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return (
    <Container maxW="sm" py={16}>
      <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="md">
        <Heading mb={6} size="lg" textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack gap={4} alignItems="stretch">
            <label htmlFor="username">
              Username
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                mt={1}
              />
            </label>
            <label htmlFor="jobTitle">
              Job Title
              <Input
                id="jobTitle"
                type="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                autoComplete="current-jobTitle"
                required
                mt={1}
              />
            </label>
            {error && <Text color="red.500">{error}</Text>}
            <Button colorScheme="blue" type="submit" w="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}
