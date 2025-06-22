import { Box, Container, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" py={4} bg="#f7fafc" mt={8}>
      <Container maxW="container.xl" textAlign="center">
        <Text fontSize="sm" color="gray.500">
          &copy; {new Date().getFullYear()} Leonardo. All rights reserved.
        </Text>
        <Text fontSize="md">
          Challenge Brief (v3.5)
        </Text>
      </Container>
    </Box>
  );
}
