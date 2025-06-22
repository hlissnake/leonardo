"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { UserAuthProvider } from "./UserAuthProvider";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(defaultConfig, config);

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ApolloProvider client={client}>
        <UserAuthProvider>{children}</UserAuthProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
}
