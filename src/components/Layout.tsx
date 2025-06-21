"use client";

import { Box, Container } from "@chakra-ui/react";
import { Header, Footer } from "./layout/index";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Box as="main" minH="80vh" py={8}>
        <Container maxW="container.xl">{children}</Container>
      </Box>
      <Footer />
    </>
  );
}
